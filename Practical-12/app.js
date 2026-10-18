const express = require('express');

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: 'Write Automated Test Suite', description: 'Configure Jest and Supertest assertions', completed: true },
  { id: 2, title: 'Set up GitHub Actions CI', description: 'Trigger workflow on every push to main branch', completed: false }
];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  res.status(200).json({ success: true, data: task });
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    description: description || '',
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

module.exports = app;

if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
