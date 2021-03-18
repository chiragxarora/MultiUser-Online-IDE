const express = require("express");
const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id); 
  socket.on("typing", (data) => {
    io.emit("typed", data);
  });
  socket.on("run", (data) => {
    let program = {
      code: data.code,
      language: data.lang,
      input: '5'
    };
    console.log(program.language + ' ' + data.lang)
    console.log(program.language === data.lang)
    request(
      {
        url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
        method: "POST",
        json: program,
      },
      (error, response, body) => {
        console.log("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
        io.emit('ans', {
          output: body.output
        })
      }
    );
  });
});

server.listen(4676, () => {
  console.log("server started at http://localhost:4676");
});
