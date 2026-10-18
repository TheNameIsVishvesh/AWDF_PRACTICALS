import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, toggleTaskComplete, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await addTask({ title, description, priority });
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
      showToast('Task created and stored in database successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await toggleTaskComplete(id, currentStatus);
      setTasks(tasks.map(t => t._id === id ? { ...t, completed: !currentStatus } : t));
      showToast('Task status updated successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      showToast('Task removed from backend database!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#0f172a'
    }}>
      {/* Toast Notification */}
      {toast && (
        <div id="toast-notification" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: toast.type === 'error' ? '#ef4444' : '#10b981',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontWeight: '600',
          zIndex: 9999
        }}>
          {toast.type === 'error' ? '❌ ' : '✅ '} {toast.msg}
        </div>
      )}

      <header style={{
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem' }}>Full Stack Task Management System</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>
          React 18 Frontend connected to Node/Express/MongoDB Backend with CORS and Asynchronous State Sync
        </p>
      </header>

      {/* Task Creation Form */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: '#1e293b' }}>Add New Task to Backend</h2>
        <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px auto', gap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Title *</label>
            <input
              id="new-task-title"
              type="text"
              required
              placeholder="e.g. Implement CORS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Description</label>
            <input
              id="new-task-desc"
              type="text"
              placeholder="Task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            id="add-task-btn"
            type="submit"
            style={{
              padding: '0.6rem 1.25rem',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ➕ Add Task
          </button>
        </form>
      </section>

      {/* Task List */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.35rem' }}>Database Tasks ({tasks.length})</h2>
          <button
            onClick={loadAllTasks}
            style={{ padding: '0.4rem 0.8rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
          >
            🔄 Refresh
          </button>
        </div>

        {loading && <p style={{ color: '#64748b', textAlign: 'center' }}>Connecting to backend server...</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>Error connecting to API: {error}</p>}

        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No tasks found in database.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="task-row"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                borderLeft: task.completed ? '4px solid #10b981' : '4px solid #f59e0b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task._id, task.completed)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <div>
                  <h4 style={{
                    margin: 0,
                    fontSize: '1.05rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#94a3b8' : '#0f172a'
                  }}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#e0f2fe',
                  color: task.priority === 'high' ? '#991b1b' : task.priority === 'medium' ? '#92400e' : '#075985'
                }}>
                  {task.priority || 'medium'}
                </span>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
