import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Example schema
const MessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  time: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// REST API example
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Socket.io example
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('chat message', async (msg) => {
    const newMsg = new Message(msg);
    await newMsg.save();
    io.emit('chat message', newMsg);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
