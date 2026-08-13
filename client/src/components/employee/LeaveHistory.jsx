import { useLeaves } from "../../context/useLeaves";

import LeaveStatusBadge from "../leave/LeaveStatusBadge";

import "../../styles/leaveHistory.css";


function LeaveHistory({ employeeId }) {

  const { leaves } = useLeaves();


  // =========================
  // EMPLOYEE LEAVE HISTORY
  // =========================

  const employeeLeaves =
    leaves.filter(
      (leave) =>
        leave.employeeId === employeeId
    );


  return (
    <div className="leave-history">

      <h2>
        Leave History
      </h2>


      {employeeLeaves.length === 0 ? (

        <p className="no-leave-history">
          No leave history available.
        </p>

      ) : (

        <div className="leave-history-table-wrapper">

          <table className="leave-history-table">

            <thead>

              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {employeeLeaves.map(
                (leave) => (

                  <tr key={leave.id}>

                    <td>
                      {leave.leaveType}
                    </td>


                    <td>
                      {formatDate(
                        leave.startDate
                      )}
                    </td>


                    <td>
                      {formatDate(
                        leave.endDate
                      )}
                    </td>


                    <td>
                      {leave.reason}
                    </td>


                    <td>
                      <LeaveStatusBadge
                        status={
                          leave.status
                        }
                      />
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

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


export default LeaveHistory;