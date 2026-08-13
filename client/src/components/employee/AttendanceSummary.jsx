import "../../styles/attendanceSummary.css";


function AttendanceSummary({
  employeeId,
  attendance,
}) {

  // =========================
  // EMPLOYEE ATTENDANCE
  // =========================

  const employeeAttendance =
    attendance.filter(
      (record) =>
        record.employeeId === employeeId
    );


  // =========================
  // STATUS COUNTS
  // =========================

  const presentCount =
    employeeAttendance.filter(
      (record) =>
        record.status === "Present"
    ).length;


  const absentCount =
    employeeAttendance.filter(
      (record) =>
        record.status === "Absent"
    ).length;


  const leaveCount =
    employeeAttendance.filter(
      (record) =>
        record.status === "Leave"
    ).length;


  const halfDayCount =
    employeeAttendance.filter(
      (record) =>
        record.status === "Half Day"
    ).length;


  // =========================
  // ATTENDANCE RATE
  // =========================

  const totalDays =
    employeeAttendance.length;


  const attendancePoints =
    presentCount +
    halfDayCount * 0.5;


  const attendanceRate =
    totalDays === 0
      ? 0
      : Math.round(
          (attendancePoints /
            totalDays) *
            100
        );


  return (
    <div className="attendance-summary">

      <h2>
        Attendance Summary
      </h2>


      <div className="attendance-summary-list">


        <div className="attendance-summary-row">

          <span>
            Present
          </span>

          <strong>
            {presentCount}
          </strong>

        </div>


        <div className="attendance-summary-row">

          <span>
            Absent
          </span>

          <strong>
            {absentCount}
          </strong>

        </div>


        <div className="attendance-summary-row">

          <span>
            Leave
          </span>

          <strong>
            {leaveCount}
          </strong>

        </div>


        <div className="attendance-summary-row">

          <span>
            Half Day
          </span>

          <strong>
            {halfDayCount}
          </strong>

        </div>


        {/* =========================
            ATTENDANCE RATE
        ========================== */}

        <div className="attendance-rate-row">

          <div>

            <span>
              Attendance Rate
            </span>

            <small>
              Based on recorded attendance
            </small>

          </div>


          <strong>
            {attendanceRate}%
          </strong>

        </div>


      </div>

    </div>
  );
}


export default AttendanceSummary;