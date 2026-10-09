import React from 'react';

function About({ bio, education }) {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '1.75rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ color: '#0f172a', borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem', marginTop: 0 }}>
        About Me
      </h2>
      <p style={{ color: '#334155', lineHeight: '1.6', fontSize: '1.05rem' }}>{bio}</p>
      {education && (
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>
          <strong>Education:</strong> {education}
        </p>
      )}
    </section>
  );
}

export default About;
