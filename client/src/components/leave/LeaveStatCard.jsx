import "../../styles/leaveStatCard.css";

function LeaveStatCard({ title, value }) {
  return (
    <div className="leave-stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default LeaveStatCard;