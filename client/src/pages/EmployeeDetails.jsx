import { useParams } from "react-router-dom";

import { useEmployees } from "../context/useEmployees";

import { useAttendance } from "../context/useAttendance";

import EmployeeHeader from "../components/employee/EmployeeHeader";

import PersonalInfo from "../components/employee/PersonalInfo";

import AttendanceSummary from "../components/employee/AttendanceSummary";

import LeaveSummary from "../components/employee/LeaveSummary";

import RecentActivity from "../components/employee/RecentActivity";

import AttendanceHistory from "../components/attendance/AttendanceHistory";

import LeaveHistory from "../components/employee/LeaveHistory";

import BackButton from "../components/common/BackButton";

import "../styles/employeeDetails.css";


function EmployeeDetails() {

  const { id } = useParams();

  const employeeId = Number(id);


  // =========================
  // CONTEXT DATA
  // =========================

  const { employees } =
    useEmployees();


  const { attendance } =
    useAttendance();


  // =========================
  // FIND EMPLOYEE
  // =========================

  const employee =
    employees.find(
      (employee) =>
        employee.id === employeeId
    );


  // =========================
  // EMPLOYEE NOT FOUND
  // =========================

  if (!employee) {

    return (
      <div className="employee-not-found">

        <h2>
          Employee Not Found
        </h2>

        <p>
          The employee you are looking
          for does not exist.
        </p>

        <BackButton />

      </div>
    );

  }


  // =========================
  // EMPLOYEE ATTENDANCE
  // =========================

  const employeeAttendance =
    attendance.filter(
      (record) =>
        record.employeeId ===
        employeeId
    );


  return (
    <div className="employee-details-page">

      {/* =========================
          BACK BUTTON
      ========================== */}

      <BackButton />


      {/* =========================
          EMPLOYEE HEADER
      ========================== */}

      <EmployeeHeader
        employee={employee}
      />


      {/* =========================
          DETAILS
      ========================== */}

      <div className="details-grid">

        <PersonalInfo
          employee={employee}
        />


        <div>

          <AttendanceSummary
            employeeId={employeeId}
            attendance={
              employeeAttendance
            }
          />


          <LeaveSummary
            employeeId={employeeId}
          />

        </div>

      </div>


      {/* =========================
          ATTENDANCE HISTORY
      ========================== */}

      <AttendanceHistory
        employeeId={employeeId}
        attendance={
          employeeAttendance
        }
      />


      {/* =========================
          LEAVE HISTORY
      ========================== */}

      <LeaveHistory
        employeeId={employeeId}
      />


      {/* =========================
          EMPLOYEE ACTIVITY
      ========================== */}

      <RecentActivity
        employeeId={employeeId}
      />

    </div>
  );
}


export default EmployeeDetails;