import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import "../css/createInterview.css";

function CreateInterview() {

    const navigate = useNavigate();

    // ==========================
    // Category Wise Job Roles
    // ==========================

    const technicalRoles = [

    "Software Engineer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Angular Developer",
    "Vue.js Developer",
    "Node.js Developer",
    "Java Developer",
    "Python Developer",
    "C++ Developer",
    "PHP Developer",
    "Laravel Developer",
    "Django Developer",
    "Spring Boot Developer",
    "Android Developer",
    "Flutter Developer",
    "iOS Developer",
    "React Native Developer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Scientist",
    "Data Analyst",
    "Data Engineer",
    "Business Intelligence Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "AWS Engineer",
    "Azure Engineer",
    "Google Cloud Engineer",
    "Cyber Security Analyst",
    "Security Engineer",
    "Network Engineer",
    "System Administrator",
    "Database Administrator",
    "MongoDB Developer",
    "SQL Developer",
    "Blockchain Developer",
    "Game Developer",
    "UI/UX Designer",
    "QA Engineer",
    "Software Test Engineer",
    "Automation Test Engineer",
    "Embedded Systems Engineer",
    "IoT Developer",
    "Site Reliability Engineer (SRE)",
    "Technical Support Engineer",
    "Computer Vision Engineer",
    "NLP Engineer"

];

   const nonTechnicalRoles = [

    "Sales Executive",
    "Sales Manager",
    "Business Development Executive",
    "Business Development Manager",
    "Marketing Executive",
    "Digital Marketing Executive",
    "SEO Executive",
    "Social Media Manager",
    "Content Writer",
    "Content Strategist",
    "Copywriter",
    "HR Recruiter",
    "HR Executive",
    "HR Manager",
    "Talent Acquisition Specialist",
    "Customer Support Executive",
    "Customer Success Manager",
    "Business Analyst",
    "Project Manager",
    "Product Manager",
    "Operations Executive",
    "Operations Manager",
    "Supply Chain Executive",
    "Logistics Coordinator",
    "Procurement Executive",
    "Finance Executive",
    "Financial Analyst",
    "Investment Analyst",
    "Accountant",
    "Chartered Accountant",
    "Banking Officer",
    "Relationship Manager",
    "Insurance Advisor",
    "Retail Store Manager",
    "Hospital Administrator",
    "Healthcare Executive",
    "Teacher",
    "Assistant Professor",
    "Training Coordinator",
    "Legal Advisor",
    "Corporate Lawyer",
    "Journalist",
    "Public Relations Officer",
    "Event Manager",
    "Hotel Manager",
    "Travel Consultant",
    "Graphic Designer",
    "Interior Designer",
    "Real Estate Consultant",
    "Administrative Officer"

];

    // ==========================
    // States
    // ==========================

    const [category, setCategory] = useState("Technical");

    const [role, setRole] = useState("");

    const [experience, setExperience] = useState("Fresher");

    const [techInput, setTechInput] = useState("");

    const [techStack, setTechStack] = useState([]);

    const [difficulty, setDifficulty] = useState("Medium");

    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    const [loading, setLoading] = useState(false);

    const [interviewMode, setInterviewMode] = useState("text");

    // ==========================
    // Add Technology
    // ==========================

    const addTech = (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            const value = techInput.trim();

            if (
                value &&
                !techStack.includes(value)
            ) {

                setTechStack([
                    ...techStack,
                    value,
                ]);

            }

            setTechInput("");

        }

    };

    // ==========================
    // Remove Technology
    // ==========================

    const removeTech = (tech) => {

        setTechStack(

            techStack.filter(
                (item) => item !== tech
            )

        );

    };

        // ==========================
    // Create Interview
    // ==========================

    const createInterview = async (e) => {

        e.preventDefault();

        // --------------------------
        // Validation
        // --------------------------

        if (!role) {
            return toast.error("Please select a Job Role");
        }

        if (
            category === "Technical" &&
            techStack.length === 0
        ) {
            return toast.error(
                "Please add at least one technology"
            );
        }

        const toastId = toast.loading(
            "Generating AI Interview..."
        );

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            // --------------------------
            // API Call
            // --------------------------

            const res = await API.post(

                "/interview/create",

                {

                    category,

                    role,

                    experience,

                    techStack,

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

            // --------------------------
            // Navigation
            // --------------------------

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
        // ==========================
    // UI
    // ==========================

    return (

        <div className="create-container">

            <div className="create-card">

                <h1>Create AI Interview</h1>

                <form onSubmit={createInterview}>

                    {/* ==========================
                        Interview Category
                    ========================== */}

                    <label>Interview Category</label>

                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setRole("");
                            setTechStack([]);
                            setTechInput("");
                        }}
                    >
                        <option value="Technical">
                            💻 Technical
                        </option>

                        <option value="Non-Technical">
                            💼 Non-Technical
                        </option>

                    </select>

                    {/* ==========================
                        Job Role
                    ========================== */}

                    <label>Job Role</label>

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                        required
                    >

                        <option value="">
                            Select Job Role
                        </option>

                        {(category === "Technical"
                            ? technicalRoles
                            : nonTechnicalRoles
                        ).map((item) => (

                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>

                        ))}

                    </select>

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

                    {category === "Technical" && (

                        <>

                            <label>Tech Stack</label>

                            <div className="tech-box">

                                {techStack.map((tech) => (

                                    <div
                                        className="tech-tag"
                                        key={tech}
                                    >

                                        {tech}

                                        <span
                                            onClick={() =>
                                                removeTech(tech)
                                            }
                                        >
                                            ×
                                        </span>

                                    </div>

                                ))}

                                <input
                                    type="text"
                                    value={techInput}
                                    placeholder="Type technology and press Enter"
                                    onChange={(e) =>
                                        setTechInput(e.target.value)
                                    }
                                    onKeyDown={addTech}
                                />

                            </div>

                        </>

                    )}
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

                    <label>Number of Questions</label>

                    <select
                        value={numberOfQuestions}
                        onChange={(e) =>
                            setNumberOfQuestions(
                                Number(e.target.value)
                            )
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