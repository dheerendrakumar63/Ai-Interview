import { useNavigate } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

function LatestInterviewCard({ latestInterview }) {
  const navigate = useNavigate();

  if (!latestInterview) {
    return (
      <div className="latest-interview-box">
        <div className="card-title-row">
          <h3>Latest Interview</h3>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: "20px 0" }}>
          No interview found. Start your first AI interview now!
        </p>
        <button
          className="btn-create-primary"
          onClick={() => navigate("/create-interview")}
        >
          + Create Interview
        </button>
      </div>
    );
  }

  const isCompleted = latestInterview.status === "Completed";
  const diffClass =
    latestInterview.difficulty?.toLowerCase() === "easy"
      ? "diff-easy"
      : latestInterview.difficulty?.toLowerCase() === "hard"
      ? "diff-hard"
      : "diff-medium";

  const dateStr = latestInterview.createdAt
    ? new Date(latestInterview.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "11 Aug 2026";

  const scoreVal = isCompleted ? `${latestInterview.score}/10` : "--";
  const progressPercent = isCompleted ? (Number(latestInterview.score) || 0) * 10 : 0;

  return (
    <div className="latest-interview-box">
      <div className="card-title-row" style={{ marginBottom: "10px" }}>
        <h3>Latest Interview</h3>
      </div>

      <div className="latest-header-info">
        <div className="latest-icon-box">
          <Briefcase size={20} />
        </div>
        <div>
          <div className="latest-role">{latestInterview.role}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <span className="latest-subtext">Difficulty:</span>
            <span className={`difficulty-pill ${diffClass}`}>
              {latestInterview.difficulty || "Medium"}
            </span>
          </div>
          <div className="latest-subtext" style={{ marginTop: "4px" }}>
            {isCompleted ? `Completed on ${dateStr}` : "Interview Pending"}
          </div>
        </div>
      </div>

      <div className="latest-score-row" style={{ marginTop: "8px" }}>
        <span className="latest-subtext">Score</span>
        <span className={`latest-score-val ${isCompleted ? "good" : ""}`}>
          {scoreVal}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="saas-progress-bar">
        <div
          className="saas-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Action Button */}
      <div style={{ marginTop: "8px" }}>
        {isCompleted ? (
          <button
            className="btn-create-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => navigate(`/result/${latestInterview._id}`)}
          >
            View Result <ArrowRight size={16} />
          </button>
        ) : (
          <button
            className="btn-create-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              backgroundColor: "#f97316",
            }}
            onClick={() => navigate(`/interview/${latestInterview._id}`)}
          >
            Continue Interview <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default LatestInterviewCard;
