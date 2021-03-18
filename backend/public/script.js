let socket = io()
const fun = () => {
    socket.emit('typing', {
        text : document.getElementById('code').value
    })
}

document.getElementById('run').onclick = () => {
    socket.emit('run', {
        code: document.getElementById('code').value,
        lang: 'cpp',
        input: ''
    })
}

socket.on('typed', (data) => {
    document.getElementById('code').value = data.text
})

socket.on('ans',(data) => {
    document.getElementById('output').innerText = data.output
})