import {
  Video,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";

function KpiCards({ interviewsCount, completed, pending, averageScore, highestScore }) {
  const cards = [
    {
      title: "Total Interviews",
      value: interviewsCount,
      icon: <Video size={20} />,
      iconClass: "kpi-icon-blue",
      trend: "↗ 20% from last month",
      trendClass: "trend-up",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle size={20} />,
      iconClass: "kpi-icon-green",
      trend: "↗ 16% from last month",
      trendClass: "trend-up",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock size={20} />,
      iconClass: "kpi-icon-orange",
      trend: "↘ 5% from last month",
      trendClass: "trend-down",
    },
    {
      title: "Average Score",
      value: `${averageScore} / 10`,
      icon: <TrendingUp size={20} />,
      iconClass: "kpi-icon-purple",
      trend: "↗ 8% from last month",
      trendClass: "trend-up",
    },
    {
      title: "Highest Score",
      value: `${highestScore} / 10`,
      icon: <Star size={20} />,
      iconClass: "kpi-icon-amber",
      trend: "🏆 Great job!",
      trendClass: "trend-up",
    },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="kpi-card">
          <div className="kpi-header">
            <div className={`kpi-icon-wrapper ${card.iconClass}`}>
              {card.icon}
            </div>
            <span className="kpi-title">{card.title}</span>
          </div>

          <div className="kpi-value-row">
            <span className="kpi-value">{card.value}</span>
            <span className={`kpi-trend ${card.trendClass}`}>
              {card.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;
