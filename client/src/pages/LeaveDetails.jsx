import { useParams } from "react-router-dom";

import LeaveStatusBadge from "../components/leave/LeaveStatusBadge";

import { useLeaves } from "../context/useLeaves";

import BackButton from "../components/common/BackButton";

import "../styles/leaveDetails.css";


function LeaveDetails() {

  const { id } =
    useParams();


  const leaveId =
    Number(id);


  // =========================
  // LEAVE CONTEXT
  // =========================

  const {
    leaves,
    updateLeaveStatus,
  } = useLeaves();


  // =========================
  // FIND LEAVE
  // =========================

  const leave =
    leaves.find(
      (item) =>
        item.id === leaveId
    );


  // =========================
  // INVALID LEAVE
  // =========================

  if (!leave) {

    return (

      <div className="leave-details">

        <BackButton />

        <div className="leave-not-found">

          <h1>
            Leave Not Found
          </h1>

          <p>
            The leave request you are
            looking for does not exist.
          </p>

        </div>

      </div>

    );
  }


  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusUpdate = (
    newStatus
  ) => {

    /*
     * Only Pending requests should
     * be changed from this page.
     */

    if (
      leave.status !==
      "Pending"
    ) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to ${newStatus.toLowerCase()} this leave request?`
      );


    if (!confirmed) {
      return;
    }


    updateLeaveStatus(
      leave.id,
      newStatus
    );

  };


  // =========================
  // RENDER
  // =========================

  return (

    <div className="leave-details">


      <BackButton />


      <div className="leave-details-header">

        <div>

          <h1>
            Leave Details
          </h1>

          <p>
            View the complete leave
            request information.
          </p>

        </div>

      </div>


      <div className="leave-details-card">


        {/* =========================
            EMPLOYEE
        ========================== */}

        <div className="leave-detail-item">

          <span>
            Employee
          </span>

          <strong>
            {leave.employeeName}
          </strong>

        </div>


        {/* =========================
            LEAVE TYPE
        ========================== */}

        <div className="leave-detail-item">

          <span>
            Leave Type
          </span>

          <strong>
            {leave.leaveType}
          </strong>

        </div>


        {/* =========================
            START DATE
        ========================== */}

        <div className="leave-detail-item">

          <span>
            Start Date
          </span>

          <strong>
            {formatDate(
              leave.startDate
            )}
          </strong>

        </div>


        {/* =========================
            END DATE
        ========================== */}

        <div className="leave-detail-item">

          <span>
            End Date
          </span>

          <strong>
            {formatDate(
              leave.endDate
            )}
          </strong>

        </div>


        {/* =========================
            REASON
        ========================== */}

        <div className="leave-detail-item">

          <span>
            Reason
          </span>

          <strong>
            {leave.reason}
          </strong>

        </div>


        {/* =========================
            STATUS
        ========================== */}

        <div className="leave-detail-item">

          <span>
            Status
          </span>

          <LeaveStatusBadge
            status={
              leave.status
            }
          />

        </div>


        {/* =========================
            ACTIONS
        ========================== */}

        {leave.status ===
          "Pending" && (

          <div className="leave-detail-actions">

            <button
              type="button"
              className="leave-detail-approve"
              onClick={() =>
                handleStatusUpdate(
                  "Approved"
                )
              }
            >
              Approve
            </button>


            <button
              type="button"
              className="leave-detail-reject"
              onClick={() =>
                handleStatusUpdate(
                  "Rejected"
                )
              }
            >
              Reject
            </button>

          </div>

        )}


      </div>

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


export default LeaveDetails;