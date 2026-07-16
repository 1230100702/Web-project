const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/User')

/**
 * Protects a route by requiring a valid JWT in the Authorization header
 * (format: "Bearer <token>"). Attaches the authenticated user to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token

  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized. Please log in to continue.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) {
      res.status(401)
      throw new Error('User no longer exists.')
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401)
    throw new Error('Not authorized. Invalid or expired token.')
  }
})

module.exports = { protect }
