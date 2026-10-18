# Advanced Web Development Frameworks (ITUE301) — Laboratory Practicals 1–13

**Course:** B.Tech (IT/CE/CSE/AIML) — Advanced Web Development Frameworks  
**Subject Code:** ITUE301  
**Academic Year:** 2025–26  
**Repository:** [https://github.com/TheNameIsVishvesh/AWDF_PRACTICALS](https://github.com/TheNameIsVishvesh/AWDF_PRACTICALS)  
**Author:** Vishvesh Joshi  

---

## 📌 Repository Overview

This repository contains the complete, production-grade source code, test suites, verified outputs, genuine execution screenshots, and formatted Word laboratory reports (`.docx`) for all **thirteen (1–13)** practicals of the Advanced Web Development Frameworks curriculum.

Every practical is structured inside its own dedicated directory according to official submission standards:
- Independent, clean project scaffolding (`package.json`, Vite/Node/Docker configurations).
- Modular, well-documented source code solving primary and supplementary tasks.
- Dedicated `screenshots/` directory containing genuine, high-resolution execution screenshots captured via automated headless browser, API testing, and terminal execution logs.
- Official practical report formatted strictly using the prescribed institutional format (`File-Format.docx`).

---

## 📑 Table of Contents

| Practical | Title | Technology Stack | Folder Link | Word Report |
| :---: | :--- | :--- | :---: | :---: |
| **1** | [Introduction to React and Component Architecture](#practical-1-introduction-to-react-and-component-architecture) | Vite, React 18, JSX, Props | [📁 Practical-1](./Practical-1) | [📄 Report](./Practical-1/Practical-1-Report.docx) |
| **2** | [State Management and Routing in React](#practical-2-state-management-and-routing-in-react) | React Router v6, useState, Controlled Forms | [📁 Practical-2](./Practical-2) | [📄 Report](./Practical-2/Practical-2-Report.docx) |
| **3** | [API Integration and Data Rendering in React](#practical-3-api-integration-and-data-rendering-in-react) | Asynchronous Fetch, useEffect, State Handling | [📁 Practical-3](./Practical-3) | [📄 Report](./Practical-3/Practical-3-Report.docx) |
| **4** | [Building a RESTful API with Node.js and Express](#practical-4-building-a-restful-api-with-nodejs-and-express) | Express.js, Custom Middleware, CRUD Pipeline | [📁 Practical-4](./Practical-4) | [📄 Report](./Practical-4/Practical-4-Report.docx) |
| **5** | [MongoDB Integration and Schema Design with Mongoose](#practical-5-mongodb-integration-and-schema-design-with-mongoose) | Mongoose ODM, Schema Validation, Enums, Hooks | [📁 Practical-5](./Practical-5) | [📄 Report](./Practical-5/Practical-5-Report.docx) |
| **6** | [Full Stack Integration: React + Node + MongoDB](#practical-6-full-stack-integration-react--node--mongodb) | MERN Stack, CORS, Asynchronous State Sync | [📁 Practical-6](./Practical-6) | [📄 Report](./Practical-6/Practical-6-Report.docx) |
| **7** | [Authentication and Middleware Pipeline](#practical-7-authentication-and-middleware-pipeline) | JWT, Bcrypt.js, Auth Guard Middleware | [📁 Practical-7](./Practical-7) | [📄 Report](./Practical-7/Practical-7-Report.docx) |
| **8** | [Performance Optimization and Lazy Loading in React](#practical-8-performance-optimization-and-lazy-loading-in-react) | React.lazy, Suspense, Route Code-Splitting | [📁 Practical-8](./Practical-8) | [📄 Report](./Practical-8/Practical-8-Report.docx) |
| **9** | [In-Memory Caching and Query Optimization](#practical-9-in-memory-caching-and-query-optimization) | Node-Cache, Cache Invalidation, Benchmarking | [📁 Practical-9](./Practical-9) | [📄 Report](./Practical-9/Practical-9-Report.docx) |
| **10** | [Asynchronous Processing with Event-Driven Architecture](#practical-10-asynchronous-processing-with-event-driven-architecture) | Node.js EventEmitter, Non-Blocking Workers | [📁 Practical-10](./Practical-10) | [📄 Report](./Practical-10/Practical-10-Report.docx) |
| **11** | [Containerization with Docker and Docker Compose](#practical-11-containerization-with-docker-and-docker-compose) | Docker, Docker Compose, Multi-Stage Builds | [📁 Practical-11](./Practical-11) | [📄 Report](./Practical-11/Practical-11-Report.docx) |
| **12** | [CI/CD Pipeline with GitHub Actions](#practical-12-cicd-pipeline-with-github-actions) | GitHub Actions, YAML, Jest, Supertest | [📁 Practical-12](./Practical-12) | [📄 Report](./Practical-12/Practical-12-Report.docx) |
| **13** | [AI API Integration into a Web Application](#practical-13-ai-api-integration-into-a-web-application) | OpenAI/Gemini Bridge, Graceful Degradation | [📁 Practical-13](./Practical-13) | [📄 Report](./Practical-13/Practical-13-Report.docx) |

---

## 🛠️ Practical Descriptions & Running Instructions

### Practical 1: Introduction to React and Component Architecture
- **Objective:** Scaffold a modern React development environment using Vite and build a modular student portfolio with reusable functional components (`Header`, `About`, `Skills`, `Projects`, `Footer`) using unidirectional props data flow.
- **Run Instructions:**
  ```bash
  cd Practical-1/student-portfolio
  npm install
  npm run dev
  ```

---

### Practical 2: State Management and Routing in React
- **Objective:** Extend the portfolio application with client-side multi-page routing via React Router v6 and reactive state management using `useState`.
- **Run Instructions:**
  ```bash
  cd Practical-2/portfolio-routing
  npm install
  npm run dev
  ```

---

### Practical 3: API Integration and Data Rendering in React
- **Objective:** Consume public REST APIs (GitHub Repositories API) inside React using `useEffect`, handling full asynchronous request lifecycles.
- **Run Instructions:**
  ```bash
  cd Practical-3/portfolio-api-integration
  npm install
  npm run dev
  ```

---

### Practical 4: Building a RESTful API with Node.js and Express
- **Objective:** Design and implement a RESTful backend server with complete CRUD endpoints using an Express middleware pipeline.
- **Run Instructions:**
  ```bash
  cd Practical-4
  npm install
  node server.js
  ```

---

### Practical 5: MongoDB Integration and Schema Design with Mongoose
- **Objective:** Connect MongoDB database to Express and enforce data validation through Mongoose schema.
- **Run Instructions:**
  ```bash
  cd Practical-5
  npm install
  node server.js
  ```

---

### Practical 6: Full Stack Integration: React + Node + MongoDB
- **Objective:** Wire the React frontend client with the Express/MongoDB backend into an end-to-end full-stack web application.
- **Run Instructions:**
  ```bash
  # Terminal 1 - Start Backend API
  cd Practical-6/backend
  npm install
  node server.js

  # Terminal 2 - Start Frontend Client
  cd Practical-6/frontend/task-client
  npm install
  npm run dev
  ```

---

### Practical 7: Authentication and Middleware Pipeline
- **Objective:** Implement secure user authentication using JSON Web Tokens (JWT) and Bcrypt password hashing within the Express middleware pipeline.
- **Run Instructions:**
  ```bash
  cd Practical-7
  npm install
  node server.js
  ```

---

### Practical 8: Performance Optimization and Lazy Loading in React
- **Objective:** Optimize frontend load performance and initial bundle size using route-based dynamic code splitting with `React.lazy()` and `Suspense`.
- **Run Instructions:**
  ```bash
  cd Practical-8/perf-lazy-loading
  npm install
  npm run build
  npm run preview
  ```

---

### Practical 9: In-Memory Caching and Query Optimization
- **Objective:** Implement server-side caching using `node-cache` with a 60-second TTL on `GET /tasks`, enforce strict cache invalidation on write operations (`POST`, `PUT`, `DELETE`), and measure latency differences between uncached and cached requests.
- **Empirical Benchmark Findings:**
  - **Uncached Database Query:** ~65.12 ms – 113.59 ms
  - **In-Memory Cache Hit:** ~1.54 ms – 1.83 ms (**>97% latency reduction**)
- **Run Instructions:**
  ```bash
  cd Practical-9
  npm install
  node server.js
  ```

---

### Practical 10: Asynchronous Processing with Event-Driven Architecture
- **Objective:** Implement non-blocking background notifications using Node.js built-in `EventEmitter`. Decouple notification dispatching from the critical HTTP request path so API responses return immediately before background workers complete.
- **Key Features:** `task-created`, `task-deleted`, and `error` events, timestamp logging proving response-before-handler completion, inspection audit endpoint `/events/audit`.
- **Run Instructions:**
  ```bash
  cd Practical-10
  npm install
  node server.js
  ```

---

### Practical 11: Containerization with Docker and Docker Compose
- **Objective:** Containerize the full-stack MERN application using Docker and orchestrate all three services (`frontend`, `backend`, `mongodb`) using `docker-compose.yml` on a shared bridge network.
- **Key Features:** Multi-stage frontend build (Node/Vite), backend production container, MongoDB volume persistence (`mongo-data`), inter-service DNS resolution via container service names.
- **Run Instructions:**
  ```bash
  cd Practical-11
  docker compose up --build
  ```

---

### Practical 12: CI/CD Pipeline with GitHub Actions
- **Objective:** Automate continuous integration and automated testing using GitHub Actions (`.github/workflows/ci.yml`).
- **Key Features:** Automatic trigger on push and pull requests to `main`, dependency caching, automated API tests using Jest and Supertest, verified pass/fail pipeline diagnosis.
- **Run Instructions:**
  ```bash
  cd Practical-12
  npm install
  npm test
  ```

---

### Practical 13: AI API Integration into a Web Application
- **Objective:** Securely integrate third-party AI capabilities (OpenAI/Gemini proxy) into the task management workflow via backend route (`/api/ai/generate-description`).
- **Key Features:** Server-side API key protection (`.env`), client-side AI suggestions for task descriptions and priorities, rate-limiting throttle, graceful degradation fallback on third-party outage, ethical AI review disclaimers.
- **Run Instructions:**
  ```bash
  # Terminal 1 - Backend AI Proxy
  cd Practical-13/backend
  npm install
  node server.js

  # Terminal 2 - Frontend Client
  cd Practical-13/frontend/ai-task-client
  npm install
  npm run dev
  ```

---

## 🔒 Security & Git Best Practices
- Environment credentials, database secrets, and `.env` files are strictly excluded from version control via `.gitignore`.
- Template `.env.example` files are provided for straightforward environment configuration.
- `node_modules/` and build artifacts (`dist/`) are excluded to keep the repository lightweight and clean.
