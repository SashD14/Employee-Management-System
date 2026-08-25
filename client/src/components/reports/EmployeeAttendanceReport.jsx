import "../../styles/employeeAttendanceReport.css";

function EmployeeAttendanceReport({
  employees,
  attendance,
}) {
  return (
    <div className="employee-attendance-report">

      <div className="employee-attendance-report-header">

        <div>
          <h2>
            Employee Attendance Report
          </h2>

          <p>
            Individual employee attendance summary
          </p>
        </div>

      </div>


      <div className="employee-attendance-table-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                Employee
              </th>

              <th>
                Department
              </th>

              <th>
                Present
              </th>

              <th>
                Absent
              </th>

              <th>
                Leave
              </th>

              <th>
                Half Day
              </th>

              <th>
                Attendance Rate
              </th>

            </tr>

          </thead>


          <tbody>

            {employees.map((employee) => {

              // =========================
              // EMPLOYEE ATTENDANCE
              // =========================

              const employeeAttendance =
                attendance.filter(
                  (record) =>
                    record.employeeId === employee.id
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
              // TOTAL RECORDS
              // =========================

              const totalRecords =
                employeeAttendance.length;


              // =========================
              // ATTENDANCE RATE
              //
              // Present = 100%
              // Half Day = 50%
              // =========================

              const attendanceRate =
                totalRecords > 0
                  ? (
                      (
                        presentCount +
                        halfDayCount * 0.5
                      ) /
                      totalRecords
                    ) * 100
                  : 0;

               const attendanceLevel =
                  attendanceRate >= 80
                    ? "good"
                    : attendanceRate >= 50
                      ? "average"
                      : "low"; 


              return (

                <tr key={employee.id}>

                  {/* EMPLOYEE */}

                  <td>

                    <div className="attendance-employee">

                      <div className="attendance-employee-avatar">

                        {employee.name
                          ?.charAt(0)
                          .toUpperCase()}

                      </div>


                      <span>
                        {employee.name}
                      </span>

                    </div>

                  </td>


                  {/* DEPARTMENT */}

                  <td>
                    {employee.department || "-"}
                  </td>


                  {/* PRESENT */}

                  <td>
                    {presentCount}
                  </td>


                  {/* ABSENT */}

                  <td>
                    {absentCount}
                  </td>


                  {/* LEAVE */}

                  <td>
                    {leaveCount}
                  </td>


                  {/* HALF DAY */}

                  <td>
                    {halfDayCount}
                  </td>


                  {/* ATTENDANCE RATE */}

                  <td>

                    <div className="attendance-rate">

                      <div className="attendance-progress">

                        <div
                          className={`attendance-progress-fill attendance-${attendanceLevel}`}
                          style={{
                            width: `${attendanceRate}%`,
                          }}
                        />

                      </div>


                      <div className="attendance-rate-info">

                        <span className="attendance-rate-percentage">
                          {attendanceRate.toFixed(1)}%
                        </span>

                        <span
                          className={`attendance-level attendance-${attendanceLevel}`}
                        >
                          {attendanceLevel}
                        </span>

                      </div>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployeeAttendanceReport;