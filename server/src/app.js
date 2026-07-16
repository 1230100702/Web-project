const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
const pdfRoutes = require('./routes/pdfRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'PDF Summarizer API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/pdf', pdfRoutes)

// 404 + error handling (must be last)
app.use(notFound)
app.use(errorHandler)

module.exports = app
