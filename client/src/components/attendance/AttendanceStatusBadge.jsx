import "../../styles/attendanceStatusBadge.css";

function AttendanceStatusBadge({ status }) {
  const statusClass = status
    .toLowerCase()
    .replace(" ", "-");

  return (
    <span
      className={`attendance-status-badge ${statusClass}`}
    >
      {status}
    </span>
  );
}

export default AttendanceStatusBadge;