const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["main", "stews", "soups", "sides", "drinks"],
      default: "main",
    },

    // ── Pricing ──────────────────────────
    singlePrice: {
      type: Number,
      required: true,
    },

    familyPrice: {
      type: Number,
    },

    singleLabel: {
      type: String,
      default: "Single Portion",
    },

    familyLabel: {
      type: String,
      default: "Family Size",
    },

    // ── Display control ───────────────────
    available: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,        // ← controls display order on the menu page
    },

    imageUrl: {
      type: String,
    },

    imagePublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);