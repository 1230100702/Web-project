/**
 * Wraps an async route/middleware handler so any rejected promise (thrown
 * error) is automatically forwarded to Express's error-handling middleware,
 * instead of needing a try/catch block in every controller function.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
