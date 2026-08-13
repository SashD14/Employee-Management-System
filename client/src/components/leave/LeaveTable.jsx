import { useNavigate } from "react-router-dom";

import LeaveStatusBadge from "./LeaveStatusBadge";

import "../../styles/leaveTable.css";


function LeaveTable({
  leaves,
  onUpdateStatus,
}) {

  const navigate =
    useNavigate();


  // =========================
  // UPDATE LEAVE STATUS
  // =========================

  const handleStatusUpdate = (
    leaveId,
    newStatus
  ) => {

    const confirmed =
      window.confirm(
        `Are you sure you want to ${newStatus.toLowerCase()} this leave request?`
      );


    if (!confirmed) {
      return;
    }


    onUpdateStatus(
      leaveId,
      newStatus
    );
  };


  // =========================
  // EMPTY STATE
  // =========================

  if (leaves.length === 0) {

    return (

      <div className="leave-table-empty">

        <div className="leave-empty-icon">
          ✓
        </div>

        <h3>
          No leave requests found
        </h3>

        <p>
          Try changing your search
          or filter options.
        </p>

      </div>

    );
  }


  // =========================
  // TABLE
  // =========================

  return (

    <div className="leave-table">

      <table>

        <thead>

          <tr>

            <th>
              Employee
            </th>

            <th>
              Leave Type
            </th>

            <th>
              Dates
            </th>

            <th>
              Reason
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {leaves.map(
            (leave) => (

              <tr
                key={leave.id}
              >


                {/* EMPLOYEE */}

                <td>
                  {leave.employeeName}
                </td>


                {/* LEAVE TYPE */}

                <td>
                  {leave.leaveType}
                </td>


                {/* DATES */}

                <td>
                  <div className="leave-dates">

                    <span>
                      {formatDate(
                        leave.startDate
                      )}
                    </span>

                    <span className="leave-date-separator">
                      -
                    </span>

                    <span>
                      {formatDate(
                        leave.endDate
                      )}
                    </span>

                  </div>
                </td>


                {/* REASON */}

                <td>
                  {leave.reason}
                </td>


                {/* STATUS */}

                <td>

                  <LeaveStatusBadge
                    status={
                      leave.status
                    }
                  />

                </td>


                {/* ACTIONS */}

                <td>

                  <div className="leave-actions">

                    {/* VIEW */}

                    <button
                      type="button"
                      className="leave-view-button"
                      onClick={() =>
                        navigate(
                          `/leaves/${leave.id}`
                        )
                      }
                    >
                      View
                    </button>


                    {/* APPROVE / REJECT */}

                    {leave.status ===
                      "Pending" && (

                      <>

                        <button
                          type="button"
                          className="leave-action-button leave-approve-button"
                          onClick={() =>
                            handleStatusUpdate(
                              leave.id,
                              "Approved"
                            )
                          }
                        >
                          Approve
                        </button>


                        <button
                          type="button"
                          className="leave-action-button leave-reject-button"
                          onClick={() =>
                            handleStatusUpdate(
                              leave.id,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </button>

                      </>

                    )}

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );
}


// =========================
// FORMAT DATE
// =========================

function formatDate(
  dateString
) {

  if (!dateString) {
    return "-";
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


export default LeaveTable;