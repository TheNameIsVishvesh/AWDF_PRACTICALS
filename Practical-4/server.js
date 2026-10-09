const express = require('express');

const app = express();
const PORT = 5000;

// Middleware 1: Built-in JSON body parser
app.use(express.json());

// Middleware 2: Global Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Middleware 3: Supplementary Content-Type Validator for POST and PUT
const checkContentType = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Content-Type header must be application/json'
      });
    }
  }
  next();
};

app.use(checkContentType);

// In-Memory Task Database
let tasks = [
  { id: 1, title: 'Setup React Project with Vite', description: 'Scaffold and structure functional components', completed: true, createdAt: new Date() },
  { id: 2, title: 'Implement React Router v6', description: 'Configure client-side navigation with NavLink and useState', completed: true, createdAt: new Date() },
  { id: 3, title: 'Build Express REST API', description: 'Design CRUD routes with middleware logging and error pipelines', completed: false, createdAt: new Date() }
];

// Helper: Find next ID
let nextId = 4;

// 1. GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// 2. GET /tasks/:id - Retrieve single task by ID
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID', message: 'Task ID must be an integer' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Not Found', message: `Task with id ${id} does not exist` });
  }

  res.status(200).json({ success: true, data: task });
});

// 3. POST /tasks - Create a new task
app.post('/tasks', (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Field "title" is required and cannot be empty'
      });
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
});

// 4. PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID', message: 'Task ID must be an integer' });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: `Task with id ${id} does not exist` });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Validation Error', message: 'Title cannot be empty' });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (description !== undefined) {
      tasks[taskIndex].description = description;
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: tasks[taskIndex]
    });
  } catch (err) {
    next(err);
  }
});

// 5. DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID', message: 'Task ID must be an integer' });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: `Task with id ${id} does not exist` });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// Deliberate Error Route for testing global error middleware
app.get('/simulate-error', (req, res, next) => {
  const error = new Error('Simulated internal server exception for testing global error handler');
  next(error);
});

// Supplementary 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handling Middleware (must be the last app.use)
app.use((err, req, res, next) => {
  console.error('[Error Middleware Caught]:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Task Management API Server running at http://localhost:${PORT}`);
});
