import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div id="error-message-box" style={{
      backgroundColor: '#fef2f2',
      border: '1px solid #f87171',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '1.5rem 0',
      color: '#991b1b',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#b91c1c' }}>⚠️ Network Error Occurred</h3>
      <p style={{ margin: '0 0 1rem 0' }}>{message}</p>
      {onRetry && (
        <button
          id="retry-btn"
          onClick={onRetry}
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
