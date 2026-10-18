const express = require('express');
const taskEvents = require('./events');
const { eventAuditLogs } = require('./listeners');

const app = express();
const PORT = 5000;

app.use(express.json());

// In-Memory Task Collection
let tasks = [
  { id: 1, title: 'Configure Node EventEmitter', description: 'Decouple notification logic from HTTP request pipeline', completed: true, assignedUser: 'vishvesh@charusat.edu.in' },
  { id: 2, title: 'Measure Non-Blocking Timestamps', description: 'Prove API responds before background listener completes', completed: false, assignedUser: 'vishvesh@charusat.edu.in' }
];

let nextId = 3;

// 1. GET /tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// 2. POST /tasks - Creates task, responds immediately, then emits event
app.post('/tasks', (req, res) => {
  const { title, description, assignedUser } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const responseTimestamp = new Date().toISOString();

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description || '',
    completed: false,
    assignedUser: assignedUser || 'vishvesh@charusat.edu.in',
    apiRespondedAt: responseTimestamp,
    createdAt: new Date()
  };

  tasks.push(newTask);

  console.log(`[API Gateway] HTTP 201 Response dispatched to client at: ${responseTimestamp}`);

  // Immediate synchronous response to client
  res.status(201).json({
    success: true,
    message: 'Task created successfully. Asynchronous notification queued.',
    apiRespondedAt: responseTimestamp,
    data: newTask
  });

  // Emitting event asynchronously after response is sent
  taskEvents.emit('task-created', newTask);
});

// 3. DELETE /tasks/:id - Supplementary task-deleted event emission
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const responseTimestamp = new Date().toISOString();
  const deleted = tasks.splice(idx, 1)[0];
  deleted.apiRespondedAt = responseTimestamp;

  console.log(`[API Gateway] Task ${id} deleted. Response sent at: ${responseTimestamp}`);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully. Deletion audit event emitted.',
    apiRespondedAt: responseTimestamp,
    data: deleted
  });

  taskEvents.emit('task-deleted', deleted);
});

// 4. GET /events/audit - Inspection endpoint proving async order and timestamps
app.get('/events/audit', (req, res) => {
  res.status(200).json({
    success: true,
    auditLogsCount: eventAuditLogs.length,
    eventAuditLogs
  });
});

app.listen(PORT, () => {
  console.log(`Practical 10 Event-Driven Server running at http://localhost:${PORT}`);
});
