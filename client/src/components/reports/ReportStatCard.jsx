import "../../styles/reportStatCard.css";

function ReportStatCard({
  title,
  value,
  icon,
  variant = "default",
}) {
  return (
    <div
      className={`report-stat-card report-stat-${variant}`}
    >
      <div className="report-stat-icon">
        {icon}
      </div>

      <div className="report-stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default ReportStatCard;