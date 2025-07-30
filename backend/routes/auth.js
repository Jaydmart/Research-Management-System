import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register user
router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { username, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "Email already registered" });

      user = new User({ username, email, password });
      await user.save();

      // Sign JWT
      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
