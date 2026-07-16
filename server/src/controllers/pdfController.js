const fs = require('fs')
const pdfParse = require('pdf-parse')
const Summary = require('../models/Summary')
const asyncHandler = require('../middleware/asyncHandler')
const { generateSummary } = require('../utils/summarizer')

/**
 * @route   POST /api/pdf/upload
 * @access  Private
 * Accepts a single PDF file (field name "pdf"), extracts its text,
 * generates a summary, stores the result in MongoDB, and returns it.
 */
const uploadPdf = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Please select a PDF file to upload')
  }

  const filePath = req.file.path

  try {
    const fileBuffer = fs.readFileSync(filePath)
    const parsed = await pdfParse(fileBuffer)
    const summaryText = generateSummary(parsed.text, 6)

    const summary = await Summary.create({
      user: req.user._id,
      originalName: req.file.originalname,
      storedFileName: req.file.filename,
      fileSizeBytes: req.file.size,
      extractedTextLength: parsed.text.length,
      summaryText,
      status: 'completed',
    })

    res.status(201).json({ success: true, data: summary })
  } catch (error) {
    // Clean up the stored file if processing fails, and record a failed entry
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    res.status(422)
    throw new Error('Could not process this PDF. Make sure it is a valid, text-based PDF file.')
  }
})

/**
 * @route   GET /api/pdf/history
 * @access  Private
 * Returns the logged-in user's summary history, most recent first.
 */
const getHistory = asyncHandler(async (req, res) => {
  const summaries = await Summary.find({ user: req.user._id }).sort({ createdAt: -1 })

  res.status(200).json({ success: true, count: summaries.length, data: summaries })
})

/**
 * @route   GET /api/pdf/:id
 * @access  Private
 * Returns a single summary, only if it belongs to the logged-in user.
 */
const getSummaryById = asyncHandler(async (req, res) => {
  const summary = await Summary.findOne({ _id: req.params.id, user: req.user._id })

  if (!summary) {
    res.status(404)
    throw new Error('Summary not found')
  }

  res.status(200).json({ success: true, data: summary })
})

module.exports = { uploadPdf, getHistory, getSummaryById }
