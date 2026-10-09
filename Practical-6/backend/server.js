require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for React Frontend communication
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Full-Stack Task Collection Data Store
let tasks = [
  { _id: '65f01a01', title: 'Connect Full Stack Architecture', description: 'Wire React frontend with Express backend on port 5000', completed: true, priority: 'high', createdAt: new Date() },
  { _id: '65f01a02', title: 'Configure CORS Middleware', description: 'Permit cross-origin HTTP requests from React Vite client', completed: true, priority: 'medium', createdAt: new Date() },
  { _id: '65f01a03', title: 'Handle Asynchronous States', description: 'Show loader, error boundaries, and optimistic toast feedback', completed: false, priority: 'low', createdAt: new Date() }
];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const newTask = {
    _id: '65f01a' + Math.floor(10 + Math.random() * 90),
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    priority: priority || 'medium',
    createdAt: new Date()
  };

  tasks.unshift(newTask);
  res.status(201).json({ success: true, message: 'Task created successfully', data: newTask });
});

// PUT /tasks/:id - Toggle completed or update title
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t._id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  if (req.body.completed !== undefined) {
    tasks[taskIndex].completed = Boolean(req.body.completed);
  }
  if (req.body.title !== undefined) {
    tasks[taskIndex].title = req.body.title.trim();
  }
  if (req.body.priority !== undefined) {
    tasks[taskIndex].priority = req.body.priority;
  }

  res.status(200).json({ success: true, message: 'Task updated successfully', data: tasks[taskIndex] });
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t._id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const removed = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({ success: true, message: 'Task deleted successfully', data: removed });
});

app.listen(PORT, () => {
  console.log(`Practical 6 Backend API running on http://localhost:${PORT}`);
});
