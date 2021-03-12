let socket = io()
const fun = () => {
    socket.emit('typing', {
        text : document.getElementById('code').value
    })
}

document.getElementById('run').onclick = () => {
    socket.emit('run', {
        code: document.getElementById('code').value,
        lang: 'nodejs'
    })
}

socket.on('typed', (data) => {
    document.getElementById('code').value = data.text
})