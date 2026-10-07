import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KpiCards from "../components/KpiCards";
import AnalyticsSection from "../components/AnalyticsSection";
import LatestInterviewCard from "../components/LatestInterviewCard";
import RecentInterviewsTable from "../components/RecentInterviewsTable";
import QuickActionsCard from "../components/QuickActionsCard";
import "../css/saas-dashboard.css";
import { Plus } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  // Safely parse user from localStorage
  let user = null;
  try {
    const rawUser = localStorage.getItem("user");
    if (rawUser && rawUser !== "undefined" && rawUser !== "null") {
      user = JSON.parse(rawUser);
    }
  } catch (e) {
    console.error("Failed to parse user from localStorage:", e);
  }

  // ==========================
  // States
  // ==========================
  const [interviews, setInterviews] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [resumeStats, setResumeStats] = useState({
    totalResumes: 0,
    latestScore: 0,
    lastUpload: null,
  });

  // ==========================
  // Load Dashboard
  // ==========================
  useEffect(() => {
    fetchInterviews();
    fetchResumeStats();
  }, []);

  // ==========================
  // Interview API
  // ==========================
  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await API.get("/interview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(res.data)) {
        setInterviews(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Resume Stats API
  // ==========================
  const fetchResumeStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await API.get("/resume/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data && typeof res.data === "object") {
        setResumeStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Interview Statistics Calculations
  // ==========================
  const safeInterviews = Array.isArray(interviews) ? interviews : [];

  const completedInterviews = safeInterviews.filter(
    (item) => item && item.status === "Completed"
  );
  const completed = completedInterviews.length;
  const pending = safeInterviews.filter(
    (item) => item && item.status === "Pending"
  ).length;

  const averageScore =
    completedInterviews.length > 0
      ? (
          completedInterviews.reduce(
            (sum, item) => sum + Number(item?.score || 0),
            0
          ) / completedInterviews.length
        ).toFixed(1)
      : 0;

  const highestScore =
    completedInterviews.length > 0
      ? Math.max(
          ...completedInterviews.map((item) => Number(item?.score || 0))
        )
      : 0;

  const latestInterview =
    safeInterviews.length > 0 ? safeInterviews[safeInterviews.length - 1] : null;

  // ==========================
  // Logout
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="saas-layout">
      {/* 1. Modern Fixed Left Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        logout={logout}
      />

      {/* Main Content Workspace */}
      <div className="saas-main-content">
        {/* 2. Top Navbar */}
        <Navbar
          user={user}
          toggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          logout={logout}
        />

        {/* Workspace Body */}
        <div className="dashboard-container">
          {/* 3. Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h1>Welcome back, {user?.name || "Dheerendra Kumar"}! 👋</h1>
              <p>Here's what's happening with your interviews today.</p>
            </div>
            <button
              className="btn-create-primary"
              onClick={() => navigate("/create-interview")}
            >
              <Plus size={18} />
              <span>Create Interview</span>
            </button>
          </div>

          {/* 4. 5 Compact Statistic Cards */}
          <KpiCards
            interviewsCount={safeInterviews.length}
            completed={completed}
            pending={pending}
            averageScore={averageScore}
            highestScore={highestScore}
          />

          {/* 5. Analytics Section (Line Chart, Score Donut, Resume Insights) */}
          <AnalyticsSection
            interviews={safeInterviews}
            resumeStats={resumeStats}
          />

          {/* 6, 7, 8. Bottom Section (Latest Interview, Recent Table, Quick Actions) */}
          <div className="bottom-grid">
            <LatestInterviewCard latestInterview={latestInterview} />
            <RecentInterviewsTable interviews={safeInterviews} />
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;