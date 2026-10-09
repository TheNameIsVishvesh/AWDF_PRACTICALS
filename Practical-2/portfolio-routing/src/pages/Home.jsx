import React, { useState } from 'react';

function Home({ isDarkMode }) {
  const [showBioDetails, setShowBioDetails] = useState(false);

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
      <h1 style={{ marginTop: 0, color: '#3b82f6', fontSize: '2rem' }}>Welcome to My Portfolio</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: isDarkMode ? '#cbd5e1' : '#334155' }}>
        Hello! I'm <strong>Vishvesh Joshi</strong>, a student in B.Tech IT/CE studying Advanced Web Development Frameworks (ITUE301).
        This page demonstrates client-side routing with React Router v6 and state management via <code>useState</code>.
      </p>

      <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Reactive UI State Demo (useState Toggle)</h3>
        <button
          id="toggle-bio-btn"
          onClick={() => setShowBioDetails(!showBioDetails)}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {showBioDetails ? 'Hide Detailed Bio' : 'Show Detailed Bio'}
        </button>

        {showBioDetails && (
          <div id="bio-details" style={{ marginTop: '1rem', padding: '1rem', backgroundColor: isDarkMode ? '#1e293b' : '#e0f2fe', borderRadius: '6px', borderLeft: '4px solid #0284c7' }}>
            <p style={{ margin: 0, color: isDarkMode ? '#e2e8f0' : '#0369a1' }}>
              <strong>Academic Specialization:</strong> Full Stack Web Engineering, Modern JavaScript, React Ecosystem, and Asynchronous REST Architecture at CHARUSAT.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
