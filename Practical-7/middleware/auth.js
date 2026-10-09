const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Access denied. Missing or malformed Authorization header with Bearer token'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Token not found in authorization header'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key_charusat_awdf_2026');
    req.user = decoded; // Attach authenticated user payload to request
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token',
      reason: err.message
    });
  }
};
