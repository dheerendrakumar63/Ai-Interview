import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function RecentInterviewsTable({ interviews }) {
  const navigate = useNavigate();
  const recentList = interviews.slice(0, 5);

  return (
    <div className="recent-table-card">
      <div className="card-title-row">
        <h3>Recent Interviews</h3>
        <button className="btn-link" onClick={() => navigate("/history")}>
          View All
        </button>
      </div>

      <div className="table-responsive">
        <table className="saas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Role</th>
              <th>Status</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentList.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#64748b", padding: "24px" }}>
                  No Interviews Found
                </td>
              </tr>
            ) : (
              recentList.map((item, idx) => {
                const isCompleted = item.status === "Completed";
                const dateStr = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "11 Aug 2026";

                return (
                  <tr key={item._id || idx}>
                    <td style={{ fontWeight: "600", color: "#64748b" }}>{idx + 1}</td>
                    <td style={{ fontWeight: "600" }}>{item.role}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          isCompleted ? "status-completed" : "status-pending"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`difficulty-pill diff-${
                          item.difficulty?.toLowerCase() || "medium"
                        }`}
                      >
                        {item.difficulty || "Medium"}
                      </span>
                    </td>
                    <td
                      style={{
                        fontWeight: "700",
                        color: isCompleted ? "#ef4444" : "#94a3b8",
                      }}
                    >
                      {isCompleted ? `${item.score}/10` : "—"}
                    </td>
                    <td style={{ color: "#64748b", fontSize: "12px" }}>{dateStr}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="table-action-btn"
                        onClick={() =>
                          navigate(
                            isCompleted
                              ? `/result/${item._id}`
                              : `/interview/${item._id}`
                          )
                        }
                        title={isCompleted ? "View Result" : "Continue Interview"}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentInterviewsTable;
