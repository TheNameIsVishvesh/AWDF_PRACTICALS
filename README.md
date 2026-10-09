# Advanced Web Development Frameworks (ITUE301) — Laboratory Practicals 1–8

**Course:** B.Tech (IT/CE/CSE/AIML) — Advanced Web Development Frameworks  
**Subject Code:** ITUE301  
**Academic Year:** 2025–26  
**Repository:** [https://github.com/TheNameIsVishvesh/AWDF_PRACTICALS](https://github.com/TheNameIsVishvesh/AWDF_PRACTICALS)  
**Author:** Vishvesh Joshi  

---

## 📌 Repository Overview

This repository contains the complete, production-grade source code, test suites, verified outputs, genuine execution screenshots, and formatted Word laboratory reports (`.docx`) for all **eight** practicals of the Advanced Web Development Frameworks curriculum.

Every practical is structured inside its own dedicated directory according to official submission standards:
- Independent, clean project scaffolding (`package.json`, Vite/Node configurations).
- Modular, well-documented source code solving primary and supplementary tasks.
- Dedicated `screenshots/` directory containing genuine, high-resolution execution screenshots captured via automated headless browser and API testing.
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

---

## 🛠️ Practical Descriptions & Running Instructions

### Practical 1: Introduction to React and Component Architecture
- **Objective:** Scaffold a modern React development environment using Vite and build a modular student portfolio with reusable functional components (`Header`, `About`, `Skills`, `Projects`, `Footer`) using unidirectional props data flow.
- **Key Features:** Clean component hierarchy, props validation, zero JSX duplication, dynamic array rendering.
- **Run Instructions:**
  ```bash
  cd Practical-1/student-portfolio
  npm install
  npm run dev
  ```

---

### Practical 2: State Management and Routing in React
- **Objective:** Extend the portfolio application with client-side multi-page routing via React Router v6 and reactive state management using `useState`.
- **Key Features:** `BrowserRouter`, `Routes`, `Route`, `NavLink` navigation without full-page reloads, interactive bio toggle, real-time controlled contact form with live character counting, dark/light mode toggle, and custom 404 route fallback.
- **Run Instructions:**
  ```bash
  cd Practical-2/portfolio-routing
  npm install
  npm run dev
  ```

---

### Practical 3: API Integration and Data Rendering in React
- **Objective:** Consume public REST APIs (GitHub Repositories API) inside React using `useEffect`, handling full asynchronous request lifecycles (loading spinner, error boundaries, data rendering, search filtering, and retry triggers).
- **Key Features:** Async/await data fetching on component mount, live keyword filter, custom animated `Spinner`, resilient `ErrorMessage` component with retry capability, and simulation toggle for network error demonstration.
- **Run Instructions:**
  ```bash
  cd Practical-3/portfolio-api-integration
  npm install
  npm run dev
  ```

---

### Practical 4: Building a RESTful API with Node.js and Express
- **Objective:** Design and implement a RESTful backend server with complete CRUD endpoints using an Express middleware pipeline.
- **Key Features:** Request logging middleware (`[timestamp] METHOD URL`), JSON content-type validator for POST/PUT, standard HTTP status codes (`200`, `201`, `400`, `404`, `500`), centralized global error-handling middleware.
- **Run Instructions:**
  ```bash
  cd Practical-4
  npm install
  node server.js
  ```

---

### Practical 5: MongoDB Integration and Schema Design with Mongoose
- **Objective:** Connect MongoDB database to Express and enforce data validation through Mongoose schema.
- **Key Features:** Strongly-typed schema (`title`, `description`, `completed`, `priority` enum `['low', 'medium', 'high']`, `createdAt`), pre-save whitespace trimming hooks, structured validation error responses in JSON format, `.env` security configuration.
- **Run Instructions:**
  ```bash
  cd Practical-5
  npm install
  node server.js
  ```

---

### Practical 6: Full Stack Integration: React + Node + MongoDB
- **Objective:** Wire the React frontend client with the Express/MongoDB backend into an end-to-end full-stack web application.
- **Key Features:** Backend CORS configuration for cross-origin requests, shared central `api.js` client, real-time CRUD operations from the UI, asynchronous state synchronization, toast notifications on operations, delete confirmation dialogues.
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
- **Key Features:** `POST /register` with salted password hashing, `POST /login` with credential verification and signed JWT token issuance, custom `authMiddleware` inspecting Bearer tokens, server-side payload validation middleware, protected task routes, `/me` user profile endpoint.
- **Run Instructions:**
  ```bash
  cd Practical-7
  npm install
  node server.js
  ```

---

### Practical 8: Performance Optimization and Lazy Loading in React
- **Objective:** Optimize frontend load performance and initial bundle size using route-based dynamic code splitting with `React.lazy()` and `Suspense`.
- **Key Features:** On-demand chunk loading for `Projects` and `Contact` routes, animated Suspense fallback indicator, bundle size reduction verified via Vite Rollup build outputs.
- **Run Instructions:**
  ```bash
  cd Practical-8/perf-lazy-loading
  npm install
  npm run build
  npm run preview
  ```

---

## 🔒 Security & Git Best Practices
- Environment credentials, database secrets, and `.env` files are strictly excluded from version control via `.gitignore`.
- Template `.env.example` files are provided for straightforward environment configuration.
- `node_modules/` and build artifacts (`dist/`) are excluded to keep the repository lightweight and clean.
