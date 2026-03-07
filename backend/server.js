const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const dotenv   = require('dotenv')

dotenv.config()

const app = express()

app.set('trust proxy', 1)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://simzik-food.vercel.app',
  ],
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/menu',    require('./routes/menu'))
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/upload',  require('./routes/upload'))

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK' }))

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected')
    await seedData()
  })
  .catch(err => console.error('MongoDB error:', err))

async function seedData() {
  const MenuItem = require('./models/Menu')
  const count = await MenuItem.countDocuments()
  if (count === 0) {
    await MenuItem.insertMany([
      { name: 'Jollof Rice',              category: 'main',  description: 'Fragrant spicy rice slow-cooked in a savory tomato and pepper sauce.',         singlePrice: 60, familyPrice: 120, singleLabel: 'Single Meal (~1L)', familyLabel: 'Family Pack (4–6)', available: true, featured: true,  order: 1 },
      { name: 'Chicken Stew',             category: 'stews', description: 'Rich aromatic tomato-based stew with tender chicken and bold West African spices.', singlePrice: 70, familyPrice: 130, singleLabel: 'Single Portion',   familyLabel: 'Family Size',      available: true, featured: true,  order: 2 },
      { name: 'Okro Soup',               category: 'soups', description: 'Traditional smooth okra soup with authentic West African spices.',                singlePrice: 65, familyPrice: 110, singleLabel: 'Single Portion',   familyLabel: 'Family Size',      available: true, featured: false, order: 3 },
      { name: 'Ogbono Soup',             category: 'soups', description: 'Rich thick African mango seed draw soup — a beloved West African specialty.',     singlePrice: 70, familyPrice: 120, singleLabel: 'Single Portion',   familyLabel: 'Family Size',      available: true, featured: false, order: 4 },
      { name: 'Vegetable Soup (Efo Riro)',category: 'soups', description: 'Savory leafy greens cooked in a rich pepper base. Nutritious and flavorful.',    singlePrice: 70, familyPrice: 120, singleLabel: 'Single Portion',   familyLabel: 'Family Size',      available: true, featured: false, order: 5 },
    ])
    console.log('✅ Menu seeded')
  }

  const Admin  = require('./models/Admin')
  const bcrypt = require('bcryptjs')
  if (await Admin.countDocuments() === 0) {
    const hashed = await bcrypt.hash('admin123', 10)
    await Admin.create({ username: 'admin', password: hashed, email: 'azikeshinye@gmail.com' })
    console.log('✅ Default admin created')
  }
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))