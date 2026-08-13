import "../../styles/employeeAttendanceReport.css";

function EmployeeAttendanceReport({
  employees,
  attendance,
}) {
  return (
    <div className="employee-attendance-report">

      <h2>Employee Attendance Report</h2>

      <table>

        <thead>
          <tr>
            <th>Employee</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Leave</th>
            <th>Half Day</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => {

            const employeeAttendance =
              attendance.filter(
                (record) =>
                  record.employeeId === employee.id
              );

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

            return (
              <tr key={employee.id}>

                <td>{employee.name}</td>

                <td>{presentCount}</td>

                <td>{absentCount}</td>

                <td>{leaveCount}</td>

                <td>{halfDayCount}</td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeAttendanceReport;