import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AnalyticsSection({ interviews, resumeStats }) {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("7days");

  // Prepare Performance Overview Line Chart Data
  const completedInterviews = interviews
    .filter((item) => item.status === "Completed")
    .map((item, index) => {
      const dateObj = item.createdAt ? new Date(item.createdAt) : null;
      const dateStr = dateObj
        ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : `May ${index + 7}`;
      return {
        date: dateStr,
        score: Number(item.score || 0),
        role: item.role,
      };
    });

  // Fallback data if no interviews exist yet for visual presentation
  const lineData =
    completedInterviews.length > 0
      ? completedInterviews
      : [
          { date: "May 7", score: 2 },
          { date: "May 8", score: 4 },
          { date: "May 9", score: 2 },
          { date: "May 10", score: 6 },
          { date: "May 11", score: 7 },
          { date: "May 12", score: 5 },
          { date: "May 13", score: 8.5 },
        ];

  // Calculate Score Distribution brackets
  const scoreBrackets = [
    { label: "0–2", min: 0, max: 2, color: "#ef4444" },
    { label: "2–4", min: 2.01, max: 4, color: "#f97316" },
    { label: "4–6", min: 4.01, max: 6, color: "#eab308" },
    { label: "6–8", min: 6.01, max: 8, color: "#22c55e" },
    { label: "8–10", min: 8.01, max: 10, color: "#3b82f6" },
  ];


  const donutData = scoreBrackets.map((b) => {
    const count = interviews.filter((i) => {
      const sc = Number(i.score || 0);
      return sc >= b.min && sc <= b.max;
    }).length;

    // Default mock count if 0 for rich aesthetics
    const displayCount = interviews.length > 0 ? count : b.label === "8–10" ? 1 : b.label === "6–8" ? 2 : b.label === "4–6" ? 2 : b.label === "2–4" ? 3 : 4;
    const percentage = Math.round((displayCount / (interviews.length || 12)) * 100);

    return {
      name: b.label,
      value: displayCount,
      color: b.color,
      percentage,
    };
  });

  const resumeScore = resumeStats?.latestScore || 0;

  return (
    <div className="analytics-grid">
      {/* 1. Performance Overview Chart */}
      <div className="chart-card">
        <div className="card-title-row">
          <h3>Performance Overview</h3>
          <select
            className="select-filter"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b5bdb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b5bdb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#3b5bdb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scoreGradient)"
                dot={{ r: 4, fill: "#3b5bdb", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#3b5bdb" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#64748b" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b5bdb", marginRight: "6px" }}></span>
          Scores (out of 10)
        </div>
      </div>

      {/* 2. Score Distribution Donut Chart */}
      <div className="chart-card">
        <div className="card-title-row">
          <h3>Score Distribution</h3>
        </div>

        <div className="donut-container" style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="donut-legend">
          {donutData.map((item, idx) => (
            <div key={idx} className="legend-item">
              <div className="legend-left">
                <span className="legend-dot" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className="legend-count">
                {item.value} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Resume Insights Card */}
      <div className="chart-card resume-insights-card">
        <div className="card-title-row" style={{ width: "100%" }}>
          <h3>Resume Insights</h3>
        </div>

        <div className="resume-score-gauge">
          <span className="gauge-value">{resumeScore}</span>
          <span className="gauge-max">/ 100</span>
        </div>

        <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", marginBottom: "16px" }}>
          Resume Score
        </span>

        <button
          className="btn-secondary-blue"
          onClick={() => navigate("/resume")}
        >
          Improve Resume
        </button>
      </div>
    </div>
  );
}

export default AnalyticsSection;
