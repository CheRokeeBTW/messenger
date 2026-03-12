import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const port = 3001;

const app = express();

app.use(
    cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Messanger works')
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('send_message', (data) => {
        console.log("Message received", data)

        socket.broadcast.emit('receive_message', data)
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})