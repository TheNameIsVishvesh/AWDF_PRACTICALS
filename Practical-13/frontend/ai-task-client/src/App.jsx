import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiDisclaimer, setAiDisclaimer] = useState('');
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/tasks');
      const json = await res.json();
      if (json.data) setTasks(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // AI Description Generator (Calls Secure Backend)
  const handleGenerateAiDescription = async () => {
    if (!title.trim()) {
      alert('Please enter a task title first so the AI has context!');
      return;
    }

    setIsAiLoading(true);
    setAiDisclaimer('');

    try {
      const res = await fetch('http://localhost:5000/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, simulateFailure })
      });

      const json = await res.json();

      if (json.data) {
        setDescription(json.data.description);
        if (json.data.suggestedPriority) setPriority(json.data.suggestedPriority);
        setAiDisclaimer(json.data.disclaimer);
        setIsFallbackMode(Boolean(json.fallback));
      }
    } catch (err) {
      // Graceful degradation on client side as well
      setDescription(`Manual task details for: ${title}`);
      setAiDisclaimer('⚠️ Network offline: Gracefully degraded to local manual entry.');
      setIsFallbackMode(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority })
      });
      const json = await res.json();
      if (json.data) {
        setTasks([json.data, ...tasks]);
        setTitle('');
        setDescription('');
        setAiDisclaimer('');
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '2rem 1rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#1e1b4b', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>AI-Powered Task Management System</h1>
        <p style={{ margin: '0.4rem 0 0 0', color: '#c7d2fe', fontSize: '0.95rem' }}>
          Secure Backend AI Proxy (OpenAI / Gemini) with Graceful Degradation & Ethical AI Disclaimers
        </p>
      </header>

      {/* AI Simulation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eef2ff', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.25rem', border: '1px solid #c7d2fe' }}>
        <span style={{ fontSize: '0.9rem', color: '#3730a3', fontWeight: '500' }}>
          🧪 AI Resilience Test Mode:
        </span>
        <button
          id="toggle-failure-btn"
          onClick={() => setSimulateFailure(!simulateFailure)}
          style={{
            padding: '0.4rem 0.8rem',
            backgroundColor: simulateFailure ? '#ef4444' : '#4f46e5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          {simulateFailure ? '💥 Simulating AI Outage (Failure Path)' : '✅ Normal AI Service (Happy Path)'}
        </button>
      </div>

      {/* Task Creation Form with AI Auto-Complete */}
      <section style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: '#0f172a' }}>Create Task with AI Suggestions</h2>
        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Task Title *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                id="task-title-input"
                type="text"
                required
                placeholder="e.g. Set up Docker containerization for full stack app"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ flex: 1, padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <button
                id="generate-ai-btn"
                type="button"
                onClick={handleGenerateAiDescription}
                disabled={isAiLoading}
                style={{
                  padding: '0.6rem 1rem',
                  backgroundColor: isAiLoading ? '#94a3b8' : '#7c3aed',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: isAiLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isAiLoading ? '✨ Generating...' : '✨ Generate with AI'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
              Task Description (Editable Suggestion)
            </label>
            <textarea
              id="task-desc-input"
              rows="3"
              placeholder="AI generated or manual description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          {/* AI Responsible Usage Disclaimer */}
          {aiDisclaimer && (
            <div id="ai-disclaimer-box" style={{
              padding: '0.75rem 1rem',
              backgroundColor: isFallbackMode ? '#fffbeb' : '#f0fdf4',
              border: isFallbackMode ? '1px solid #fcd34d' : '1px solid #86efac',
              borderRadius: '6px',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              color: isFallbackMode ? '#92400e' : '#166534'
            }}>
              <strong>{isFallbackMode ? '⚠️ Graceful Degradation Notice:' : '🤖 Responsible AI Notice:'}</strong> {aiDisclaimer}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div>
              <label style={{ fontWeight: '600', fontSize: '0.9rem', marginRight: '0.5rem' }}>Priority:</label>
              <select
                id="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              id="submit-task-btn"
              type="submit"
              style={{ padding: '0.6rem 1.5rem', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginLeft: 'auto' }}
            >
              Save Task to Database
            </button>
          </div>
        </form>
      </section>

      {/* Task List View */}
      <section>
        <h3 style={{ margin: '0 0 1rem 0' }}>Stored Tasks ({tasks.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.map((t) => (
            <div key={t.id} className="task-item" style={{ padding: '1rem', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>{t.title}</h4>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: t.priority === 'high' ? '#fee2e2' : '#e0e7ff', color: t.priority === 'high' ? '#991b1b' : '#3730a3' }}>
                  {t.priority.toUpperCase()}
                </span>
              </div>
              <p style={{ margin: '0.4rem 0 0 0', color: '#475569', fontSize: '0.9rem' }}>{t.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
