import "../../styles/exportReportButton.css";

function ExportReportButton({
  employees,
  attendance,
}) {
  const handleExport = () => {
    const rows = [];

    rows.push([
      "Employee",
      "Present",
      "Absent",
      "Leave",
      "Half Day",
    ]);

    employees.forEach((employee) => {
      const employeeAttendance = attendance.filter(
        (record) =>
          record.employeeId === employee.id
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

      rows.push([
        employee.name,
        presentCount,
        absentCount,
        leaveCount,
        halfDayCount,
      ]);
    });

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="export-report-button"
      onClick={handleExport}
    >
      Export Attendance Report
    </button>
  );
}

export default ExportReportButton;