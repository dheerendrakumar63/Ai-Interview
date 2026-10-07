import {
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  Zap,
  BookOpen,
  Briefcase,
  FileCheck,
} from "lucide-react";

function AtsResultDashboard({ atsData }) {
  if (!atsData) return null;

  const {
    overallScore,
    category,
    categoryColor,
    breakdown,
    matchedSkills,
    missingKeywords,
    totalFound,
    totalMissing,
    strengths,
    suggestions,
    jobTitle,
  } = atsData;

  const breakdownCards = [
    {
      title: "Skills Match",
      score: `${breakdown.skillsMatch}%`,
      icon: <Zap size={18} />,
      color: "#3b5bdb",
      bgColor: "#edf2ff",
    },
    {
      title: "Keywords Match",
      score: `${breakdown.keywordsMatch}%`,
      icon: <FileCheck size={18} />,
      color: "#22c55e",
      bgColor: "#f0fdf4",
    },
    {
      title: "Experience Match",
      score: `${breakdown.experienceMatch}%`,
      icon: <Briefcase size={18} />,
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
    },
    {
      title: "Education Match",
      score: `${breakdown.educationMatch}%`,
      icon: <BookOpen size={18} />,
      color: "#f97316",
      bgColor: "#fff7ed",
    },
  ];

  return (
    <div className="ats-results-container">
      <div className="ats-results-header">
        <h2>ATS Analysis Results</h2>
        <p>Comprehensive resume and job description match breakdown.</p>
      </div>

      {/* Top Overview Row */}
      <div className="ats-overview-grid">
        {/* Circular Score Gauge */}
        <div className="ats-score-card">
          <div
            className="ats-gauge-circle"
            style={{ borderColor: categoryColor }}
          >
            <span className="ats-gauge-num">{overallScore}</span>
            <span className="ats-gauge-max">/ 100</span>
          </div>
          <div className="ats-score-meta">
            <span
              className="ats-category-pill"
              style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}
            >
              {category}
            </span>
            <span className="ats-gauge-label">ATS Compatibility Score</span>
          </div>
        </div>

        {/* Job Match Summary Card */}
        <div className="ats-summary-card">
          <div className="summary-title-row">
            <Award size={20} style={{ color: "#3b5bdb" }} />
            <h3>Job Match Summary</h3>
          </div>

          <div className="summary-stats-grid">
            <div className="summary-stat-box">
              <span className="stat-label">Target Role</span>
              <span className="stat-value text-ellipsis">{jobTitle}</span>
            </div>
            <div className="summary-stat-box">
              <span className="stat-label">Keywords Found</span>
              <span className="stat-value text-green">{totalFound}</span>
            </div>
            <div className="summary-stat-box">
              <span className="stat-label">Keywords Missing</span>
              <span className="stat-value text-orange">{totalMissing}</span>
            </div>
            <div className="summary-stat-box">
              <span className="stat-label">Overall Match</span>
              <span className="stat-value" style={{ color: categoryColor }}>
                {overallScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics Grid */}
      <div className="ats-breakdown-grid">
        {breakdownCards.map((card, idx) => (
          <div key={idx} className="breakdown-card">
            <div
              className="breakdown-icon"
              style={{ backgroundColor: card.bgColor, color: card.color }}
            >
              {card.icon}
            </div>
            <div className="breakdown-info">
              <span className="breakdown-title">{card.title}</span>
              <span className="breakdown-score">{card.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Matched Skills & Missing Keywords Grid */}
      <div className="ats-keywords-grid">
        {/* Matched Skills */}
        <div className="tags-card">
          <div className="tags-card-header text-green">
            <CheckCircle2 size={18} />
            <h3>Matched Skills ({matchedSkills.length})</h3>
          </div>
          <div className="tags-wrapper">
            {matchedSkills.map((skill, idx) => (
              <span key={idx} className="tag-pill tag-green">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="tags-card">
          <div className="tags-card-header text-red">
            <AlertCircle size={18} />
            <h3>Missing Important Keywords ({missingKeywords.length})</h3>
          </div>
          <div className="tags-wrapper">
            {missingKeywords.map((kw, idx) => (
              <span key={idx} className="tag-pill tag-red">
                + {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Improvement Suggestions Grid */}
      <div className="ats-insights-grid">
        {/* Strengths Card */}
        <div className="insight-card">
          <div className="insight-header text-green">
            <Award size={20} />
            <h3>Resume Strengths</h3>
          </div>
          <ul className="insight-list">
            {strengths.map((item, idx) => (
              <li key={idx} className="insight-item">
                <CheckCircle2 size={16} className="text-green flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Suggestions Card */}
        <div className="insight-card">
          <div className="insight-header text-blue">
            <Sparkles size={20} />
            <h3>Improvement Suggestions</h3>
          </div>
          <ol className="suggestion-list">
            {suggestions.map((item, idx) => (
              <li key={idx} className="suggestion-item">
                <span className="suggestion-num">{idx + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AtsResultDashboard;
