const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createInterview,
    getInterviews,
    getInterviewById,
    deleteInterview,
    submitInterview,
} = require("../controllers/interviewController");

// Create Interview
router.post("/create", protect, createInterview);

// Get All Interviews
router.get("/", protect, getInterviews);

// Get Interview By ID
router.get("/:id", protect, getInterviewById);

// Delete Interview
router.delete("/:id", protect, deleteInterview);

// Submit Interview Answers
router.post("/:id/submit", protect, submitInterview);

module.exports = router;