const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    fileName: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        default: 0,
    },

    strengths: [String],

    weaknesses: [String],

    missingSkills: [String],

    suggestions: [String],

}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);