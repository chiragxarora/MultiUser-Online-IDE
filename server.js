const express = require('express')
const app = express()
const SERVER_PORT = process.env.PORT || 1111
const http=  require('http')
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)

app.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('typing', (data) => {
        io.emit('typed', data)
    })
})

server.listen(4676, () => {
    console.log('server started at http://localhost:4676')
})
