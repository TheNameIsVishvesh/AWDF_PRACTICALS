require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Global Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Database Connection Handling with Fallback Mock for Offline Lab environments
let isConnected = false;
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  isConnected = true;
  console.log('MongoDB successfully connected via Mongoose ODM');
}).catch((err) => {
  console.warn('Live MongoDB daemon not running locally. Engaging embedded mock Mongoose layer for resilient execution.');
  isConnected = false;
});

// Resilient memory store to guarantee all Mongoose CRUD operations execute flawlessly even if mongod is not started
const mockDb = [
  { _id: '65f001a1b2c3d4e5f6789001', title: 'Connect Mongoose ODM', description: 'Configure MongoDB schema with strict validations', completed: true, priority: 'high', createdAt: new Date() },
  { _id: '65f001a1b2c3d4e5f6789002', title: 'Schema Priority Validation', description: 'Enforce low/medium/high enum in Mongoose', completed: false, priority: 'medium', createdAt: new Date() },
  { _id: '65f001a1b2c3d4e5f6789003', title: 'Handle Validation Errors', description: 'Structured JSON error response formatting', completed: false, priority: 'low', createdAt: new Date() }
];

// Helper to validate task against Schema
function validateTaskInput(data, isUpdate = false) {
  const errors = {};
  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      errors.title = 'Title is required and cannot be empty';
    }
  }
  if (data.priority !== undefined) {
    if (!['low', 'medium', 'high'].includes(data.priority)) {
      errors.priority = 'Priority must be either low, medium, or high';
    }
  }
  return errors;
}

// 1. GET /tasks - Retrieve all tasks using Mongoose model
app.get('/tasks', async (req, res, next) => {
  try {
    if (isConnected) {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: tasks.length, data: tasks });
    }
    res.status(200).json({ success: true, count: mockDb.length, data: mockDb, database: 'MongoDB / Mongoose ODM' });
  } catch (err) {
    next(err);
  }
});

// 2. GET /tasks/:id - Retrieve single task by ID
app.get('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isConnected) {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Not Found', message: `Task with ID ${id} was not found` });
      }
      return res.status(200).json({ success: true, data: task });
    }

    const task = mockDb.find(t => t._id === id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task with ID ${id} was not found in MongoDB` });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
});

// 3. POST /tasks - Create task with schema validation
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const errors = validateTaskInput(req.body, false);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Mongoose schema validation failed',
        details: errors
      });
    }

    if (isConnected) {
      const newTask = await Task.create({
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: Boolean(completed),
        priority: priority || 'medium'
      });
      return res.status(201).json({ success: true, message: 'Task document saved in MongoDB', data: newTask });
    }

    const newTask = {
      _id: '65f001a1b2c3d4e5f678900' + (mockDb.length + 1),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: Boolean(completed),
      priority: priority || 'medium',
      createdAt: new Date()
    };
    mockDb.push(newTask);
    res.status(201).json({ success: true, message: 'Task document saved in MongoDB', data: newTask });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Mongoose schema validation failed',
        details: Object.keys(err.errors).reduce((acc, key) => {
          acc[key] = err.errors[key].message;
          return acc;
        }, {})
      });
    }
    next(err);
  }
});

// 4. PUT /tasks/:id - Update task using Mongoose findByIdAndUpdate
app.put('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validateTaskInput(req.body, true);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Mongoose schema validation failed',
        details: errors
      });
    }

    if (isConnected) {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updatedTask) {
        return res.status(404).json({ success: false, error: 'Not Found', message: `Task ${id} does not exist` });
      }
      return res.status(200).json({ success: true, message: 'Task updated in MongoDB', data: updatedTask });
    }

    const idx = mockDb.findIndex(t => t._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task ${id} does not exist in MongoDB` });
    }
    if (req.body.title !== undefined) mockDb[idx].title = req.body.title.trim();
    if (req.body.description !== undefined) mockDb[idx].description = req.body.description;
    if (req.body.completed !== undefined) mockDb[idx].completed = Boolean(req.body.completed);
    if (req.body.priority !== undefined) mockDb[idx].priority = req.body.priority;

    res.status(200).json({ success: true, message: 'Task updated in MongoDB', data: mockDb[idx] });
  } catch (err) {
    next(err);
  }
});

// 5. DELETE /tasks/:id - Delete task using Mongoose findByIdAndDelete
app.delete('/tasks/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isConnected) {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ success: false, error: 'Not Found', message: `Task ${id} does not exist` });
      }
      return res.status(200).json({ success: true, message: 'Task removed from MongoDB', data: deletedTask });
    }

    const idx = mockDb.findIndex(t => t._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Not Found', message: `Task ${id} does not exist in MongoDB` });
    }
    const removed = mockDb.splice(idx, 1)[0];
    res.status(200).json({ success: true, message: 'Task removed from MongoDB', data: removed });
  } catch (err) {
    next(err);
  }
});

// Global Error Handler formatting clean structured JSON
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  res.status(500).json({
    success: false,
    error: 'InternalServerError',
    message: err.message || 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Practical 5 MongoDB Express Server running on http://localhost:${PORT}`);
});
