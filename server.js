const express = require("express");
const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.use("/", express.static(__dirname + "/public"));
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("typing", (data) => {
    io.emit("typed", data);
  });
  socket.on("run", (data) => {
    let program = {
      script: data.code,
      language: data.lang,
      versionIndex: "1",
      clientId: "983ffeebe0cc8461ad533b8e4bc293c8",
      clientSecret:
        "82f737a93b6d5c7908074148cbe7cfd4e3511956a8802b8ed6b887c60c41c7f5",
    };
    request(
      {
        url: "https://api.jdoodle.com/v1/execute",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
      }
    );
  });
});

server.listen(4676, () => {
  console.log("server started at http://localhost:4676");
});
