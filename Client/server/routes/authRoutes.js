import express from"express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import  auth from "../middleware/authMiddleware.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "secret123";

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.status(201).json({ message: "User created" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route
router.get("/dashboard", auth, (req, res) => {
  res.json({ username: req.user.username });
});

export default router;
