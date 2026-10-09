import React from 'react';

function Projects({ projectList }) {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '1.75rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ color: '#0f172a', borderBottom: '2px solid #8b5cf6', paddingBottom: '0.5rem', marginTop: 0 }}>
        Featured Projects
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {projectList && projectList.map((p, idx) => (
          <div key={idx} style={{
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: '#f8fafc'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.1rem' }}>{p.title}</h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
