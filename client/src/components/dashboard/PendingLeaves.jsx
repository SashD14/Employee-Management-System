import { useNavigate } from "react-router-dom";

import { useLeaves } from "../../context/useLeaves";
import { useEmployees } from "../../context/useEmployees";

import "../../styles/pendingLeaves.css";


function PendingLeaves() {

  const navigate =
    useNavigate();


  const { leaves } =
    useLeaves();


  const { employees } =
    useEmployees();


  // =========================
  // ALL PENDING LEAVES
  // =========================

  const allPendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    );


  // =========================
  // SHOW ONLY FIRST 5
  // =========================

  const pendingLeaves =
    allPendingLeaves.slice(0, 5);


  const totalPendingLeaves =
    allPendingLeaves.length;


  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(dateString) {

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

          pendingLeaves.map(
            (leave) => {

              const employee =
                employees.find(
                  (employee) =>
                    employee.id ===
                    leave.employeeId
                );


              const employeeName =
                employee?.name ||
                leave.employeeName ||
                "Unknown Employee";


              return (

                <div
                  className="pending-leave-row"
                  key={leave.id}
                >


                  {/* EMPLOYEE */}

                  <div className="pending-leave-employee">

                    <div className="pending-leave-avatar">

                      {employeeName
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div className="pending-leave-info">

                      <h3>
                        {employeeName}
                      </h3>


                      <p>
                        {leave.leaveType ||
                          "Leave"}
                      </p>

                    </div>

                  </div>


                  {/* LEAVE DATES */}

                  <div className="pending-leave-dates">

                    <span>

                      {formatDate(
                        leave.startDate
                      )}

                    </span>


                    <span className="pending-date-arrow">

                      →

                    </span>


                    <span>

                      {formatDate(
                        leave.endDate
                      )}

                    </span>

                  </div>


                  {/* VIEW BUTTON */}

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

            }
          )

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
                  pendingLeaves.length
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