import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Projects from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1rem',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.35rem' }}>Student Portfolio API Explorer</h2>
            <small style={{ color: '#94a3b8' }}>Advanced Web Development Frameworks - Practical 3</small>
          </div>
          <nav>
            <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600', marginRight: '1rem' }}>Projects Page</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
