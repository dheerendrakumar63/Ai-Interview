const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// =============================
// Gemini Retry Function
// =============================
async function callGemini(prompt, retries = 3) {

    while (retries > 0) {

        try {

            const response = await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: prompt,
            });

            return response.text;

        } catch (error) {

            if (
                error.message &&
                error.message.includes("503") &&
                retries > 1
            ) {

                console.log(
                    `Gemini Busy... Retrying (${retries - 1} attempts left)`
                );

                await new Promise((resolve) =>
                    setTimeout(resolve, 3000)
                );

                retries--;
                continue;
            }

            throw error;
        }
    }
}

// =============================
// Generate Interview Questions
// =============================
const generateInterviewQuestions = async (
    role,
    experience,
    techStack,
    numberOfQuestions
) => {

    const prompt = `
Generate ${numberOfQuestions} interview questions.

Role: ${role}

Experience: ${experience}

Tech Stack: ${techStack.join(", ")}

Return ONLY valid JSON.

Example:

[
  {
    "question":"What is React?",
    "answer":"React is a JavaScript library for building user interfaces."
  },
  {
    "question":"What is useState?",
    "answer":"useState is a React Hook used to manage state."
  }
]
`;

    let text = await callGemini(prompt);

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
};

// =============================
// Evaluate Interview Answers
// =============================
const evaluateInterviewAnswers = async (questions) => {

    const prompt = `
You are an expert technical interviewer.

Evaluate every answer carefully.

For EACH question:

- Give score ONLY between 0 and 10.
- Give short constructive feedback.

DO NOT return overall score.

Return ONLY valid JSON.

Example:

{
  "overallFeedback":"Excellent performance with good understanding of concepts.",
  "results":[
    {
      "score":10,
      "feedback":"Excellent answer."
    },
    {
      "score":8,
      "feedback":"Good answer but could include more details."
    }
  ]
}

Questions:

${JSON.stringify(questions)}
`;

    let text = await callGemini(prompt);

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
};
// =============================
// Analyze Resume
// =============================
const analyzeResume = async (resumeText) => {

    const prompt = `
You are an expert ATS Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

Format:

{
  "score":85,
  "strengths":[
    "Strong MERN Stack skills",
    "Good project experience"
  ],
  "weaknesses":[
    "No cloud technologies",
    "No internship experience"
  ],
  "missingSkills":[
    "Docker",
    "AWS",
    "TypeScript"
  ],
  "suggestions":[
    "Add measurable achievements.",
    "Include certifications.",
    "Improve professional summary."
  ]
}

Resume:

${resumeText}
`;

    let text = await callGemini(prompt);

    text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);
};

// =============================
// Exports
// =============================
module.exports = {
    generateInterviewQuestions,
    evaluateInterviewAnswers,
    analyzeResume,
};