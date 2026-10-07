const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        // =====================================
        // User
        // =====================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // =====================================
        // Resume File
        // =====================================

        fileName: {
            type: String,
            default: "",
        },

        fileUrl: {
        type: String,
       default: "",
    },

        // =====================================
        // Personal Details
        // =====================================

        name: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        // =====================================
        // Education
        // =====================================

        education: {
            type: String,
            default: "",
        },

        // =====================================
        // Skills
        // =====================================

        skills: {
            type: String,
            default: "",
        },

        // =====================================
        // Experience
        // =====================================

        experience: {
            type: String,
            default: "",
        },

        // =====================================
        // Projects
        // =====================================

        projects: {
            type: String,
            default: "",
        },

        // =====================================
        // AI Resume Analyzer Result
        // =====================================

        score: {
            type: Number,
            default: 0,
        },

        strengths: {
            type: [String],
            default: [],
        },

        weaknesses: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        suggestions: {
            type: [String],
            default: [],
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);