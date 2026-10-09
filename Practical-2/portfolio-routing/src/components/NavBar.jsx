import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ isDarkMode, onToggleTheme }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    marginBottom: '1.5rem',
    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  };

  const linkBaseStyle = {
    margin: '0 0.75rem',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s, color 0.2s'
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: isDarkMode ? '#f8fafc' : '#0f172a' }}>
        Portfolio<span style={{ color: '#3b82f6' }}>.Router</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            color: isActive ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#475569'),
            backgroundColor: isActive ? '#3b82f6' : 'transparent'
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            color: isActive ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#475569'),
            backgroundColor: isActive ? '#3b82f6' : 'transparent'
          })}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            ...linkBaseStyle,
            color: isActive ? '#ffffff' : (isDarkMode ? '#cbd5e1' : '#475569'),
            backgroundColor: isActive ? '#3b82f6' : 'transparent'
          })}
        >
          Contact
        </NavLink>
        <button
          onClick={onToggleTheme}
          style={{
            marginLeft: '1rem',
            padding: '0.4rem 0.8rem',
            backgroundColor: isDarkMode ? '#fbbf24' : '#1e293b',
            color: isDarkMode ? '#0f172a' : '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
