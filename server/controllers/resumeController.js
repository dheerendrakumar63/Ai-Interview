console.log("🚀 RESUME CONTROLLER RUNNING");

const { analyzeResume } = require("../services/geminiService");

const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");


// ======================================================
// 1. UPLOAD RESUME + AI ANALYSIS
// ======================================================

exports.uploadResume = async (req, res) => {

    try {

        console.log("File Object:", req.file);

        console.log(
            "Buffer Exists:",
            !!req.file?.buffer
        );

        console.log(
            "Original Name:",
            req.file?.originalname
        );


        // ==========================================
        // Check File
        // ==========================================

        if (!req.file) {

            return res.status(400).json({

                message: "Please upload a PDF",

            });

        }


        // ==========================================
        // Extract PDF Text
        // ==========================================

        const pdfData =
            await pdfParse(req.file.buffer);

        const resumeText =
            pdfData.text;


        // ==========================================
        // Gemini Resume Analysis
        // ==========================================

        const analysis =
            await analyzeResume(resumeText);


        // ==========================================
        // Save Analysis Result
        // ==========================================

        const resume =
            await Resume.create({

                user: req.user.id,

                fileName:
                    req.file.originalname,

                score:
                    analysis.score,

                strengths:
                    analysis.strengths,

                weaknesses:
                    analysis.weaknesses,

                missingSkills:
                    analysis.missingSkills,

                suggestions:
                    analysis.suggestions,

            });


        // ==========================================
        // Response
        // ==========================================

        res.status(200).json({

            message:
                "Resume analyzed successfully",

            resume,

        });


    } catch (error) {

        console.error(
            "Upload Resume Error:",
            error
        );

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ======================================================
// 2. CREATE / ADD RESUME
// ======================================================

exports.createResume = async (req, res) => {

    try {

        console.log(
            "Create Resume Body:",
            req.body
        );

        console.log(
            "Create Resume File:",
            req.file
        );


        const {

            name,

            email,

            phone,

            education,

            skills,

            experience,

            projects,

        } = req.body;


        // ==========================================
        // Validation
        // ==========================================

        if (
            !name ||
            !email ||
            !phone ||
            !education ||
            !skills
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all required fields",

            });

        }


        // ==========================================
        // File Name
        // ==========================================

        const fileName =
            req.file
                ? req.file.originalname
                : "";


        // ==========================================
        // Save Resume
        // ==========================================

        const resume =
            await Resume.create({

                user: req.user.id,

                fileName,

                name,

                email,

                phone,

                education,

                skills,

                experience:
                    experience || "",

                projects:
                    projects || "",

            });


        // ==========================================
        // Response
        // ==========================================

        res.status(201).json({

            success: true,

            message:
                "Resume Added Successfully",

            resume,

        });


    } catch (error) {

        console.error(
            "Create Resume Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};


// ======================================================
// 3. GET RESUME HISTORY
// ======================================================

exports.getResumeHistory = async (req, res) => {

    try {

        const resumes =
            await Resume.find({

                user: req.user.id,

            }).sort({

                createdAt: -1,

            });


        res.status(200).json(resumes);


    } catch (error) {

        console.error(
            "Resume History Error:",
            error
        );

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ======================================================
// 4. GET MY RESUMES
// ======================================================

exports.getMyResumes = async (req, res) => {

    try {

        const resumes =
            await Resume.find({

                user: req.user.id,

            }).sort({

                createdAt: -1,

            });


        res.status(200).json({

            success: true,

            resumes,

        });


    } catch (error) {

        console.error(
            "Get My Resumes Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};


// ======================================================
// 5. GET RESUME BY ID
// ======================================================

exports.getResumeById = async (req, res) => {

    try {

        const resume =
            await Resume.findOne({

                _id:
                    req.params.id,

                user:
                    req.user.id,

            });


        if (!resume) {

            return res.status(404).json({

                message:
                    "Resume not found",

            });

        }


        res.status(200).json(resume);


    } catch (error) {

        console.error(
            "Get Resume Error:",
            error
        );

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ======================================================
// 6. DELETE RESUME
// ======================================================

exports.deleteResume = async (req, res) => {

    try {

        const resume =
            await Resume.findOne({

                _id:
                    req.params.id,

                user:
                    req.user.id,

            });


        if (!resume) {

            return res.status(404).json({

                message:
                    "Resume not found",

            });

        }


        await resume.deleteOne();


        res.status(200).json({

            message:
                "Resume deleted successfully",

        });


    } catch (error) {

        console.error(
            "Delete Resume Error:",
            error
        );

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ======================================================
// 7. RESUME DASHBOARD STATS
// ======================================================

exports.getResumeStats = async (req, res) => {

    try {

        const resumes =
            await Resume.find({

                user:
                    req.user.id,

            }).sort({

                createdAt: -1,

            });


        const totalResumes =
            resumes.length;


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

        console.error(
            "Resume Stats Error:",
            error
        );

        res.status(500).json({

            message:
                error.message,

        });

    }

};

// ======================================================
// UPDATE RESUME
// ======================================================

exports.updateResume = async (req, res) => {

    try {

        console.log("Update Resume Body:", req.body);

        console.log(
            "Update Resume File:",
            req.file
        );


        const {
            name,
            email,
            phone,
            education,
            skills,
        } = req.body;


        // ==========================================
        // Find Resume
        // ==========================================

        const resume = await Resume.findOne({

            _id: req.params.id,

            user: req.user.id,

        });


        // ==========================================
        // Resume Not Found
        // ==========================================

        if (!resume) {

            return res.status(404).json({

                success: false,

                message: "Resume not found",

            });

        }


        // ==========================================
        // Update Details
        // ==========================================

        resume.name = name;

        resume.email = email;

        resume.phone = phone;

        resume.education = education;

        resume.skills = skills;


        // ==========================================
        // Update File
        // ==========================================

        if (req.file) {

            resume.fileName =
                req.file.originalname;

        }


        // ==========================================
        // Save
        // ==========================================

        await resume.save();


        // ==========================================
        // Response
        // ==========================================

        res.status(200).json({

            success: true,

            message:
                "Resume Updated Successfully",

            resume,

        });


    } catch (error) {

        console.error(
            "Update Resume Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};