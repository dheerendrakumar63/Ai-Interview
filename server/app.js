const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/resume", resumeRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("AI Interview Platform API Running...");
});
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});



app.get("/models", async (req, res) => {
    try {
        const models = [];

        // for await (const model of ai.models.list()) {
        //     models.push(model);
        // }

        res.json(models);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});
module.exports = app;