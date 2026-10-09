import React from 'react';

function Projects({ isDarkMode }) {
  const projects = [
    { id: 1, title: 'React Component Portfolio', tech: 'React, Vite, Props', desc: 'Modular student portfolio with reusable functional components and dynamic props flow.' },
    { id: 2, title: 'Client-Side SPA Routing Engine', tech: 'React Router v6, Hooks', desc: 'Zero page reload multi-route application with real-time reactive state tracking.' },
    { id: 3, title: 'RESTful Backend API', tech: 'Node.js, Express, Middleware', desc: 'Clean CRUD architecture with request logging and centralized error handling pipelines.' }
  ];

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
    marginBottom: '1.5rem'
  };

  return (
    <div style={cardStyle}>
      <h1 style={{ marginTop: 0, color: '#10b981', fontSize: '2rem' }}>My Projects</h1>
      <p style={{ color: isDarkMode ? '#cbd5e1' : '#475569' }}>
        Showcasing technical works and practical implementations completed in the AWDF course.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
        {projects.map((p) => (
          <div
            key={p.id}
            style={{
              padding: '1.25rem',
              backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
              border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: isDarkMode ? '#f1f5f9' : '#0f172a' }}>{p.title}</h3>
              <p style={{ fontSize: '0.9rem', color: isDarkMode ? '#94a3b8' : '#64748b', lineHeight: '1.5' }}>{p.desc}</p>
            </div>
            <span style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.25rem 0.6rem',
              backgroundColor: isDarkMode ? '#1e3a8a' : '#e0e7ff',
              color: isDarkMode ? '#bfdbfe' : '#3730a3',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {p.tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
