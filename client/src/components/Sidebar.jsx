import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  LayoutDashboard,
  Video,
  FileText,
  FilePlus,
  History,
  User,
  BarChart3,
  Trophy,
  BookOpen,
  Settings,
  Crown,
  LogOut,
  Bot,
} from "lucide-react";

function Sidebar({ isMobileOpen, setIsMobileOpen, logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path, comingSoonMsg = null) => {
    if (setIsMobileOpen) setIsMobileOpen(false);
    if (comingSoonMsg) {
      toast.info(comingSoonMsg);
      return;
    }
    if (path) {
      navigate(path);
    }
  };

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    // { label: "Interviews", icon: <Video size={18} />, path: "/history" },
    { label: "Resume Analyzer", icon: <FileText size={18} />, path: "/resume" },
    { label: "Resume History", icon: <History size={18} />, path: "/resume-history" },
    { label: "Interview History", icon: <History size={18} />, path: "/history" },
    { label: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  const secondaryNavItems = [
    { label: "Reports", icon: <BarChart3 size={18} />, comingSoon: "Reports & Analytics section coming soon!" },
    { label: "Leaderboard", icon: <Trophy size={18} />, comingSoon: "Leaderboard feature coming soon!" },
    { label: "Resources", icon: <BookOpen size={18} />, comingSoon: "Learning resources coming soon!" },
    { label: "Settings", icon: <Settings size={18} />, path: "/profile" },
  ];

  return (
    <aside className={`saas-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="logo-icon">
          <Bot size={20} />
        </div>
        <div className="logo-text">
          AI Interview<br />Platform
        </div>
      </div>

      {/* Main Navigation List */}
      <div className="sidebar-content">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={idx}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNav(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="sidebar-divider" />

        {secondaryNavItems.map((item, idx) => {
          const isActive = item.path && location.pathname === item.path;
          return (
            <button
              key={idx}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNav(item.path, item.comingSoon)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Upgrade to Pro Card */}
        <div className="pro-card">
          <div className="pro-card-header">
            <Crown size={16} style={{ color: "#eab308" }} />
            <span>Upgrade to Pro</span>
          </div>
          <p className="pro-card-text">
            Unlock advanced analytics, AI feedback & more.
          </p>
          <button
            className="btn-pro"
            onClick={() => toast.success("Pro Upgrade plan coming soon!")}
          >
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Footer Logout */}
      <div className="sidebar-footer">
        <button className="nav-item" onClick={logout} style={{ color: "#ef4444" }}>
          <span className="nav-icon">
            <LogOut size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
