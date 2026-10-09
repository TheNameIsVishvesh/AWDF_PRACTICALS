module.exports = function validateTaskInput(req, res, next) {
  if (req.method === 'POST') {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Server-side validation failed: "title" is required and cannot be empty'
      });
    }
  }

  if (req.body && req.body.priority) {
    if (!['low', 'medium', 'high'].includes(req.body.priority)) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Server-side validation failed: "priority" must be low, medium, or high'
      });
    }
  }

  next();
};
