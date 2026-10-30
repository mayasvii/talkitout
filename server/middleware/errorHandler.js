/**
 * Custom Error Response class for throwing errors with specific HTTP status codes.
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * 404 Handler for undefined routes.
 */
const notFound = (req, res, next) => {
  const error = new ErrorResponse(`Resource not found at URL: ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Central Express Error Handling Middleware.
 * Catches all errors forwarded via next(err) or thrown in async handlers,
 * normalizing them into the consistent JSON format:
 * { success: false, message: "...", data: null, error: ... }
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error stack for debugging during development
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error Details]:', err);
  }

  // 1. Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with ID of '${err.value}'`;
    error = new ErrorResponse(message, 404);
  }

  // 2. Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `An account or record with that ${field} already exists.`;
    error = new ErrorResponse(message, 400);
  }

  // 3. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    error = new ErrorResponse(message, 400);
  }

  // 4. JWT Malformed / Invalid Error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid authorization token. Please login again.';
    error = new ErrorResponse(message, 401);
  }

  // 5. JWT Expired Error
  if (err.name === 'TokenExpiredError') {
    const message = 'Authorization token has expired. Please login again.';
    error = new ErrorResponse(message, 401);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = {
  ErrorResponse,
  notFound,
  errorHandler,
};
