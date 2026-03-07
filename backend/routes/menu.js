const express    = require('express')
const router     = express.Router()
const Menu       = require('../models/Menu')
const auth       = require('../middleware/auth')

// GET all menu items (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query
    const filter = { available: true }
    if (category) filter.category = category
    if (featured === 'true') filter.featured = true
    let query = Menu.find(filter).sort({ order: 1 })
    if (limit) query = query.limit(parseInt(limit))
    const items = await query
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET all items for admin (including unavailable)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const items = await Menu.find().sort({ order: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create new item (admin)
router.post('/', auth, async (req, res) => {
  try {
    const item  = new Menu(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update item (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Item not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE item (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id)
    res.json({ message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router