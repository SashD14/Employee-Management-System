import "../../styles/attendanceTable.css";

import AttendanceStatusSelect from "./AttendanceStatusSelect";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

function AttendanceTable({
  employees,
  attendance,
  selectedDate,
  searchTerm,
  statusFilter,
  departmentFilter,
  onUpdateAttendance,
}) {
  const filteredEmployees = employees.filter(
    (employee) => {
      const attendanceRecord =
        attendance.find(
          (record) =>
            record.employeeId === employee.id &&
            record.date === selectedDate
        );

      // No record means attendance has not been marked yet.
      const attendanceStatus =
        attendanceRecord?.status || "Not Marked";

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        attendanceStatus === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    }
  );

  return (
    <div className="attendance-table-wrapper">

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployees.map(
            (employee) => {

              const attendanceRecord =
                attendance.find(
                  (record) =>
                    record.employeeId ===
                      employee.id &&
                    record.date ===
                      selectedDate
                );

              const attendanceStatus =
                attendanceRecord?.status ||
                "Not Marked";

              return (
                <tr key={employee.id}>

                  <td>
                    {employee.name}
                  </td>

                  <td>
                    {employee.department}
                  </td>

                  <td>
                    {formatDate(selectedDate)}
                  </td>

                  <td>
                    <AttendanceStatusBadge
                      status={attendanceStatus}
                    />
                  </td>

                  <td>

                    <AttendanceStatusSelect
                      value={
                        attendanceRecord?.status ||
                        "Not Marked"
                      }
                      onChange={(newStatus) =>
                        onUpdateAttendance(
                          employee.id,
                          selectedDate,
                          newStatus
                        )
                      }
                    />

                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}


// =========================
// FORMAT DATE
// =========================

function formatDate(dateString) {
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

export default AttendanceTable;