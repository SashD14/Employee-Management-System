import { useNavigate } from "react-router-dom";

import { useEmployees } from "../../context/useEmployees";
import { useAttendance } from "../../context/useAttendance";

import "../../styles/todayAttendance.css";


function TodayAttendance() {

  const navigate =
    useNavigate();


  // =========================
  // GET LOGGED-IN USER
  // =========================

  const storedUser =
    localStorage.getItem("user");


  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;


  const isEmployee =
    user?.role === "Employee";


  // =========================
  // CONTEXT DATA
  // =========================

  const { employees } =
    useEmployees();


  const { attendance } =
    useAttendance();


  // =========================
  // GET TODAY'S DATE
  // =========================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  // =========================
  // EMPLOYEE VIEW
  // =========================

  const employeeTodayAttendance =
    attendance.find(
      (record) =>
        record.date === today
    );


  // =========================
  // ADMIN / HR / MANAGER VIEW
  // =========================

  const todayEmployeeAttendance =
    employees.map((employee) => {

      const attendanceRecord =
        attendance.find(
          (record) =>
            record.employeeId ===
              employee.id &&
            record.date === today
        );


      return {

        employee,

        status:
          attendanceRecord?.status ||
          "Not Marked",

      };

    });


  // =========================
  // SHOW ONLY FIRST 5
  // =========================

  const displayedAttendance =
    todayEmployeeAttendance.slice(0, 5);


  // =========================
  // FORMAT DATE
  // =========================

  function formatDate(dateString) {

    if (!dateString) {
      return "";
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

    <section className="today-attendance">


      {/* =========================
          HEADER
      ========================== */}

      <div className="today-attendance-header">

        <div>

          <h2>

            {isEmployee
              ? "My Attendance"
              : "Today's Attendance"}

          </h2>


          <p>

            {isEmployee
              ? "Your attendance status for today"
              : "Attendance overview for today"}

          </p>

        </div>


        <span className="attendance-date">

          {formatDate(today)}

        </span>

      </div>


      {/* =========================
          EMPLOYEE VIEW
      ========================== */}

      {isEmployee ? (

        <div className="attendance-list">


          <div className="attendance-row">


            {/* EMPLOYEE INFORMATION */}

            <div className="attendance-employee">

              <div className="attendance-avatar">

                {user?.name
                  ?.charAt(0)
                  .toUpperCase()}

              </div>


              <div>

                <h3>

                  {user?.name}

                </h3>


                <p>

                  Employee

                </p>

              </div>

            </div>


            {/* STATUS */}

            <span
              className={
                `attendance-status ${
                  (
                    employeeTodayAttendance?.status ||
                    "Not Marked"
                  )
                    .toLowerCase()
                    .replace(" ", "-")
                }`
              }
            >

              {employeeTodayAttendance?.status ||
                "Not Marked"}

            </span>


          </div>


        </div>

      ) : (

        /* =========================
            ADMIN / HR / MANAGER VIEW
        ========================== */

        <div className="attendance-list">


          {displayedAttendance.length > 0 ? (

            displayedAttendance.map(
              ({ employee, status }) => (

                <div
                  className="attendance-row"
                  key={employee.id}
                >


                  {/* EMPLOYEE INFORMATION */}

                  <div className="attendance-employee">

                    <div className="attendance-avatar">

                      {employee.name
                        ?.charAt(0)
                        .toUpperCase()}

                    </div>


                    <div>

                      <h3>

                        {employee.name}

                      </h3>


                      <p>

                        {employee.role}

                      </p>

                    </div>

                  </div>


                  {/* STATUS */}

                  <span
                    className={
                      `attendance-status ${
                        status
                          .toLowerCase()
                          .replace(" ", "-")
                      }`
                    }
                  >

                    {status}

                  </span>


                </div>

              )
            )

          ) : (

            <p className="no-attendance">

              No employees available.

            </p>

          )}


        </div>

      )}


      {/* =========================
          FOOTER
      ========================== */}

      <div className="attendance-footer">

        <span>

          {isEmployee
            ? "Showing your attendance"
            : employees.length === 0
              ? "No employees"
              : employees.length <= 5
                ? `Showing ${employees.length} of ${employees.length} employees`
                : `Showing 5 of ${employees.length} employees`}

        </span>


        <button
          type="button"
          onClick={() =>
            navigate("/attendance")
          }
        >

          View All

        </button>

      </div>


    </section>

  );

}


export default TodayAttendance;