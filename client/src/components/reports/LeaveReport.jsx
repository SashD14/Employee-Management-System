import "../../styles/leaveReport.css";


function LeaveReport({
  employees,
  leaves,
}) {

  return (

    <div className="leave-report">

      <h2>
        Leave Report
      </h2>


      {employees.length === 0 ? (

        <div className="no-leave-report">
          No employee data available.
        </div>

      ) : (

        <div className="leave-report-table">

          <table>

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Pending
                </th>

                <th>
                  Approved
                </th>

                <th>
                  Rejected
                </th>

              </tr>

            </thead>


            <tbody>

              {employees.map(
                (employee) => {

                  const employeeLeaves =
                    leaves.filter(
                      (leave) =>
                        leave.employeeId ===
                        employee.id
                    );


                  const pendingCount =
                    employeeLeaves.filter(
                      (leave) =>
                        leave.status ===
                        "Pending"
                    ).length;


                  const approvedCount =
                    employeeLeaves.filter(
                      (leave) =>
                        leave.status ===
                        "Approved"
                    ).length;


                  const rejectedCount =
                    employeeLeaves.filter(
                      (leave) =>
                        leave.status ===
                        "Rejected"
                    ).length;


                  return (

                    <tr
                      key={employee.id}
                    >

                      <td>
                        {employee.name}
                      </td>

                      <td>
                        {pendingCount}
                      </td>

                      <td>
                        {approvedCount}
                      </td>

                      <td>
                        {rejectedCount}
                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );
}


export default LeaveReport;