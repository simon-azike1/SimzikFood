const express = require("express");
const router = express.Router();
const { loginAdmin, changePassword } = require("../controllers/authController"); 
const protect = require("../middleware/auth");

router.put("/change-password", protect, changePassword); 
router.post("/login", loginAdmin);
router.get("/verify", protect, (req, res) => {  
  res.json({ valid: true });
});

module.exports = router;