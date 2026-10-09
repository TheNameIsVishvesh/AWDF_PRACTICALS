import React, { useState } from 'react';

function Contact({ isDarkMode }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
    color: isDarkMode ? '#f8fafc' : '#0f172a',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
    border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
    marginBottom: '1.5rem'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmittedData({ name, message, time: new Date().toLocaleTimeString() });
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ marginTop: 0, color: '#8b5cf6', fontSize: '2rem' }}>Contact Me</h1>
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          style={{
            padding: '0.35rem 0.75rem',
            backgroundColor: '#e2e8f0',
            color: '#334155',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {showTooltip ? 'Hide Help' : 'ℹ️ Form Help'}
        </button>
      </div>

      {showTooltip && (
        <div style={{
          backgroundColor: isDarkMode ? '#0f172a' : '#f0fdf4',
          border: '1px solid #86efac',
          color: isDarkMode ? '#86efac' : '#166534',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          💡 <strong>Controlled Component Notice:</strong> Every keystroke directly updates component state using <code>useState</code>. Live preview and character counter reflect state changes instantly.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Your Name:</label>
          <input
            id="contact-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vishvesh Joshi"
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '6px',
              border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Your Message:</label>
          <textarea
            id="contact-message-input"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '6px',
              border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#0f172a',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: isDarkMode ? '#94a3b8' : '#64748b', marginTop: '0.25rem' }}>
            <span>Live Controlled Input Demo</span>
            <span id="char-count">Characters: {message.length}</span>
          </div>
        </div>

        {/* Live Controlled Input Preview Box */}
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
          border: '1px dashed #94a3b8',
          borderRadius: '6px'
        }}>
          <h4 style={{ margin: '0 0 0.35rem 0', color: '#6366f1' }}>Real-Time State Preview:</h4>
          <p style={{ margin: '0 0 0.25rem 0' }}><strong>Name in State:</strong> {name || '<em>(empty)</em>'}</p>
          <p style={{ margin: 0 }}><strong>Message in State:</strong> {message || '<em>(empty)</em>'}</p>
        </div>

        <button
          type="submit"
          id="contact-submit-btn"
          style={{
            alignSelf: 'flex-start',
            padding: '0.65rem 1.5rem',
            backgroundColor: '#8b5cf6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Send Message
        </button>
      </form>

      {submittedData && (
        <div id="submission-card" style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: isDarkMode ? '#064e3b' : '#ecfdf5',
          border: '1px solid #10b981',
          borderRadius: '6px',
          color: isDarkMode ? '#a7f3d0' : '#065f46'
        }}>
          <h4 style={{ margin: '0 0 0.25rem 0' }}>✅ Message Submitted Successfully!</h4>
          <p style={{ margin: '0 0 0.25rem 0' }}>From: <strong>{submittedData.name}</strong> at {submittedData.time}</p>
          <p style={{ margin: 0 }}>Message: "{submittedData.message}"</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
