import React from 'react';

function Header({ name, title, themeColor }) {
  const headerStyle = {
    backgroundColor: themeColor || '#1e293b',
    color: '#ffffff',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem'
  };

  return (
    <header style={headerStyle}>
      <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.25rem', fontWeight: '700' }}>{name}</h1>
      <p style={{ margin: 0, fontSize: '1.15rem', opacity: 0.9 }}>{title}</p>
    </header>
  );
}

export default Header;
