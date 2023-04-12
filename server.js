const express = require('express');
const app = express();
const PORT = 12000
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>')
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) =>{
    console.log(' a user connected');
})

app.listen(PORT, () => console.log(`Listening for client requests on port ${PORT} `));