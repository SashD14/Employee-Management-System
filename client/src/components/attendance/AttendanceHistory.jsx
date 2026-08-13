import "../../styles/attendanceHistory.css";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

function AttendanceHistory({
  employeeId,
  attendance,
}) {
  const employeeHistory = attendance
    .filter(
      (record) =>
        record.employeeId === employeeId
    )
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="attendance-history">

      <h2>Attendance History</h2>

      <div className="attendance-history-list">

        {employeeHistory.map((record) => (
          <div
            className="attendance-history-row"
            key={record.id}
          >
            <span className="attendance-history-date">
              {new Date(record.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>

            <AttendanceStatusBadge
              status={record.status}
            />
          </div>
        ))}

      </div>

    </div>
  );
}

export default AttendanceHistory;