import { useLeaves } from "../../context/useLeaves";
import "../../styles/exportReportButton.css";

function ExportLeaveReportButton({ employees }) {
  const { leaves } = useLeaves();

  const handleExport = () => {
    const rows = [];

    rows.push([
      "Employee",
      "Pending",
      "Approved",
      "Rejected",
    ]);

    employees.forEach((employee) => {
      const employeeLeaves = leaves.filter(
        (leave) =>
          leave.employeeId === employee.id
      );

      const pendingCount = employeeLeaves.filter(
        (leave) =>
          leave.status === "Pending"
      ).length;

      const approvedCount = employeeLeaves.filter(
        (leave) =>
          leave.status === "Approved"
      ).length;

      const rejectedCount = employeeLeaves.filter(
        (leave) =>
          leave.status === "Rejected"
      ).length;

      rows.push([
        employee.name,
        pendingCount,
        approvedCount,
        rejectedCount,
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
    link.download = "leave-report.csv";

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
      Export Leave Report
    </button>
  );
}

export default ExportLeaveReportButton;