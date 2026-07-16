const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    storedFileName: {
      type: String,
      required: true,
    },
    fileSizeBytes: {
      type: Number,
      required: true,
    },
    extractedTextLength: {
      type: Number,
      default: 0,
    },
    summaryText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'failed'],
      default: 'completed',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Summary', summarySchema)
