const request = require('supertest');
const app = require('../app');

describe('CI/CD Automated API Integration Tests (Jest + Supertest)', () => {
  // Test 1: GET /tasks returns 200 OK
  test('GET /tasks should return 200 OK and an array of tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test 2: GET /tasks/:id returns single task
  test('GET /tasks/:id should return 200 OK for valid task id', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.title).toBe('Write Automated Test Suite');
  });

  // Test 3: POST /tasks creates a new task
  test('POST /tasks should create a task with status 201 Created', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Continuous Integration Test', description: 'Testing CI pipeline' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Continuous Integration Test');
  });

  // Test 4: Validation test for missing title
  test('POST /tasks without title should return 400 Bad Request', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });
});
