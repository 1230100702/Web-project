const mongoose = require('mongoose')

/**
 * Establishes a connection to MongoDB Atlas using Mongoose.
 * Exits the process if the connection cannot be established,
 * since the API is useless without a database.
 */
async function connectDB() {
  const uri = process.env.MONGO_URI

  if (!uri) {
    console.error('MONGO_URI is not defined. Please set it in your .env file.')
    process.exit(1)
  }

  try {
    const conn = await mongoose.connect(uri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
