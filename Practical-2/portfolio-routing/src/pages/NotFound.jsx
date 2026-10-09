import React from 'react';
import { Link } from 'react-router-dom';

function NotFound({ isDarkMode }) {
  return (
    <div style={{
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      color: isDarkMode ? '#f8fafc' : '#0f172a',
      padding: '3rem 2rem',
      borderRadius: '8px',
      textAlign: 'center',
      border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', color: '#ef4444' }}>404</h1>
      <h2 style={{ margin: '0 0 1rem 0' }}>Page Not Found</h2>
      <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b', marginBottom: '1.5rem' }}>
        The route you are trying to access does not exist in this Single Page Application.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: '600'
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
