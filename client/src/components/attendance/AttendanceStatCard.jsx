import "../../styles/attendanceStatCard.css";

function AttendanceStatCard({ title, value }) {
  return (
    <div className="attendance-stat-card">

      <h3>{title}</h3>

      <p>{value}</p>

    </div>
  );
}

export default AttendanceStatCard;