import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import User from "./models/User.js";
import Paper from "./models/Paper.js";
import Collaboration from "./models/Collaboration.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

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

// Example of a protected route:
app.get("/api/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

// USER ENDPOINTS
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// PAPER ENDPOINTS
app.post("/api/papers", async (req, res) => {
  try {
    const paper = new Paper(req.body);
    await paper.save();
    res.status(201).json(paper);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/papers", async (req, res) => {
  const papers = await Paper.find().populate("authors", "username email");
  res.json(papers);
});

// COLLABORATION ENDPOINTS
app.post("/api/collaborations", async (req, res) => {
  try {
    const collab = new Collaboration(req.body);
    await collab.save();
    res.status(201).json(collab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/collaborations", async (req, res) => {
  const collabs = await Collaboration.find().populate("paper users", "title username");
  res.json(collabs);
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
