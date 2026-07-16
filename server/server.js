require('dotenv').config()

const app = require('./src/app')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000

// Connect to MongoDB, then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
  })
})

// Safety nets for unexpected errors
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`)
})

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})
