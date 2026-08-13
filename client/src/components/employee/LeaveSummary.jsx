import { useLeaves } from "../../context/useLeaves";

import { initialLeaveBalances } from "../../data/leaveBalances";

import "../../styles/leaveSummary.css";


function LeaveSummary({ employeeId }) {

  const { leaves } = useLeaves();


  // =========================
  // EMPLOYEE LEAVE BALANCE
  // =========================

  const employeeBalance =
    initialLeaveBalances.find(
      (balance) =>
        balance.employeeId === employeeId
    );


  // =========================
  // EMPLOYEE LEAVE REQUESTS
  // =========================

  const employeeLeaves =
    leaves.filter(
      (leave) =>
        leave.employeeId === employeeId
    );


  // =========================
  // APPROVED LEAVES
  // =========================

  const approvedLeaves =
    employeeLeaves.filter(
      (leave) =>
        leave.status === "Approved"
    );


  // =========================
  // USED CASUAL LEAVE
  // =========================

  const usedCasualLeave =
    approvedLeaves.filter(
      (leave) =>
        leave.leaveType === "Casual Leave"
    ).reduce(
      (total, leave) =>
        total + calculateLeaveDays(
          leave.startDate,
          leave.endDate
        ),
      0
    );


  // =========================
  // USED SICK LEAVE
  // =========================

  const usedSickLeave =
    approvedLeaves.filter(
      (leave) =>
        leave.leaveType === "Sick Leave"
    ).reduce(
      (total, leave) =>
        total + calculateLeaveDays(
          leave.startDate,
          leave.endDate
        ),
      0
    );


  // =========================
  // LEAVE ALLOWANCES
  // =========================

  const casualLeaveAllowance =
    employeeBalance?.casualLeave || 0;


  const sickLeaveAllowance =
    employeeBalance?.sickLeave || 0;


  // =========================
  // REMAINING LEAVES
  // =========================

  const remainingCasualLeave =
    Math.max(
      casualLeaveAllowance -
        usedCasualLeave,
      0
    );


  const remainingSickLeave =
    Math.max(
      sickLeaveAllowance -
        usedSickLeave,
      0
    );


  // =========================
  // REQUEST COUNTS
  // =========================

  const totalRequests =
    employeeLeaves.length;


  const approvedRequests =
    employeeLeaves.filter(
      (leave) =>
        leave.status === "Approved"
    ).length;


  const pendingRequests =
    employeeLeaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;


  const rejectedRequests =
    employeeLeaves.filter(
      (leave) =>
        leave.status === "Rejected"
    ).length;


  return (
    <div className="leave-summary">

      <h2>
        Leave Summary
      </h2>


      {/* =========================
          LEAVE BALANCE
      ========================== */}

      <div className="leave-balance-section">

        <h3>
          Leave Balance
        </h3>


        <div className="leave-balance-item">

          <div>
            <span>
              Casual Leave
            </span>

            <small>
              {usedCasualLeave} used
            </small>
          </div>


          <strong>
            {remainingCasualLeave}
          </strong>

        </div>


        <div className="leave-balance-item">

          <div>
            <span>
              Sick Leave
            </span>

            <small>
              {usedSickLeave} used
            </small>
          </div>


          <strong>
            {remainingSickLeave}
          </strong>

        </div>

      </div>


      {/* =========================
          LEAVE REQUESTS
      ========================== */}

      <div className="leave-request-section">

        <h3>
          Leave Requests
        </h3>


        <div className="leave-item">

          <span>
            Total Requests
          </span>

          <strong>
            {totalRequests}
          </strong>

        </div>


        <div className="leave-item">

          <span>
            Approved
          </span>

          <strong>
            {approvedRequests}
          </strong>

        </div>


        <div className="leave-item">

          <span>
            Pending
          </span>

          <strong>
            {pendingRequests}
          </strong>

        </div>


        <div className="leave-item">

          <span>
            Rejected
          </span>

          <strong>
            {rejectedRequests}
          </strong>

        </div>

      </div>

    </div>
  );
}


// =========================
// CALCULATE LEAVE DAYS
// =========================

function calculateLeaveDays(
  startDate,
  endDate
) {

  const start =
    new Date(
      `${startDate}T00:00:00`
    );


  const end =
    new Date(
      `${endDate}T00:00:00`
    );


  const difference =
    end.getTime() -
    start.getTime();


  const days =
    Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ) + 1;


  return days;
}


export default LeaveSummary;