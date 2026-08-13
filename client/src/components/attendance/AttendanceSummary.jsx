import "../../styles/attendanceSummary.css";

function AttendanceSummary({
  employeeId,
  attendance,
}) {
  const employeeAttendance = attendance.filter(
    (record) => record.employeeId === employeeId
  );

  const presentCount = employeeAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = employeeAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const leaveCount = employeeAttendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const halfDayCount = employeeAttendance.filter(
    (record) => record.status === "Half Day"
  ).length;

  return (
    <div className="attendance-summary">

      <h2>Attendance Summary</h2>

      <div className="attendance-item">
        <span>Present</span>
        <strong>{presentCount}</strong>
      </div>

      <div className="attendance-item">
        <span>Absent</span>
        <strong>{absentCount}</strong>
      </div>

      <div className="attendance-item">
        <span>Leave</span>
        <strong>{leaveCount}</strong>
      </div>

      <div className="attendance-item">
        <span>Half Day</span>
        <strong>{halfDayCount}</strong>
      </div>

    </div>
  );
}

export default AttendanceSummary;