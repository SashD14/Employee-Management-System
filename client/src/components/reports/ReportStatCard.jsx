import "../../styles/reportStatCard.css";

function ReportStatCard({ title, value }) {
  return (
    <div className="report-stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default ReportStatCard;