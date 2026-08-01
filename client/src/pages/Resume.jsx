import { useState } from "react";
import API from "../services/api";
import "../css/resume.css";

function Resume() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {

        if (!file) {
            return alert("Please select a PDF resume.");
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            const token = localStorage.getItem("token");

            const res = await API.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(res.data.resume);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Upload Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="resume-container">

            <div className="resume-card">

                <h1>AI Resume Analyzer</h1>

                <p>
                    Upload your resume and get AI powered feedback.
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                >

                    {
                        loading
                            ? "Analyzing..."
                            : "Analyze Resume"
                    }

                </button>


{/* Resume Analysis Result */}

{result && (
  <div className="resume-result">

    {/* Score */}

    <div className="score-card">
      <h2>Resume Score</h2>
      <div className="score-circle">
        <span>{result.score}</span>
        <small>/100</small>
      </div>
    </div>

    {/* Strengths */}

    <div className="result-section strengths">
      <h3>💪 Strengths</h3>

      <ul>
        {result.strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Weaknesses */}

    <div className="result-section weaknesses">
      <h3>⚠ Weaknesses</h3>

      <ul>
        {result.weaknesses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Missing Skills */}

    <div className="result-section skills">
      <h3>📌 Missing Skills</h3>

      <div className="skill-tags">
        {result.missingSkills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Suggestions */}

    <div className="result-section suggestions">
      <h3>💡 AI Suggestions</h3>

      <ul>
        {result.suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

  </div>
)}
            </div>

        </div>
    );

}

export default Resume;