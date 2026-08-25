import { useState } from "react";

import { useEmployees } from "../../context/useEmployees";
import { useLeaves } from "../../context/useLeaves";


function AddLeaveForm({ onClose }) {

  const { employees } =
    useEmployees();

  const { addLeave } =
    useLeaves();


  // =========================
  // FORM STATE
  // =========================

  const [employeeId, setEmployeeId] =
    useState("");

  const [leaveType, setLeaveType] =
    useState("Casual Leave");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  // =========================
  // GET TODAY'S DATE
  // =========================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  // =========================
  // SUBMIT LEAVE REQUEST
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Clear previous error
    setError("");


    // =========================
    // VALIDATE EMPLOYEE
    // =========================

    if (!employeeId) {

      setError(
        "Please select an employee."
      );

      return;

    }


    // =========================
    // VALIDATE START DATE
    // =========================

    if (!startDate) {

      setError(
        "Please select a start date."
      );

      return;

    }


    // =========================
    // VALIDATE END DATE
    // =========================

    if (!endDate) {

      setError(
        "Please select an end date."
      );

      return;

    }


    // =========================
    // PREVENT PAST START DATE
    // =========================

    if (startDate < today) {

      setError(
        "Start date cannot be in the past."
      );

      return;

    }


    // =========================
    // VALIDATE DATE RANGE
    // =========================

    if (endDate < startDate) {

      setError(
        "End date cannot be before the start date."
      );

      return;

    }


    // =========================
    // VALIDATE REASON
    // =========================

    if (!reason.trim()) {

      setError(
        "Please enter a reason for the leave."
      );

      return;

    }


    try {

      setIsSubmitting(true);


      // =========================
      // CREATE LEAVE
      // =========================

      await addLeave({

        employeeId,

        leaveType,

        startDate,

        endDate,

        reason:
          reason.trim(),

      });


      // Close modal after success
      onClose();


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to create leave request. Please try again."
      );

    } finally {

      setIsSubmitting(false);

    }

  };


  return (

    <div className="leave-form-overlay">

      <div className="leave-form-modal">


        {/* =========================
            HEADER
        ========================== */}

        <div className="leave-form-header">

          <div>

            <h2>
              Add Leave Request
            </h2>

            <p>
              Create a new employee leave request.
            </p>

          </div>


          <button
            type="button"
            className="leave-form-close"
            onClick={onClose}
            disabled={isSubmitting}
          >
            ×
          </button>

        </div>


        {/* =========================
            ERROR MESSAGE
        ========================== */}

        {error && (

          <div className="leave-form-error">

            {error}

          </div>

        )}


        {/* =========================
            FORM
        ========================== */}

        <form
          className="leave-form"
          onSubmit={handleSubmit}
        >


          {/* EMPLOYEE */}

          <div className="leave-form-group">

            <label>
              Employee
            </label>

            <select
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(
                  e.target.value
                )
              }
              required
              disabled={isSubmitting}
            >

              <option value="">
                Select Employee
              </option>

              {employees.map(
                (employee) => (

                  <option
                    key={employee.id}
                    value={employee.id}
                  >
                    {employee.name}
                  </option>

                )
              )}

            </select>

          </div>


          {/* LEAVE TYPE */}

          <div className="leave-form-group">

            <label>
              Leave Type
            </label>

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(
                  e.target.value
                )
              }
              disabled={isSubmitting}
            >

              <option>
                Casual Leave
              </option>

              <option>
                Sick Leave
              </option>

              <option>
                Annual Leave
              </option>

              <option>
                Unpaid Leave
              </option>

            </select>

          </div>


          {/* START DATE */}

          <div className="leave-form-group">

            <label>
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
              required
              disabled={isSubmitting}
            />

          </div>


          {/* END DATE */}

          <div className="leave-form-group">

            <label>
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
              required
              disabled={isSubmitting}
            />

          </div>


          {/* REASON */}

          <div className="leave-form-group">

            <label>
              Reason
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              placeholder="Enter reason for leave..."
              rows="4"
              required
              disabled={isSubmitting}
            />

          </div>


          {/* BUTTONS */}

          <div className="leave-form-actions">

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="leave-submit-button"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? "Creating..."
                : "Create Request"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}


export default AddLeaveForm;