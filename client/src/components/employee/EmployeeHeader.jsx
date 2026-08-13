import "../../styles/employeeHeader.css";

function EmployeeHeader({ employee }) {
  return (
    <div className="employee-header">

      <div className="employee-avatar">
        {employee.name.charAt(0)}
      </div>

      <div className="employee-info">
        <h1>{employee.name}</h1>
        <p>{employee.role}</p>
        <span>{employee.department}</span>
      </div>

      <div
        className={
          employee.status === "Active"
            ? "status active"
            : "status inactive"
        }
      >
        {employee.status}
      </div>

    </div>
  );
}

export default EmployeeHeader;