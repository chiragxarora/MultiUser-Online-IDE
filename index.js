const express = require("express");
const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require('path')
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 4676

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

let previousCode, currentCode;
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("typing", (data) => {
    currentCode = data.text
    console.log('typing')
    console.log(previousCode === currentCode)
    if(previousCode !== currentCode){
      console.log(1)
      io.emit("typed", data);
      previousCode = currentCode;
      currentCode = ''
    }
  });
  socket.on("run", (data) => {
    let program = {
      code: data.code,
      language: data.lang,
      input: data.input
    };
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

server.listen(port, () => {
  console.log("server started at http://localhost:4676");
});
