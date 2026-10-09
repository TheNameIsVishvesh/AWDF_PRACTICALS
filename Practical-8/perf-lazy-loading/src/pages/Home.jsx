import React from 'react';

function Home() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ color: '#2563eb', marginTop: 0 }}>Performance Optimization & Lazy Loading</h1>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#334155' }}>
        This React application demonstrates route-based code splitting using <code>React.lazy()</code> and <code>Suspense</code>.
      </p>
      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '8px'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#166534' }}>⚡ Code Splitting In Action:</h3>
        <p style={{ margin: 0, color: '#15803d', fontSize: '0.95rem' }}>
          • The Home component was loaded in the initial bundle.<br />
          • The <strong>Projects</strong>, <strong>Contact</strong>, and <strong>Analytics</strong> components are split into separate dynamic JS chunks.<br />
          • They are only downloaded over the network when navigating to their respective routes!
        </p>
      </div>
    </div>
  );
}

export default Home;
