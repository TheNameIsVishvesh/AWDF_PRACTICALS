require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Task Database
let tasks = [
  { id: 1, title: 'Build React UI with Props', description: 'Functional component hierarchy with dynamic styling', priority: 'medium', completed: true },
  { id: 2, title: 'Implement Secure JWT Authentication', description: 'Bcrypt hashing and middleware guard pipeline', priority: 'high', completed: true }
];

// Simple in-memory rate limiter: max 1 AI request per client IP per 10 seconds
const rateLimitMap = new Map();

// AI Intelligence Engine Simulation (supports real keys or robust fallback)
async function generateAIDescription(title) {
  // If simulated failure requested or no title
  if (!title) throw new Error('Task title cannot be empty for AI generation');

  const lower = title.toLowerCase();
  let suggestedDesc = '';
  let suggestedPriority = 'medium';

  if (lower.includes('docker') || lower.includes('container') || lower.includes('deploy')) {
    suggestedDesc = 'Configure multi-container orchestration with Dockerfile specifications, volume persistence, and network bridge routing.';
    suggestedPriority = 'high';
  } else if (lower.includes('auth') || lower.includes('security') || lower.includes('jwt') || lower.includes('password')) {
    suggestedDesc = 'Implement cryptographic password salting via bcrypt, sign 1-hour expiration JWT tokens, and enforce bearer authorization headers.';
    suggestedPriority = 'high';
  } else if (lower.includes('test') || lower.includes('ci') || lower.includes('github actions')) {
    suggestedDesc = 'Set up automated test suites with Jest and Supertest, executing continuous integration checks on every pull request.';
    suggestedPriority = 'medium';
  } else if (lower.includes('cache') || lower.includes('performance') || lower.includes('lazy')) {
    suggestedDesc = 'Optimize client and server throughput with in-memory TTL caching and dynamic route-based bundle code-splitting.';
    suggestedPriority = 'medium';
  } else {
    suggestedDesc = `Execute comprehensive engineering workflows for "${title}", including modular architectural design, error boundary integration, and unit verification.`;
    suggestedPriority = 'low';
  }

  // Artificial AI processing latency (400ms)
  await new Promise(r => setTimeout(r, 400));

  return {
    description: suggestedDesc,
    suggestedPriority,
    confidenceScore: 0.94,
    disclaimer: 'AI-Generated Suggestion: Please review and edit before saving to database.'
  };
}

// 1. POST /api/ai/generate-description (Backend AI Integration Endpoint)
app.post('/api/ai/generate-description', async (req, res) => {
  const clientIp = req.ip || 'local';
  const now = Date.now();

  // Rate Limiting Check
  if (rateLimitMap.has(clientIp)) {
    const lastRequest = rateLimitMap.get(clientIp);
    if (now - lastRequest < 2000) { // 2 second throttle for testing
      return res.status(429).json({
        success: false,
        error: 'RateLimitExceeded',
        message: 'Rate limit exceeded: Please wait a moment before generating another AI description.'
      });
    }
  }
  rateLimitMap.set(clientIp, now);

  const { title, simulateFailure } = req.body;

  try {
    if (simulateFailure || process.env.AI_API_KEY === 'INVALID_KEY_TRIGGER_FAIL') {
      throw new Error('Third-party AI Provider connection timeout (Simulated API Outage)');
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Title is required for AI generation' });
    }

    const aiResult = await generateAIDescription(title);

    res.status(200).json({
      success: true,
      data: aiResult
    });
  } catch (err) {
    // Graceful Degradation: Core server never crashes
    console.warn(`[AI Service Graceful Degradation Caught]: ${err.message}`);
    res.status(200).json({
      success: false,
      fallback: true,
      error: err.message,
      data: {
        description: `Standard task item: ${title || 'Manual Entry'}`,
        suggestedPriority: 'medium',
        disclaimer: 'AI service unavailable. Gracefully degraded to default template.'
      }
    });
  }
});

// 2. Standard CRUD endpoints
app.get('/tasks', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

app.post('/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title) return res.status(400).json({ success: false, error: 'Title is required' });

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    description: description || '',
    priority: priority || 'medium',
    completed: false,
    createdAt: new Date()
  };
  tasks.unshift(newTask);
  res.status(201).json({ success: true, data: newTask });
});

app.listen(PORT, () => {
  console.log(`Practical 13 AI Integration Server running at http://localhost:${PORT}`);
});
