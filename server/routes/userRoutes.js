const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/authController");

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;