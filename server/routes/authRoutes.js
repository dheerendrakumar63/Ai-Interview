const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

module.exports = router;