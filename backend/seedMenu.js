// seedMenu.js — run with: node seedMenu.js
// Place this file in your /backend folder and run once

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const menuItemSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  category:    { type: String, enum: ['main', 'stews', 'soups', 'sides', 'drinks'], required: true },
  description: { type: String },
  singlePrice: { type: Number, required: true },
  familyPrice: { type: Number },
  singleLabel: { type: String, default: 'Single Portion' },
  familyLabel: { type: String, default: 'Family Size' },
  available:   { type: Boolean, default: true },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true })

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

const MENU_ITEMS = [
  {
    name:        'Jollof Rice',
    category:    'main',
    description: 'Fragrant, spicy rice slow-cooked in a savory tomato and pepper sauce. A West African classic.',
    singlePrice: 60,
    familyPrice: 120,
    singleLabel: 'Single Meal (~1L)',
    familyLabel: 'Family Pack (4–6)',
    available:   true,
    featured:    true,
    order:       1,
  },
  {
    name:        'Chicken Stew',
    category:    'stews',
    description: 'Rich, aromatic tomato-based stew with tender chicken. A comforting West African staple.',
    singlePrice: 70,
    familyPrice: 130,
    singleLabel: 'Single Portion',
    familyLabel: 'Family Size',
    available:   true,
    featured:    true,
    order:       2,
  },
  {
    name:        'Okro Soup',
    category:    'soups',
    description: 'Traditional smooth okra soup with authentic West African spices. Rich, hearty and deeply satisfying.',
    singlePrice: 65,
    familyPrice: 110,
    singleLabel: 'Single Portion',
    familyLabel: 'Family Size',
    available:   true,
    featured:    false,
    order:       3,
  },
  {
    name:        'Ogbono Soup',
    category:    'soups',
    description: 'Rich, thick African mango seed "draw" soup — a beloved West African specialty full of bold flavor.',
    singlePrice: 70,
    familyPrice: 120,
    singleLabel: 'Single Portion',
    familyLabel: 'Family Size',
    available:   true,
    featured:    false,
    order:       4,
  },
  {
    name:        'Vegetable Soup (Efo Riro)',
    category:    'soups',
    description: 'Savory leafy greens cooked in a rich pepper base. Nutritious, flavorful and deeply authentic.',
    singlePrice: 70,
    familyPrice: 120,
    singleLabel: 'Single Portion',
    familyLabel: 'Family Size',
    available:   true,
    featured:    false,
    order:       5,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await MenuItem.deleteMany({})
    console.log('🗑  Cleared existing menu items')

    const inserted = await MenuItem.insertMany(MENU_ITEMS)
    console.log(`✅ Inserted ${inserted.length} menu items:`)
    inserted.forEach(item => {
      console.log(`   • ${item.name} — ${item.singlePrice} MAD (single) / ${item.familyPrice} MAD (family)`)
    })

    console.log('\n🎉 Menu seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()