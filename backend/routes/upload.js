const express    = require('express')
const router     = express.Router()
const cloudinary = require('cloudinary').v2
const multer     = require('multer')
const auth       = require('../middleware/auth')

// Configure Cloudinary
cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
})

// Use memory storage — no disk writes
const storage = multer.memoryStorage()
const upload  = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'), false)
  },
})

// POST /api/upload — upload image to Cloudinary
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image provided' })

    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder:         'azike-menu',
          transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(req.file.buffer)
    })

    res.json({ imageUrl: result.secure_url, publicId: result.public_id })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ message: 'Upload failed', error: err.message })
  }
})

// DELETE /api/upload — remove image from Cloudinary
router.delete('/', auth, async (req, res) => {
  try {
    const { publicId } = req.body
    if (!publicId) return res.status(400).json({ message: 'No publicId provided' })

    await cloudinary.uploader.destroy(publicId)
    res.json({ message: 'Image deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message })
  }
})

module.exports = router