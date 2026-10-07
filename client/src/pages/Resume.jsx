import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AtsResultDashboard from "../components/AtsResultDashboard";
import { analyzeAtsMatch } from "../utils/atsAnalyzer";
import "../css/saas-dashboard.css";
import "../css/resume.css";
import {
  UploadCloud,
  FileText,
  Trash2,
  Sparkles,
  Briefcase,
  RefreshCw,
} from "lucide-react";

function Resume() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // File Change Handlers
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error("Please select a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
    toast.success(`Selected file: ${selectedFile.name}`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = () => {
    setFile(null);
  };

  // Analyze Resume Handler
  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload your resume file first.");
      return;
    }

    try {
      setLoading(true);

      let extractedResumeText = file.name + " " + jobTitle;

      // Send resume to backend API for AI parsing
      const formData = new FormData();
      formData.append("resume", file);
      const token = localStorage.getItem("token");

      try {
        const res = await API.post("/resume/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data?.resume) {
          const r = res.data.resume;
          extractedResumeText += " " + (r.strengths || []).join(" ") + " " + (r.missingSkills || []).join(" ") + " " + (r.suggestions || []).join(" ");
        }
      } catch (backendErr) {
        console.warn("Backend storage note:", backendErr);
      }

      // Calculate ATS Match via analysis engine
      const analysis = analyzeAtsMatch(extractedResumeText, jobDescription, jobTitle);
      setAtsResult(analysis);
      toast.success("ATS Analysis completed!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
  };

  return (
    <div className="saas-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        logout={logout}
      />

      {/* Main Workspace */}
      <div className="saas-main-content">
        <Navbar
          user={user}
          toggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          logout={logout}
        />

        <div className="dashboard-container">
          {/* Header Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h1>AI Resume Analyzer & ATS Matcher</h1>
              <p>Upload your resume and compare it with a job description for instant ATS optimization.</p>
            </div>
          </div>

          {/* Two-Column Input Grid */}
          <div className="resume-input-grid">
            {/* Left Column: Upload Resume Area */}
            <div className="input-card">
              <div className="input-card-header">
                <FileText size={20} style={{ color: "#3b5bdb" }} />
                <h3>1. Upload Resume</h3>
              </div>

              {!file ? (
                <div
                  className={`drop-zone ${dragOver ? "drag-over" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <UploadCloud size={40} className="drop-icon" />
                  <p className="drop-title">Drag & Drop your resume here</p>
                  <p className="drop-subtitle">Supports PDF, DOC, DOCX (Max 10MB)</p>
                  <label className="btn-browse">
                    Browse File
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                  </label>
                </div>
              ) : (
                <div className="file-info-card">
                  <div className="file-info-left">
                    <div className="file-icon-box">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="file-name text-ellipsis">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    className="btn-remove-file"
                    onClick={removeFile}
                    title="Remove file"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Job Description Area */}
            <div className="input-card">
              <div className="input-card-header">
                <Briefcase size={20} style={{ color: "#22c55e" }} />
                <h3>2. Add Job Description</h3>
              </div>

              <div className="job-title-input-box">
                <label>Job Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Full Stack Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="jd-textarea-box">
                <div className="jd-label-row">
                  <label>Job Description</label>
                  <span className="char-count">{jobDescription.length} chars</span>
                </div>
                <textarea
                  placeholder="Paste the complete job description here..."
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Button Banner */}
          <div className="analyze-action-bar">
            <button
              className="btn-analyze-submit"
              onClick={handleAnalyze}
              disabled={loading || !file}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="spin-icon" />
                  <span>Analyzing Resume & Matching ATS...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Analyze Resume & Calculate ATS Score</span>
                </>
              )}
            </button>
          </div>

          {/* ATS Results Dashboard */}
          {atsResult && <AtsResultDashboard atsData={atsResult} />}
        </div>
      </div>
    </div>
  );
}

export default Resume;