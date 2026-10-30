/**
 * Higher-order function to wrap asynchronous Express route handlers.
 * Automatically catches any rejected promises and passes them to next(error),
 * triggering the centralized error handling middleware.
 *
 * @param {Function} fn - Async controller function (req, res, next)
 * @returns {Function} Express middleware handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
