const express = require('express');
const { cache, metrics } = require('./cache');

const app = express();
const PORT = 5000;

app.use(express.json());

// In-Memory Database store with realistic database query simulation
let tasks = [
  { id: 1, title: 'Learn In-Memory Caching', description: 'Understand node-cache TTL and latency reduction', completed: true, createdAt: new Date() },
  { id: 2, title: 'Implement Cache Invalidation', description: 'Invalidate keys on POST, PUT, DELETE operations', completed: false, createdAt: new Date() },
  { id: 3, title: 'Measure Performance Latency', description: 'Record uncached vs cached response timings', completed: false, createdAt: new Date() },
  { id: 4, title: 'Deploy Reverse Proxy & Indexing', description: 'Query execution optimization and compound indexing', completed: true, createdAt: new Date() },
  { id: 5, title: 'Implement Event-Driven Architecture', description: 'Non-blocking EventEmitter background task notifications', completed: false, createdAt: new Date() }
];

// Helper to simulate standard database disk/network I/O latency (approx 50ms)
const simulateDbQuery = (data, delayMs = 50) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delayMs));
};

// 1. GET /tasks - Cached endpoint
app.get('/tasks', async (req, res) => {
  const start = performance.now();
  const cached = cache.get('all_tasks');

  if (cached) {
    metrics.hits++;
    const duration = (performance.now() - start).toFixed(2);
    return res.status(200).json({
      success: true,
      source: 'CACHE_HIT',
      responseTimeMs: `${duration}ms`,
      count: cached.length,
      data: cached
    });
  }

  // Cache MISS: Query database
  metrics.misses++;
  const data = await simulateDbQuery(tasks, 60);
  cache.set('all_tasks', data);
  const duration = (performance.now() - start).toFixed(2);

  res.status(200).json({
    success: true,
    source: 'DATABASE_QUERY_MISS',
    responseTimeMs: `${duration}ms`,
    count: data.length,
    data: data
  });
});

// 2. GET /tasks/uncached - Explicitly Uncached endpoint for empirical benchmarking
app.get('/tasks/uncached', async (req, res) => {
  const start = performance.now();
  const data = await simulateDbQuery(tasks, 60);
  const duration = (performance.now() - start).toFixed(2);

  res.status(200).json({
    success: true,
    source: 'DIRECT_DATABASE_READ (NO CACHE)',
    responseTimeMs: `${duration}ms`,
    count: data.length,
    data: data
  });
});

// 3. GET /tasks/:id - Single-task caching
app.get('/tasks/:id', async (req, res) => {
  const start = performance.now();
  const id = parseInt(req.params.id, 10);
  const cacheKey = `task_${id}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    metrics.hits++;
    const duration = (performance.now() - start).toFixed(2);
    return res.status(200).json({
      success: true,
      source: 'CACHE_HIT',
      responseTimeMs: `${duration}ms`,
      data: cached
    });
  }

  metrics.misses++;
  const task = await simulateDbQuery(tasks.find(t => t.id === id), 40);
  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  cache.set(cacheKey, task);
  const duration = (performance.now() - start).toFixed(2);
  res.status(200).json({
    success: true,
    source: 'DATABASE_QUERY_MISS',
    responseTimeMs: `${duration}ms`,
    data: task
  });
});

// 4. POST /tasks - Invalidate Cache on Create
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    description: description || '',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  // Invalidate cache
  cache.del('all_tasks');
  console.log('[Cache Invalidation] Flushed key: all_tasks due to POST operation');

  res.status(201).json({
    success: true,
    message: 'Task created and cache invalidated',
    data: newTask
  });
});

// 5. PUT /tasks/:id - Invalidate Cache on Update
app.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  if (req.body.title !== undefined) tasks[idx].title = req.body.title;
  if (req.body.completed !== undefined) tasks[idx].completed = Boolean(req.body.completed);

  // Invalidate all tasks cache and specific task cache
  cache.del('all_tasks');
  cache.del(`task_${id}`);
  console.log(`[Cache Invalidation] Flushed keys: all_tasks, task_${id} due to PUT operation`);

  res.status(200).json({
    success: true,
    message: 'Task updated and cache invalidated',
    data: tasks[idx]
  });
});

// 6. DELETE /tasks/:id - Invalidate Cache on Delete
app.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }

  const deleted = tasks.splice(idx, 1)[0];

  cache.del('all_tasks');
  cache.del(`task_${id}`);
  console.log(`[Cache Invalidation] Flushed keys: all_tasks, task_${id} due to DELETE operation`);

  res.status(200).json({
    success: true,
    message: 'Task deleted and cache invalidated',
    data: deleted
  });
});

// 7. GET /cache/metrics - Supplementary debug endpoint
app.get('/cache/metrics', (req, res) => {
  res.status(200).json({
    success: true,
    metrics: {
      cacheHits: metrics.hits,
      cacheMisses: metrics.misses,
      cachedKeys: cache.keys(),
      stats: cache.getStats()
    }
  });
});

app.listen(PORT, () => {
  console.log(`Practical 9 Server running at http://localhost:${PORT}`);
});
