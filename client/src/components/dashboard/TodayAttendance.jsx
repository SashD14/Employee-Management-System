import { useNavigate } from "react-router-dom";

import { useEmployees } from "../../context/useEmployees";
import { useAttendance } from "../../context/useAttendance";

import "../../styles/todayAttendance.css";

function TodayAttendance() {
  const navigate = useNavigate();

  const { employees } = useEmployees();
  const { attendance } = useAttendance();

  // =========================
  // GET LATEST ATTENDANCE DATE
  // =========================

  const attendanceDates = attendance.map(
    (record) => record.date
  );

  const today =
    attendanceDates.length > 0
      ? [...attendanceDates].sort().at(-1)
      : null;

  // =========================
  // CREATE TODAY'S EMPLOYEE
  // ATTENDANCE VIEW
  // =========================

  const todayEmployeeAttendance =
    employees.map((employee) => {

      const attendanceRecord =
        attendance.find(
          (record) =>
            record.employeeId === employee.id &&
            record.date === today
        );

      return {
        employee,
        status:
          attendanceRecord?.status ||
          "Not Marked",
      };
    });

  // Show only first 5 employees
  const displayedAttendance =
    todayEmployeeAttendance.slice(0, 5);

  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }

    const date =
      new Date(
        `${dateString}T00:00:00`
      );

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <section className="today-attendance">

      {/* =========================
          HEADER
      ========================== */}

      <div className="today-attendance-header">

        <div>

          <h2>
            Today's Attendance
          </h2>

          <p>
            Attendance overview for today
          </p>

        </div>

        <span className="attendance-date">
          {formatDate(today)}
        </span>

      </div>

      {/* =========================
          ATTENDANCE LIST
      ========================== */}

      <div className="attendance-list">

        {displayedAttendance.length > 0 ? (

          displayedAttendance.map(
            ({ employee, status }) => (

              <div
                className="attendance-row"
                key={employee.id}
              >

                {/* Employee Information */}

                <div className="attendance-employee">

                  <div className="attendance-avatar">
                    {employee.name.charAt(0)}
                  </div>

                  <div>

                    <h3>
                      {employee.name}
                    </h3>

                    <p>
                      {employee.role}
                    </p>

                  </div>

                </div>

                {/* Attendance Status */}

                <span
                  className={`attendance-status ${status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {status}
                </span>

              </div>

            )
          )

        ) : (

          <p className="no-attendance">
            No employees available.
          </p>

        )}

      </div>

      {/* =========================
          FOOTER
      ========================== */}

      <div className="attendance-footer">

        <span>
          {employees.length === 0
            ? "No employees"
            : employees.length <= 5
              ? `Showing ${employees.length} of ${employees.length} employees`
              : `Showing 5 of ${employees.length} employees`}
        </span>

        <button
          type="button"
          onClick={() =>
            navigate("/attendance")
          }
        >
          View All
        </button>

      </div>

    </section>
  );
}

export default TodayAttendance;