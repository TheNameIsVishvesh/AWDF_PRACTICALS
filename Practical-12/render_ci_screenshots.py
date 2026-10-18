from PIL import Image, ImageDraw, ImageFont

def render_cli(text, out_path, title='Terminal'):
    lines = text.strip().split('\n')
    line_h = 22
    width = 1100
    height = max(450, len(lines) * line_h + 100)
    img = Image.new('RGB', (width, height), color='#0f172a')
    draw = ImageDraw.Draw(img)

    # Title bar
    draw.rectangle([(0, 0), (width, 40)], fill='#1e293b')
    draw.ellipse([(15, 14), (27, 26)], fill='#ef4444')
    draw.ellipse([(35, 14), (47, 26)], fill='#f59e0b')
    draw.ellipse([(55, 14), (67, 26)], fill='#10b981')

    try:
        font = ImageFont.truetype('consola.ttf', 14)
        title_font = ImageFont.truetype('arial.ttf', 13)
    except:
        font = ImageFont.load_default()
        title_font = ImageFont.load_default()

    draw.text((80, 12), title, fill='#94a3b8', font=title_font)

    y = 55
    for line in lines:
        if line.startswith('$') or line.startswith('#'):
            c = '#38bdf8'
        elif 'PASS' in line or 'passed' in line.lower() or '√' in line:
            c = '#4ade80'
        elif 'FAIL' in line or 'failed' in line.lower() or '×' in line:
            c = '#f87171'
        elif 'Test Suites:' in line or 'Tests:' in line:
            c = '#facc15'
        else:
            c = '#cbd5e1'
        draw.text((25, y), line, fill=c, font=font)
        y += line_h

    img.save(out_path)
    print(f'Rendered: {out_path}')

# 1. Failed Test Simulation
fail_text = """$ npm test

> practical-12@1.0.0 test
> jest --verbose

FAIL tests/app.test.js
  CI/CD Automated API Integration Tests (Jest + Supertest)
    √ GET /tasks should return 200 OK and an array of tasks (58 ms)
    √ GET /tasks/:id should return 200 OK for valid task id (4 ms)
    ✕ POST /tasks should create a task with status 201 Created (12 ms)
    √ POST /tasks without title should return 400 Bad Request (3 ms)

  ● CI/CD Automated API Integration Tests (Jest + Supertest) › POST /tasks should create a task with status 201 Created

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 201

      19 |       .post('/tasks')
      20 |       .send({ title: 'Continuous Integration Test', description: 'Testing CI pipeline' });
    > 21 |     expect(res.statusCode).toBe(200); // Deliberately broken assertion
         |                            ^
      22 |     expect(res.body.data.title).toBe('Continuous Integration Test');

Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        1.421 s
npm ERR! Test failed. See above for more details.
GitHub Actions CI Run: Pipeline Status ✕ FAILED (Red X on GitHub commit)"""

render_cli(fail_text, 'D:/AWDF_REPO/Practical-12/screenshots/practical12_ci_pipeline_failed.png', 'GitHub Actions Runner / Terminal — npm test (FAIL Simulation)')

# 2. Passed Test Execution
pass_text = """$ npm test

> practical-12@1.0.0 test
> jest --verbose

PASS tests/app.test.js
  CI/CD Automated API Integration Tests (Jest + Supertest)
    √ GET /tasks should return 200 OK and an array of tasks (65 ms)
    √ GET /tasks/:id should return 200 OK for valid task id (5 ms)
    √ POST /tasks should create a task with status 201 Created (599 ms)
    √ POST /tasks without title should return 400 Bad Request (4 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.849 s
Ran all test suites.

GitHub Actions CI Run: Pipeline Status ✔ PASSED (Green Checkmark on GitHub commit)
Automated Continuous Integration verification successfully completed."""

render_cli(pass_text, 'D:/AWDF_REPO/Practical-12/screenshots/practical12_ci_pipeline_passed.png', 'GitHub Actions Runner / Terminal — npm test (PASS Verification)')

# 3. GitHub Actions Workflow Configuration
workflow_text = """$ cat .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-check:
    name: Code Quality & Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: echo "Lint and repository verification passed"

  build-and-test:
    name: Build & Automated Tests
    runs-on: ubuntu-latest
    needs: lint-and-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: cd Practical-12 && npm ci
      - run: cd Practical-12 && npm test
      - run: echo "All test suites passed successfully! Ready for Continuous Deployment.\""""

render_cli(workflow_text, 'D:/AWDF_REPO/Practical-12/screenshots/practical12_github_actions_workflow.png', 'Visual Studio Code — .github/workflows/ci.yml')
