const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')

const uploadDir = path.join(__dirname, '..', '..', 'uploads')

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(16).toString('hex')
    const ext = path.extname(file.originalname) || '.pdf'
    cb(null, `${Date.now()}-${uniqueSuffix}${ext}`)
  },
})

function fileFilter(req, file, cb) {
  const isPdf =
    file.mimetype === 'application/pdf' ||
    path.extname(file.originalname).toLowerCase() === '.pdf'

  if (!isPdf) {
    return cb(new Error('Only PDF files are allowed'), false)
  }
  cb(null, true)
}

const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB) || 15

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
})

module.exports = upload
