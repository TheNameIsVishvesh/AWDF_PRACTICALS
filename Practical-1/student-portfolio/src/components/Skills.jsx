import React from 'react';

function Skills({ skillList, category }) {
  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '1.75rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{ color: '#0f172a', borderBottom: '2px solid #10b981', paddingBottom: '0.5rem', marginTop: 0 }}>
        Technical Skills {category ? `(${category})` : ''}
      </h2>
      <ul style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        listStyleType: 'none',
        padding: 0,
        margin: '1rem 0 0 0'
      }}>
        {skillList && skillList.map((s, index) => (
          <li
            key={index}
            style={{
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontWeight: '500',
              fontSize: '0.95rem',
              border: '1px solid #bae6fd'
            }}
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
