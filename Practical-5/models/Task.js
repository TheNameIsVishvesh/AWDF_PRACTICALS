const mongoose = require('mongoose');

// Task Schema Design with strict validations and supplementary requirements
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required and cannot be empty'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  // Supplementary problem: priority restricted to enum
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be either low, medium, or high'
    },
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Supplementary problem: pre-save hook to trim whitespace
taskSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
