import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../css/result.css";

function Result() {
    const { id } = useParams();
    const navigate = useNavigate();

    const reportRef = useRef(null);

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResult();
    }, []);

    // ==========================
    // Fetch Result
    // ==========================

    const fetchResult = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get(`/interview/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setInterview(res.data);
        } catch (error) {
            console.log(error);
            alert("Unable to load result");
        } finally {
            setLoading(false);
        }
    };

    // ==========================
    // Download PDF
    // ==========================

    const downloadPDF = () => {

        const element = reportRef.current;

        const options = {

            margin: 0.5,

            filename: `${interview?.role || "Interview"}-Report.pdf`,

            image: {
                type: "jpeg",
                quality: 1,
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
            },

            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait",
            },

            pagebreak: {
                mode: ["avoid-all", "css", "legacy"],
            },
        };

        html2pdf()
            .set(options)
            .from(element)
            .save();
    };

    // ==========================
    // Score Badge
    // ==========================

    const getBadge = (score) => {

        if (score >= 9) {
            return {
                text: "Excellent",
                color: "#16a34a",
            };
        }

        if (score >= 7) {
            return {
                text: "Good",
                color: "#eab308",
            };
        }

        if (score >= 5) {
            return {
                text: "Average",
                color: "#f97316",
            };
        }

        return {
            text: "Needs Improvement",
            color: "#ef4444",
        };
    };

    if (loading) {
        return <h2>Loading Result...</h2>;
    }

    const overallBadge = getBadge(interview.score);

    return (
        <div className="result-container">

            {/* PDF me sirf ye section jayega */}
            <div ref={reportRef}>

                <h1>Interview Result</h1>

                {/* Summary */}

                <div className="result-summary">

                    <h2>{interview.role}</h2>

                    <div className="badge">

                        <span
                            style={{
                                background: overallBadge.color,
                            }}
                        >
                            {overallBadge.text}
                        </span>

                    </div>

                    <h3>

                        Overall Score :
                        <span> {interview.score}/10</span>

                    </h3>

                    <div className="progress-container">

                        <div
                            className="progress-bar"
                            style={{
                                width: `${interview.score * 10}%`,
                            }}
                        ></div>

                    </div>

                    <p className="progress-text">

                        {interview.score}/10

                    </p>

                    <p>

                        <strong>Overall Feedback:</strong>

                    </p>

                    <p>{interview.feedback}</p>

                </div>

                {/* Questions */}

                <div className="question-results">

                    {interview.questions.map((question, index) => {

                        const badge = getBadge(question.score);

                        return (

                            <div
                                key={question._id}
                                className="result-card"
                            >

                                <div className="question-header">

                                    <h3>
                                        Question {index + 1}
                                    </h3>

                                    <span
                                        className="question-badge"
                                        style={{
                                            background: badge.color,
                                        }}
                                    >
                                        {badge.text}
                                    </span>

                                </div>

                                <p>

                                    <strong>Question:</strong>

                                </p>

                                <p>{question.question}</p>

                                <p>

                                    <strong>Your Answer:</strong>

                                </p>

                                <p>{question.userAnswer}</p>

                                <p>

                                    <strong>Score:</strong>{" "}
                                    {question.score}/10

                                </p>

                                <p>

                                    <strong>Feedback:</strong>

                                </p>

                                <p>{question.feedback}</p>

                            </div>

                        );

                    })}

                </div>

            </div>

            {/* Buttons */}

            <div className="button-group">

                <button
                    className="download-btn"
                    onClick={downloadPDF}
                >
                    📄 Download PDF
                </button>

                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    🏠 Back to Dashboard
                </button>

            </div>

        </div>
    );
}

export default Result;