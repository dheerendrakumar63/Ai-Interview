const { analyzeResume } = require("../services/geminiService");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");

// ==========================
// Upload Resume
// ==========================

exports.uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a PDF"
            });
        }

        const pdfPath = req.file.path;

        const pdfBuffer = fs.readFileSync(pdfPath);

        const pdfData = await pdfParse(pdfBuffer);

        const resumeText = pdfData.text;

        const analysis = await analyzeResume(resumeText);

        const resume = await Resume.create({

            user: req.user.id,

            fileName: req.file.filename,

            score: analysis.score,

            strengths: analysis.strengths,

            weaknesses: analysis.weaknesses,

            missingSkills: analysis.missingSkills,

            suggestions: analysis.suggestions,

        });

        res.status(200).json({

            message: "Resume analyzed successfully",

            resume,

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==========================
// Get Resume History
// ==========================

exports.getResumeHistory = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(resumes);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
// ==========================
// Get Resume By ID
// ==========================

exports.getResumeById = async (req, res) => {

    try {

        const resume = await Resume.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!resume) {

            return res.status(404).json({

                message: "Resume not found",

            });

        }

        res.status(200).json(resume);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};
// ==========================
// Delete Resume
// ==========================

exports.deleteResume = async (req, res) => {

    try {

        const resume = await Resume.findOne({

            _id: req.params.id,
            user: req.user.id,

        });

        if (!resume) {

            return res.status(404).json({
                message: "Resume not found",
            });

        }

        await resume.deleteOne();

        res.status(200).json({

            message: "Resume deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Resume Dashboard Stats
// ==========================

exports.getResumeStats = async (req, res) => {

    try {

        const resumes = await Resume.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        const totalResumes = resumes.length;

        const latestScore =
            totalResumes > 0
                ? resumes[0].score
                : 0;

        const lastUpload =
            totalResumes > 0
                ? resumes[0].createdAt
                : null;

        res.status(200).json({

            totalResumes,

            latestScore,

            lastUpload,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};