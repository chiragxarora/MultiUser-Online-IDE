

document.getElementById('run').onclick = () => {
    socket.emit('run', {
        code: document.getElementById('code').value,
        lang: 'cpp',
        input: ''
    })
}



socket.on('ans',(data) => {
    document.getElementById('output').innerText = data.output
})