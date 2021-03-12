let socket = io()
const fun = () => {
    socket.emit('typing', {
        text : document.getElementById('text').value
    })
}

socket.on('typed', (data) => {
    document.getElementById('text').value = data.text
})