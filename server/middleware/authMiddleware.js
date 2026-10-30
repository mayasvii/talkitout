const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: protect
 * Verifies the incoming Bearer JWT token in the Authorization header.
 * Attaches the authenticated user's document (without password) to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header string: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token signature and expiration
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID encoded in token payload (excluding password hash)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User belonging to this token no longer exists.',
          data: null,
        });
      }

      return next();
    } catch (error) {
      console.error('[Auth Middleware Error]:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid or expired token.',
        data: null,
      });
    }
  }

  // If no Bearer token was provided in the headers
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No token provided in Authorization header (format: Bearer <token>).',
      data: null,
    });
  }
};

/**
 * Middleware: adminOnly
 * Restricts route access strictly to users with the 'admin' role.
 * Must be used AFTER the `protect` middleware.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access forbidden: Admin privileges are required to perform this action.',
    data: null,
  });
};

module.exports = {
  protect,
  adminOnly,
};
