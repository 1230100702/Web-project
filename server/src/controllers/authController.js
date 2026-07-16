const { validationResult } = require('express-validator')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('../middleware/asyncHandler')

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400)
    throw new Error(errors.array()[0].msg)
  }

  const { name, email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    res.status(400)
    throw new Error('An account with this email already exists')
  }

  const user = await User.create({ name, email, password })

  res.status(201).json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    },
  })
})

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400)
    throw new Error(errors.array()[0].msg)
  }

  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.status(200).json({
    success: true,
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    },
  })
})

/**
 * @route   GET /api/auth/me
 * @access  Private
 */
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: { id: req.user._id, name: req.user.name, email: req.user.email },
    },
  })
})

module.exports = { registerUser, loginUser, getCurrentUser }
