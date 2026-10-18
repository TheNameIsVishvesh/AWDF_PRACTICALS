const EventEmitter = require('events');

class TaskEvents extends EventEmitter {}

// Export singleton instance of TaskEvents
module.exports = new TaskEvents();
