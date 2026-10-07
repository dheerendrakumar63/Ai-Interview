const express = require("express");

const router = express.Router();


// Controllers
const {
    uploadResume,
    createResume,
    getResumeHistory,
    getMyResumes,
    getResumeById,
    deleteResume,
    getResumeStats,
     updateResume
} = require("../controllers/resumeController");


// Authentication
const { protect } = require("../middleware/auth");


// Multer
const upload = require("../middleware/upload");


// ==========================================
// Resume Analyzer
// ==========================================

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);


// ==========================================
// Add Resume
// ==========================================

router.post(
    "/create",
    protect,
    upload.single("resume"),
    createResume
);


// ==========================================
// Resume History
// ==========================================

router.get(
    "/history",
    protect,
    getResumeHistory
);


// ==========================================
// My Resumes
// ==========================================

router.get(
    "/my-resumes",
    protect,
    getMyResumes
);


// ==========================================
// Resume Stats
// ==========================================

router.get(
    "/stats",
    protect,
    getResumeStats
);


// ==========================================
// Single Resume
// ==========================================

router.get(
    "/:id",
    protect,
    getResumeById
);


// ==========================================
// Delete Resume
// ==========================================

router.delete(
    "/:id",
    protect,
    deleteResume
);


module.exports = router;