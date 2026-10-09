const BASE_URL = 'http://localhost:5000';

export async function fetchTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function addTask(taskData) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!res.ok) throw new Error(`Create failed: HTTP ${res.status}`);
  return res.json();
}

export async function toggleTaskComplete(id, currentStatus) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !currentStatus })
  });
  if (!res.ok) throw new Error(`Update failed: HTTP ${res.status}`);
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error(`Delete failed: HTTP ${res.status}`);
  return res.json();
}
