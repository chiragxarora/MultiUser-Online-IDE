const express = require("express");
const request = require("request");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require('path')
const socket = require("socket.io");
const io = socket(server);

const port = process.env.PORT || 4676

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
})

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on('join', (data) => {
    socket.join(data.roomId, () => {
      io.to(data.roomId).emit('entered', {
        roomId: data.roomId
      })
    })
  })
  socket.on("typing", (data) => {
    console.log('typing')
    io.emit("typed", data);
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
}, process.env.PORT || 4676);
