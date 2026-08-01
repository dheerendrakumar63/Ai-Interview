const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume,
    getResumeHistory,
    getResumeById,
    deleteResume,
    getResumeStats,
} = require("../controllers/resumeController");

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    uploadResume
);

router.get("/", protect, getResumeHistory);

router.get(
    "/stats",
    protect,
    getResumeStats
);

// Get Single Resume
router.get(
    "/:id",
    protect,
    getResumeById
);

// Delete Resume
router.delete(
    "/:id",
    protect,
    deleteResume
);





module.exports = router;