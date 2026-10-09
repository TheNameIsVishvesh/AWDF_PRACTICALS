import React from 'react';

function Footer({ copyrightYear, contactEmail, githubUser }) {
  return (
    <footer style={{
      backgroundColor: '#f8fafc',
      padding: '1.5rem',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
      color: '#64748b',
      fontSize: '0.95rem'
    }}>
      <p style={{ margin: '0 0 0.5rem 0' }}>
        &copy; {copyrightYear || new Date().getFullYear()} Student Portfolio. All rights reserved.
      </p>
      <p style={{ margin: 0 }}>
        Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{contactEmail}</a> | GitHub: <a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>@{githubUser}</a>
      </p>
    </footer>
  );
}

export default Footer;
