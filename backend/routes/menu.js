const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");        // ← add this
const protect = require("../middleware/auth");          // ← add this

const {
  getMenu,
  getFeaturedMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

// ── Admin routes (must be before "/:id" style routes) ──
router.get("/admin/all", protect, async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ order: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ── Public routes ──
router.get("/", getMenu);
router.get("/featured", getFeaturedMenu);

// ── Protected routes ──
router.post("/", protect, createMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

module.exports = router;