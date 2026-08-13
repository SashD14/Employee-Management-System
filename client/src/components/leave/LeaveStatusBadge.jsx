import "../../styles/leaveStatusBadge.css";

function LeaveStatusBadge({ status }) {
  return (
    <span
      className={`leave-status-badge ${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
}

export default LeaveStatusBadge;