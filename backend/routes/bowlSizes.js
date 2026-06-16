const express    = require('express')
const router     = express.Router()
const multer     = require('multer')
const cloudinary = require('cloudinary').v2
const auth       = require('../middleware/auth')
const BowlSize   = require('../models/BowlSize')

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage()
const upload  = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'), false)
  },
})

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'azike-menu',
        transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })
}

const normalizeBowlSize = (bowlSize) => {
  const obj = bowlSize.toObject ? bowlSize.toObject() : bowlSize
  return {
    _id: obj._id,
    singleImageUrl: obj.singleImageUrl || null,
    singleImagePublicId: obj.singleImagePublicId || null,
    singleDescription: obj.singleDescription || 'Single Portion (~1 Liter)',
    familyImageUrl: obj.familyImageUrl || null,
    familyImagePublicId: obj.familyImagePublicId || null,
    familyDescription: obj.familyDescription || 'Family Size (Feeds 4–6)',
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    __v: obj.__v,
  }
}

// GET /api/bowl-sizes — return the current bowl size data
router.get('/', async (req, res) => {
  try {
    const bowlSize = await BowlSize.findOne().sort({ createdAt: -1 })
    if (!bowlSize) return res.json({})

    const normalized = normalizeBowlSize(bowlSize)
    if (process.env.NODE_ENV !== 'production') {
      console.log('bowlSizes GET normalized:', normalized)
    }
    const response = { ...normalized }
    delete response.imageUrl
    delete response.imagePublicId
    delete response.description
    res.json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/bowl-sizes — upload single or family bowl size image
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image provided' })

    const { type = 'single', description } = req.body
    if (!['single', 'family'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Use "single" or "family"' })
    }

    const result = await uploadToCloudinary(req.file.buffer)

    let bowlSize = await BowlSize.findOne().sort({ createdAt: -1 })
    if (!bowlSize) {
      bowlSize = await BowlSize.create({})
    }

    // Delete old image if exists
    const oldPublicId = type === 'single' ? bowlSize.singleImagePublicId : bowlSize.familyImagePublicId
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId)
      } catch (cleanupError) {
        console.warn(`Failed to remove previous ${type} image:`, cleanupError.message)
      }
    }

    // Update the appropriate field
    if (type === 'single') {
      bowlSize.singleImageUrl = result.secure_url
      bowlSize.singleImagePublicId = result.public_id
      if (description) bowlSize.singleDescription = description
    } else {
      bowlSize.familyImageUrl = result.secure_url
      bowlSize.familyImagePublicId = result.public_id
      if (description) bowlSize.familyDescription = description
    }

    await bowlSize.save()
    const response = normalizeBowlSize(bowlSize)
    delete response.imageUrl
    delete response.imagePublicId
    delete response.description
    res.status(200).json({ bowlSize: response })
  } catch (err) {
    console.error('Bowl size upload error:', err)
    res.status(500).json({ message: err.message || 'Upload failed' })
  }
})

// DELETE /api/bowl-sizes/:id/:type — remove a specific bowl size image
router.delete('/:id/:type', auth, async (req, res) => {
  try {
    const { id, type } = req.params
    if (!['single', 'family'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Use "single" or "family"' })
    }

    const bowlSize = await BowlSize.findById(id)
    if (!bowlSize) return res.status(404).json({ message: 'Bowl size not found' })

    const publicId = type === 'single' ? bowlSize.singleImagePublicId : bowlSize.familyImagePublicId
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId)
      } catch (err) {
        console.warn(`Failed to delete ${type} image:`, err.message)
      }
    }

    // Clear the fields
    if (type === 'single') {
      bowlSize.singleImageUrl = null
      bowlSize.singleImagePublicId = null
    } else {
      bowlSize.familyImageUrl = null
      bowlSize.familyImagePublicId = null
    }

    await bowlSize.save()
    res.json({ message: `${type} bowl size image deleted`, bowlSize })
  } catch (err) {
    console.error('Bowl size delete error:', err)
    res.status(500).json({ message: err.message || 'Delete failed' })
  }
})

module.exports = router
