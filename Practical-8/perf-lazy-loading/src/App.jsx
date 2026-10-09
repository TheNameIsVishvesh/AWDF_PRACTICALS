import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';

// Lazy loading route-based components with React.lazy
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

// Fallback UI with animated loading feedback
function RouteFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #94a3b8'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '1rem', color: '#6366f1', fontWeight: '600' }}>
        ⏳ Downloading dynamic chunk from server (Suspense Fallback)...
      </p>
    </div>
  );
}

function App() {
  const linkStyle = ({ isActive }) => ({
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    color: isActive ? '#ffffff' : '#334155',
    backgroundColor: isActive ? '#4f46e5' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <BrowserRouter>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem 1rem',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1e1b4b',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Vite React Code Splitting</h2>
            <small style={{ color: '#a5b4fc' }}>Route-Based Lazy Loading with React.lazy() & Suspense</small>
          </div>
          <nav style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#312e81', padding: '0.3rem', borderRadius: '8px' }}>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/projects" style={linkStyle}>Projects (Lazy)</NavLink>
            <NavLink to="/contact" style={linkStyle}>Contact (Lazy)</NavLink>
          </nav>
        </header>

        {/* Suspense wrapping the dynamic Routes block */}
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
