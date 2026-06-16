const mongoose = require('mongoose')

const bowlSizeSchema = new mongoose.Schema(
  {
    singleImageUrl: {
      type: String,
      default: null,
    },
    singleImagePublicId: {
      type: String,
      default: null,
    },
    singleDescription: {
      type: String,
      trim: true,
      default: 'Single Portion (~1 Liter)',
    },
    familyImageUrl: {
      type: String,
      default: null,
    },
    familyImagePublicId: {
      type: String,
      default: null,
    },
    familyDescription: {
      type: String,
      trim: true,
      default: 'Family Size (Feeds 4–6)',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('BowlSize', bowlSizeSchema)
