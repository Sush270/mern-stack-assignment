const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Basic MongoDB Connection (Localhost)
mongoose.connect('mongodb://127.0.0.1:27017/chatDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(express.static('public'));

// Socket.io Real-time Logic
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server; // Exporting for testing
