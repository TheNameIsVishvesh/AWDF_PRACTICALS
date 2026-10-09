require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const validateTaskInput = require('./middleware/validate');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_charusat_awdf_2026';

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-Memory Database for Users and Tasks
const users = [];
const tasks = [
  { _id: 't-101', title: 'Implement Bcrypt Password Hashing', description: 'Salt and securely store hashed credentials', completed: true, userId: 'u-1' },
  { _id: 't-102', title: 'Generate & Sign JWT Tokens', description: 'Include user id with 1 hour expiration timestamp', completed: true, userId: 'u-1' },
  { _id: 't-103', title: 'Protect Routes via Middleware', description: 'Verify bearer tokens and block unauthorized clients', completed: false, userId: 'u-1' }
];

// --- AUTHENTICATION ROUTES ---

// 1. POST /register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const existingUser = users.find(u => u.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already registered with this email' });
    }

    // Hash password with bcrypt (salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'u-' + (users.length + 1),
      name: name || 'Student User',
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully with hashed password',
      user: { _id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. POST /login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials: User not found' });
    }

    // Verify hashed password using bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials: Incorrect password' });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. GET /me - Supplementary endpoint returning current logged-in user from decoded JWT
app.get('/me', authMiddleware, (req, res) => {
  const user = users.find(u => u._id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.status(200).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, decodedToken: req.user }
  });
});

// --- PROTECTED TASK ROUTES (Wrapped with authMiddleware & validateTaskInput) ---

// GET /tasks (Protected)
app.get('/tasks', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    authenticatedUser: req.user.email,
    count: tasks.length,
    data: tasks
  });
});

// POST /tasks (Protected & Validated)
app.post('/tasks', authMiddleware, validateTaskInput, (req, res) => {
  const { title, description, priority } = req.body;
  const newTask = {
    _id: 't-' + (tasks.length + 101),
    title: title.trim(),
    description: description || '',
    priority: priority || 'medium',
    completed: false,
    userId: req.user.id,
    createdAt: new Date()
  };
  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'Task created under authenticated session',
    data: newTask
  });
});

// DELETE /tasks/:id (Protected)
app.delete('/tasks/:id', authMiddleware, (req, res) => {
  const idx = tasks.findIndex(t => t._id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  const removed = tasks.splice(idx, 1)[0];
  res.status(200).json({ success: true, message: 'Protected task deleted successfully', data: removed });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Practical 7 Auth & Middleware Server listening on port ${PORT}`);
});
