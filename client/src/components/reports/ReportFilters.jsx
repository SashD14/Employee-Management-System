import "../../styles/reportFilters.css";

function ReportFilters({
  employeeFilter,
  setEmployeeFilter,
  departmentFilter,
  setDepartmentFilter,
  periodFilter,
  setPeriodFilter,
  employeeOptions,
  departmentOptions,
}) {
  return (
    <div className="report-filters">

      <div className="report-filter-group">
        <label>Employee</label>

        <select
          value={employeeFilter}
          onChange={(event) =>
            setEmployeeFilter(event.target.value)
          }
        >
          {employeeOptions.map((employee) => (
            <option
              key={employee}
              value={employee}
            >
              {employee}
            </option>
          ))}
        </select>
      </div>


      <div className="report-filter-group">
        <label>Department</label>

        <select
          value={departmentFilter}
          onChange={(event) =>
            setDepartmentFilter(event.target.value)
          }
        >
          {departmentOptions.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>
      </div>


      <div className="report-filter-group">
        <label>Period</label>

        <select
          value={periodFilter}
          onChange={(event) =>
            setPeriodFilter(event.target.value)
          }
        >
          <option value="All Time">
            All Time
          </option>

          <option value="Today">
            Today
          </option>

          <option value="This Week">
            This Week
          </option>

          <option value="This Month">
            This Month
          </option>
        </select>
      </div>

    </div>
  );
}

export default ReportFilters;