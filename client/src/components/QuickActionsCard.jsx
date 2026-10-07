import { useNavigate } from "react-router-dom";
import {
  Plus,
  FileText,
  History,
  Sparkles,
} from "lucide-react";

function QuickActionsCard() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create New Interview",
      desc: "Start a new AI interview",
      icon: <Plus size={18} />,
      iconBg: "#eff6ff",
      iconColor: "#3b82f6",
      path: "/create-interview",
    },
    {
      title: "Analyze Resume",
      desc: "Get AI-powered feedback",
      icon: <FileText size={18} />,
      iconBg: "#f0fdf4",
      iconColor: "#22c55e",
      path: "/resume",
    },
    {
      title: "Browse History",
      desc: "View your past interviews",
      icon: <History size={18} />,
      iconBg: "#f5f3ff",
      iconColor: "#8b5cf6",
      path: "/history",
    },
    {
      title: "Improve Skills",
      desc: "Practice & get better",
      icon: <Sparkles size={18} />,
      iconBg: "#fff1f2",
      iconColor: "#f43f5e",
      path: "/create-interview",
    },
  ];

  return (
    <div className="quick-actions-card">
      <div className="card-title-row">
        <h3>Quick Actions</h3>
      </div>

      <div className="quick-actions-list">
        {actions.map((act, idx) => (
          <div
            key={idx}
            className="quick-action-item"
            onClick={() => navigate(act.path)}
          >
            <div
              className="qa-icon-wrapper"
              style={{ backgroundColor: act.iconBg, color: act.iconColor }}
            >
              {act.icon}
            </div>
            <div>
              <p className="qa-title">{act.title}</p>
              <p className="qa-desc">{act.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActionsCard;
