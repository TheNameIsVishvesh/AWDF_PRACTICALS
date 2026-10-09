import React from 'react';

// Heavy component simulating large dataset
function Projects() {
  const items = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Optimized Modular Feature #${i + 1}`,
    description: `Dynamic on-demand chunk evaluation for scalable frontend client architectures. Chunk bundle size verified with Vite Rollup analyzer.`
  }));

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ color: '#10b981', marginTop: 0 }}>Lazy-Loaded Projects Chunk</h1>
      <p style={{ color: '#475569' }}>
        This page was loaded dynamically via a separate JavaScript chunk (<code>Projects-[hash].js</code>).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        {items.slice(0, 6).map((item) => (
          <div key={item.id} style={{
            padding: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: '#f8fafc'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
