const taskEvents = require('./events');

// Log history buffer for verification and UI inspection
const eventAuditLogs = [];

// Listener 1: task-created event
taskEvents.on('task-created', (task) => {
  const handlerReceivedTime = new Date().toISOString();
  console.log(`[Event Handler Triggered] Task "${task.title}" (ID: ${task.id}) received at: ${handlerReceivedTime}`);

  // Simulate non-blocking async background work (e.g. email notification / analytics push)
  setTimeout(() => {
    const completedTime = new Date().toISOString();
    const logEntry = {
      event: 'task-created',
      taskId: task.id,
      title: task.title,
      assignedUser: task.assignedUser || 'student@charusat.edu.in',
      apiRespondedAt: task.apiRespondedAt,
      handlerCompletedAt: completedTime,
      status: 'BACKGROUND_NOTIFICATION_DISPATCHED'
    };
    eventAuditLogs.unshift(logEntry);
    console.log(`[Background Worker Done] Notification successfully dispatched for "${task.title}" at: ${completedTime}`);
  }, 1000);
});

// Listener 2: task-deleted event (Supplementary problem)
taskEvents.on('task-deleted', (task) => {
  const handlerReceivedTime = new Date().toISOString();
  console.log(`[Event Handler Triggered] Task deletion for ID ${task.id} received at: ${handlerReceivedTime}`);

  setTimeout(() => {
    const completedTime = new Date().toISOString();
    const logEntry = {
      event: 'task-deleted',
      taskId: task.id,
      title: task.title,
      apiRespondedAt: task.apiRespondedAt,
      handlerCompletedAt: completedTime,
      status: 'BACKGROUND_DELETION_AUDITED'
    };
    eventAuditLogs.unshift(logEntry);
    console.log(`[Background Worker Done] Task deletion audit recorded for ID ${task.id} at: ${completedTime}`);
  }, 800);
});

// Listener 3: error event (Supplementary problem)
taskEvents.on('error', (err) => {
  console.error(`[TaskEvents Error Caught]: ${err.message} at ${new Date().toISOString()}`);
  eventAuditLogs.unshift({
    event: 'error',
    error: err.message,
    timestamp: new Date().toISOString()
  });
});

module.exports = {
  eventAuditLogs
};
