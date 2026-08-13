import { useNavigate } from "react-router-dom";

import { useLeaves } from "../../context/useLeaves";
import { useEmployees } from "../../context/useEmployees";

import "../../styles/pendingLeaves.css";

function PendingLeaves() {
  const navigate = useNavigate();

  const { leaves } = useLeaves();
  const { employees } = useEmployees();

  // =========================
  // PENDING LEAVES
  // =========================

  const pendingLeaves = leaves
    .filter(
      (leave) =>
        leave.status === "Pending"
    )
    .slice(0, 5);

  const totalPendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;

  // =========================
  // RENDER
  // =========================

  return (
    <section className="pending-leaves">

      {/* =========================
          HEADER
      ========================== */}

      <div className="pending-leaves-header">

        <div>

          <h2>
            Pending Leave Requests
          </h2>

          <p>
            Leave requests waiting for approval
          </p>

        </div>

        <span className="pending-count">
          {totalPendingLeaves}
        </span>

      </div>

      {/* =========================
          PENDING LEAVE LIST
      ========================== */}

      <div className="pending-leaves-list">

        {pendingLeaves.length > 0 ? (

          pendingLeaves.map((leave) => {

            const employee =
              employees.find(
                (employee) =>
                  employee.id ===
                  leave.employeeId
              );

            return (
              <div
                className="pending-leave-row"
                key={leave.id}
              >

                {/* Employee */}

                <div className="pending-leave-employee">

                  <div className="pending-leave-avatar">
                    {employee?.name?.charAt(0) ||
                      "?"}
                  </div>

                  <div>

                    <h3>
                      {employee?.name ||
                        leave.employeeName ||
                        "Unknown Employee"}
                    </h3>

                    <p>
                      {leave.leaveType}
                    </p>

                  </div>

                </div>

                {/* Leave Dates */}

                <div className="pending-leave-dates">
                  {leave.startDate} →{" "}
                  {leave.endDate}
                </div>

                {/* View Button */}

                <button
                  type="button"
                  className="pending-leave-view-button"
                  onClick={() =>
                    navigate(
                      `/leaves/${leave.id}`
                    )
                  }
                >
                  View
                </button>

              </div>
            );
          })

        ) : (

          <div className="no-pending-leaves">

            <span className="success-icon">
              ✓
            </span>

            <p>
              No pending leave requests
            </p>

          </div>

        )}

      </div>

      {/* =========================
          FOOTER
      ========================== */}

      <div className="pending-leaves-footer">

        <span>
          {totalPendingLeaves === 0
            ? "No pending requests"
            : totalPendingLeaves === 1
              ? "1 pending request"
              : `Showing ${
                  Math.min(totalPendingLeaves, 5)
                } of ${
                  totalPendingLeaves
                } requests`}
        </span>

        <button
          type="button"
          onClick={() =>
            navigate("/leaves")
          }
        >
          View All
        </button>

      </div>

    </section>
  );
}

export default PendingLeaves;