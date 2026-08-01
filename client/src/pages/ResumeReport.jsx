import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../css/resumeReport.css";
import jsPDF from "jspdf";

function ResumeReport() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [resume, setResume] = useState(null);

    useEffect(() => {

        fetchResume();

    }, []);

    const fetchResume = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get(`/resume/${id}`, {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });

            setResume(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!resume) {

        return <h2>Loading...</h2>;

    }

const downloadPDF = () => {

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("AI Resume Analysis Report", 20, y);

    y += 15;

    doc.setFontSize(14);
    doc.text(`Resume Score: ${resume.score}/100`, 20, y);

    y += 15;

    doc.text("Strengths:", 20, y);
    y += 10;

    resume.strengths.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 8;

    doc.text("Weaknesses:", 20, y);
    y += 10;

    resume.weaknesses.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 8;

    doc.text("Missing Skills:", 20, y);
    y += 10;

    resume.missingSkills.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    y += 8;

    doc.text("Suggestions:", 20, y);
    y += 10;

    resume.suggestions.forEach(item => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
    });

    doc.save("AI_Resume_Report.pdf");

};

    return (

        <div className="resume-report">

            <div className="report-card">

                <h1>📄 Resume Analysis Report</h1>

                <div className="score-box">

                    <h2>Resume Score</h2>

                    <h1>{resume.score}/100</h1>

                </div>
                                {/* ================= Strengths ================= */}

                <div className="report-section">

                    <h2>💪 Strengths</h2>

                    <ul>

                        {resume.strengths.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* ================= Weaknesses ================= */}

                <div className="report-section">

                    <h2>⚠ Weaknesses</h2>

                    <ul>

                        {resume.weaknesses.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* ================= Missing Skills ================= */}

                <div className="report-section">

                    <h2>📌 Missing Skills</h2>

                    <ul>

                        {resume.missingSkills.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

                {/* ================= Suggestions ================= */}

                <div className="report-section">

                    <h2>💡 AI Suggestions</h2>

                    <ul>

                        {resume.suggestions.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

                <button
    className="download-btn"
    onClick={downloadPDF}
>
    📥 Download PDF
</button>

                <button
                    className="back-btn"
                    onClick={() => navigate("/resume-history")}
                >
                    ⬅ Back to Resume History
                </button>

            </div>

        </div>

    );

}

export default ResumeReport;