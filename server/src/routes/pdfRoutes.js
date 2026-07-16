const express = require('express')
const { uploadPdf, getHistory, getSummaryById } = require('../controllers/pdfController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const router = express.Router()

router.post('/upload', protect, upload.single('pdf'), uploadPdf)
router.get('/history', protect, getHistory)
router.get('/:id', protect, getSummaryById)

module.exports = router
