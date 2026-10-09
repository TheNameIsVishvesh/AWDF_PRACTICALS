import React from 'react';

function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No repositories found matching your query.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="repo-card"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem' }}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}
              >
                {repo.name}
              </a>
            </h3>
            <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.9rem', lineHeight: '1.4' }}>
              {repo.description || 'No description provided for this repository.'}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#64748b' }}>
            <span>⭐ Stars: {repo.stargazers_count ?? 0}</span>
            <span>🍴 Forks: {repo.forks_count ?? 0}</span>
            <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              {repo.language || 'Code'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
