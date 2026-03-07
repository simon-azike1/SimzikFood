const express = require('express')
const router  = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !message) return res.status(400).json({ message: 'Name and message are required' })
    // You can add email sending here later (nodemailer etc.)
    console.log('��� New contact message:', { name, email, phone, message })
    res.json({ message: 'Message received! We will get back to you soon.' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
