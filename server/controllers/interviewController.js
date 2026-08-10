const Interview = require("../models/Interview");
const {
    generateInterviewQuestions,
    evaluateInterviewAnswers,
} = require("../services/geminiService");

// =============================
// Create Interview
// =============================
exports.createInterview = async (req, res) => {

    try {

        const {

            category,
            role,
            experience,
            techStack,
            difficulty,
            numberOfQuestions,

        } = req.body;

        // =============================
        // Generate Questions
        // =============================

        const questions = await generateInterviewQuestions(

            category,
            role,
            experience,
            techStack,
            difficulty,
            numberOfQuestions

        );

        // =============================
        // Save Interview
        // =============================

        const interview = await Interview.create({

            user: req.user.id,

            category,

            role,

            experience,

            techStack,

            difficulty,

            numberOfQuestions,

            questions,

        });

        res.status(201).json({

            message: "Interview Created Successfully",

            interview,

        });

    } catch (error) {

        console.error("Create Interview Error:", error);

        res.status(500).json({

            message: error.message,

        });

    }

};
// =============================
// Get All Interviews
// =============================
exports.getInterviews = async (req, res) => {

    try {

        const interviews = await Interview.find({

            user: req.user.id,

        });

        res.status(200).json(interviews);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =============================
// Get Single Interview
// =============================
exports.getInterviewById = async (req, res) => {

    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {

            return res.status(404).json({

                message: "Interview not found",

            });

        }

        res.status(200).json(interview);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// =============================
// Submit Interview
// =============================
exports.submitInterview = async (req, res) => {

    try {

        const { id } = req.params;

        const { answers } = req.body;

        const interview = await Interview.findById(id);

        if (!interview) {

            return res.status(404).json({

                message: "Interview not found",

            });

        }

        // Save User Answers

        answers.forEach((item) => {

            const question = interview.questions.id(item.questionId);

            if (question) {

                question.userAnswer = item.userAnswer;

            }

        });

        // Prepare Gemini Evaluation

        const evaluationInput = interview.questions.map((q) => ({

            question: q.question,

            correctAnswer: q.answer,

            userAnswer: q.userAnswer,

        }));

        const evaluation = await evaluateInterviewAnswers(evaluationInput);

        // Save Score & Feedback

        let totalScore = 0;

        interview.questions.forEach((q, index) => {

            if (evaluation.results[index]) {

                q.score = Number(evaluation.results[index].score);

                q.feedback = evaluation.results[index].feedback;

                totalScore += Number(q.score);

            }

        });

        const averageScore = (

            totalScore / interview.questions.length

        ).toFixed(1);

        interview.score = Number(averageScore);

        interview.feedback = evaluation.overallFeedback;

        interview.status = "Completed";

        await interview.save();

        res.status(200).json({

            success: true,

            message: "Interview Evaluated Successfully",

            interview,

        });

    } catch (error) {

        console.error("Submit Interview Error:", error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// =============================
// Delete Interview
// =============================
exports.deleteInterview = async (req, res) => {

    try {

        const interview = await Interview.findById(req.params.id);

        if (!interview) {

            return res.status(404).json({

                message: "Interview not found",

            });

        }

        await Interview.findByIdAndDelete(req.params.id);

        res.status(200).json({

            message: "Interview Deleted Successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};