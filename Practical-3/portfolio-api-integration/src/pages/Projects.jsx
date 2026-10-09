import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulateError, setSimulateError] = useState(false);

  const fetchRepositories = async (forceFail = false) => {
    setLoading(true);
    setError(null);

    // If simulateError is true, point to a deliberately broken URL to demonstrate error state
    const url = forceFail
      ? 'https://api.github.com/non-existent-endpoint-simulation-error-404'
      : 'https://api.github.com/users/TheNameIsVishvesh/repos?per_page=100';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Failed to fetch repository data`);
      }
      const data = await response.json();
      // If user has few or 0 repos, fallback to educational high-impact repos list or actual
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
      } else {
        // Fallback demo repos if GitHub profile has no public repos yet
        setRepos([
          { id: 101, name: 'AWDF_PRACTICALS', html_url: 'https://github.com/TheNameIsVishvesh/AWDF_PRACTICALS', description: 'Advanced Web Development Frameworks laboratory practical assignments 1 to 8.', stargazers_count: 5, forks_count: 2, language: 'JavaScript' },
          { id: 102, name: 'react-portfolio-vite', html_url: 'https://github.com/TheNameIsVishvesh/react-portfolio-vite', description: 'Responsive portfolio application built with Vite, React 18, and modular components.', stargazers_count: 3, forks_count: 1, language: 'JavaScript' },
          { id: 103, name: 'task-manager-api', html_url: 'https://github.com/TheNameIsVishvesh/task-manager-api', description: 'RESTful CRUD Task Management backend API built using Express and MongoDB.', stargazers_count: 4, forks_count: 0, language: 'JavaScript' }
        ]);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to the REST API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(simulateError);
  }, [simulateError]);

  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '2px solid #3b82f6', paddingBottom: '0.75rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '1.85rem' }}>GitHub Projects Explorer</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
            Consuming GitHub REST API with <code>useEffect</code>, async/await, and lifecycle states.
          </p>
        </div>

        {/* Buttons for testing Happy Path and Error Path */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            id="test-success-btn"
            onClick={() => setSimulateError(false)}
            style={{
              padding: '0.5rem 0.9rem',
              backgroundColor: !simulateError ? '#10b981' : '#e2e8f0',
              color: !simulateError ? '#ffffff' : '#334155',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            ✅ Normal API (Happy Path)
          </button>
          <button
            id="test-error-btn"
            onClick={() => setSimulateError(true)}
            style={{
              padding: '0.5rem 0.9rem',
              backgroundColor: simulateError ? '#ef4444' : '#e2e8f0',
              color: simulateError ? '#ffffff' : '#334155',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            💥 Simulate API Error
          </button>
        </div>
      </div>

      {/* Supplementary Search & Filter Feature */}
      {!loading && !error && (
        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            id="repo-search-input"
            type="text"
            placeholder="🔍 Filter repositories by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '0.95rem'
            }}
          />
          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Showing {filteredRepos.length} of {repos.length} repos
          </span>
        </div>
      )}

      {/* Dynamic Conditional Rendering */}
      <div style={{ marginTop: '1.5rem' }}>
        {loading && <Spinner message="Connecting to GitHub REST API and loading repositories..." />}
        {error && <ErrorMessage message={error} onRetry={() => fetchRepositories(false)} />}
        {!loading && !error && <RepoList repos={filteredRepos} />}
      </div>
    </div>
  );
}

export default Projects;
