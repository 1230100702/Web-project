/**
 * Handles requests to routes that don't exist.
 */
function notFound(req, res, next) {
  const error = new Error(`Route not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

/**
 * Central error handler. Any error thrown (or passed to next(error)) in
 * a controller/middleware ends up here.
 */
function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
  let message = err.message || 'Server error'

  // Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  // Mongoose duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue || {})[0]
    message = `${field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Field'} already in use`
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ')
  }

  // Multer file errors
  if (err.name === 'MulterError') {
    statusCode = 400
    message = err.message
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}

module.exports = { notFound, errorHandler }
