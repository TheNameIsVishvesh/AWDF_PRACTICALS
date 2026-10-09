import React, { useState } from 'react';

function Contact() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ color: '#8b5cf6', marginTop: 0 }}>Lazy-Loaded Contact Chunk</h1>
      <p style={{ color: '#475569' }}>
        This chunk (<code>Contact-[hash].js</code>) was only requested when navigating to <code>/contact</code>.
      </p>

      {submitted ? (
        <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', color: '#065f46' }}>
          ✅ Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '450px' }}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <textarea
            rows="4"
            required
            placeholder="Feedback regarding code splitting and chunk load latency..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <button
            type="submit"
            style={{ padding: '0.65rem', backgroundColor: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
