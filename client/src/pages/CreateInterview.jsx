import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import "../css/createInterview.css";

function CreateInterview() {

    const navigate = useNavigate();

    // ==========================
    // States
    // ==========================

    const [role, setRole] = useState("");

    const [experience, setExperience] = useState("Fresher");

    const [techStack, setTechStack] = useState("");

    const [difficulty, setDifficulty] = useState("Medium");

    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    const [loading, setLoading] = useState(false);

    const [interviewMode, setInterviewMode] = useState("text");

    // ==========================
    // Create Interview
    // ==========================

    const createInterview = async (e) => {

        e.preventDefault();

        const toastId = toast.loading(
            "Generating AI Interview..."
        );

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await API.post(

                "/interview/create",

                {
                    role,

                    experience,

                    techStack: techStack
                        .split(",")
                        .map((item) => item.trim()),

                    difficulty,

                    numberOfQuestions,

                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            const interviewId = res.data.interview._id;

            toast.success(
                "Interview Created Successfully",
                {
                    id: toastId,
                }
            );

            if (interviewMode === "video") {

                navigate(
                    `/video-interview/${interviewId}`
                );

            } else {

                navigate(
                    `/interview/${interviewId}`
                );

            }

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||

                "Something went wrong",

                {
                    id: toastId,
                }

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="create-container">

            <div className="create-card">

                <h1>Create AI Interview</h1>

                <form onSubmit={createInterview}>

                                        {/* ==========================
                        Job Role
                    ========================== */}

                    <label>Job Role</label>

                    <input
                        type="text"
                        placeholder="MERN Stack Developer"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />

                    {/* ==========================
                        Experience
                    ========================== */}

                    <label>Experience</label>

                    <select
                        value={experience}
                        onChange={(e) =>
                            setExperience(e.target.value)
                        }
                    >
                        <option>Fresher</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>3+ Years</option>
                    </select>

                    {/* ==========================
                        Tech Stack
                    ========================== */}

                    <label>Tech Stack</label>

                    <input
                        type="text"
                        placeholder="React, Node.js, Express.js, MongoDB"
                        value={techStack}
                        onChange={(e) =>
                            setTechStack(e.target.value)
                        }
                        required
                    />

                    {/* ==========================
                        Difficulty
                    ========================== */}

                    <label>Difficulty</label>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    {/* ==========================
                        Number of Questions
                    ========================== */}

                    <label>Questions</label>

                    <select
                        value={numberOfQuestions}
                        onChange={(e) =>
                            setNumberOfQuestions(Number(e.target.value))
                        }
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>

                    {/* ==========================
                        Interview Mode
                    ========================== */}

                    <label>Interview Mode</label>

                    <select
                        value={interviewMode}
                        onChange={(e) =>
                            setInterviewMode(e.target.value)
                        }
                    >
                        <option value="text">
                            📝 Text Interview
                        </option>

                        <option value="video">
                            🎥 Video Interview
                        </option>

                    </select>

                    {/* ==========================
                        Submit Button
                    ========================== */}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Generating Interview..."
                            : "🚀 Create Interview"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateInterview;