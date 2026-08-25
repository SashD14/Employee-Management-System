import { useState } from "react";

import "../styles/reports.css";

import {
  FaUsers,
  FaCalendarCheck,
  FaUserTimes,
  FaPlaneDeparture,
  FaClock,
  FaHourglassHalf,
  FaChartLine,
} from "react-icons/fa";

import { useEmployees } from "../context/useEmployees";
import { useAttendance } from "../context/useAttendance";
import { useLeaves } from "../context/useLeaves";

import AttendanceChart from "../components/reports/AttendanceChart";
import LeaveChart from "../components/reports/LeaveChart";

import ExportReportButton from "../components/reports/ExportReportButton";
import ExportLeaveReportButton from "../components/reports/ExportLeaveReportButton";

import ReportStatCard from "../components/reports/ReportStatCard";
import ReportFilters from "../components/reports/ReportFilters";

import EmployeeAttendanceReport from "../components/reports/EmployeeAttendanceReport";
import LeaveReport from "../components/reports/LeaveReport";


function Reports() {

  // =========================
  // CONTEXT DATA
  // =========================

  const {
    employees,
  } = useEmployees();


  const {
    attendance,
  } = useAttendance();


  const {
    leaves,
  } = useLeaves();


  // =========================
  // FILTER STATE
  // =========================

  const [employeeFilter, setEmployeeFilter] =
    useState("All");


  const [departmentFilter, setDepartmentFilter] =
    useState("All");


  const [periodFilter, setPeriodFilter] =
    useState("All Time");


  // =========================
  // EMPLOYEE OPTIONS
  // =========================

  const employeeOptions = [

    "All",

    ...new Set(
      employees
        .map(
          (employee) =>
            employee.name
        )
        .filter(Boolean)
    ),

  ];


  // =========================
  // DEPARTMENT OPTIONS
  // =========================

  const departmentOptions = [

    "All",

    ...new Set(
      employees
        .map(
          (employee) =>
            employee.department
        )
        .filter(Boolean)
    ),

  ];


  // =========================
  // FILTER EMPLOYEES
  // =========================

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const matchesEmployee =
          employeeFilter === "All" ||
          employee.name ===
            employeeFilter;


        const matchesDepartment =
          departmentFilter === "All" ||
          employee.department ===
            departmentFilter;


        return (
          matchesEmployee &&
          matchesDepartment
        );

      }
    );


  // =========================
  // GET LATEST ATTENDANCE DATE
  // =========================

  const attendanceDates =
    attendance
      .map(
        (record) =>
          record.date
      )
      .filter(Boolean);


  const latestAttendanceDate =
    attendanceDates.length > 0
      ? [...attendanceDates]
          .sort()
          .at(-1)
      : null;


  // =========================
  // REPORT DATE
  //
  // Use the latest date available
  // in attendance data.
  //
  // If there is no attendance,
  // use today's date.
  // =========================

  const reportDateString =
    latestAttendanceDate ||
    new Date()
      .toISOString()
      .split("T")[0];


  const reportDate =
    new Date(
      `${reportDateString}T23:59:59`
    );


  // =========================
  // START OF WEEK
  // =========================

  const startOfWeek =
    new Date(reportDate);


  const day =
    startOfWeek.getDay();


  const difference =
    day === 0
      ? 6
      : day - 1;


  startOfWeek.setDate(
    startOfWeek.getDate() -
      difference
  );


  startOfWeek.setHours(
    0,
    0,
    0,
    0
  );


  // =========================
  // START OF MONTH
  // =========================

  const startOfMonth =
    new Date(
      reportDate.getFullYear(),
      reportDate.getMonth(),
      1
    );


  startOfMonth.setHours(
    0,
    0,
    0,
    0
  );


  // =========================
  // FILTER ATTENDANCE
  // =========================

  const filteredAttendance =
    attendance.filter(
      (record) => {

        // =========================
        // FIND EMPLOYEE
        // =========================

        const employee =
          employees.find(
            (employee) =>
              employee.id ===
              record.employeeId
          );


        // Don't include attendance
        // for deleted employees

        if (!employee) {
          return false;
        }


        // =========================
        // EMPLOYEE FILTER
        // =========================

        const matchesEmployee =
          employeeFilter === "All" ||
          employee.name ===
            employeeFilter;


        // =========================
        // DEPARTMENT FILTER
        // =========================

        const matchesDepartment =
          departmentFilter === "All" ||
          employee.department ===
            departmentFilter;


        // =========================
        // PERIOD FILTER
        // =========================

        let matchesPeriod = true;


        if (!record.date) {

          matchesPeriod = false;

        }


        const recordDate =
          record.date
            ? new Date(
                `${record.date}T00:00:00`
              )
            : null;


        // =========================
        // TODAY
        // =========================

        if (
          periodFilter === "Today"
        ) {

          matchesPeriod =
            record.date ===
            reportDateString;

        }


        // =========================
        // THIS WEEK
        // =========================

        if (
          periodFilter ===
          "This Week"
        ) {

          matchesPeriod =
            recordDate &&
            recordDate >=
              startOfWeek &&
            recordDate <=
              reportDate;

        }


        // =========================
        // THIS MONTH
        // =========================

        if (
          periodFilter ===
          "This Month"
        ) {

          matchesPeriod =
            recordDate &&
            recordDate >=
              startOfMonth &&
            recordDate <=
              reportDate;

        }


        return (
          matchesEmployee &&
          matchesDepartment &&
          matchesPeriod
        );

      }
    );


  // =========================
  // FILTER LEAVES
  // =========================

  const filteredLeaves =
    leaves.filter(
      (leave) => {

        // =========================
        // FIND EMPLOYEE
        // =========================

        const employee =
          employees.find(
            (employee) =>
              employee.id ===
              leave.employeeId
          );


        // Don't include leaves
        // of deleted employees

        if (!employee) {
          return false;
        }


        // =========================
        // EMPLOYEE FILTER
        // =========================

        const matchesEmployee =
          employeeFilter === "All" ||
          employee.name ===
            employeeFilter;


        // =========================
        // DEPARTMENT FILTER
        // =========================

        const matchesDepartment =
          departmentFilter === "All" ||
          employee.department ===
            departmentFilter;


        // =========================
        // PERIOD FILTER
        // =========================

        let matchesPeriod = true;


        const leaveStartDate =
          leave.startDate
            ? new Date(
                `${leave.startDate}T00:00:00`
              )
            : null;


        // =========================
        // TODAY
        // =========================

        if (
          periodFilter === "Today"
        ) {

          matchesPeriod =
            leave.startDate ===
            reportDateString;

        }


        // =========================
        // THIS WEEK
        // =========================

        if (
          periodFilter ===
          "This Week"
        ) {

          matchesPeriod =
            leaveStartDate &&
            leaveStartDate >=
              startOfWeek &&
            leaveStartDate <=
              reportDate;

        }


        // =========================
        // THIS MONTH
        // =========================

        if (
          periodFilter ===
          "This Month"
        ) {

          matchesPeriod =
            leaveStartDate &&
            leaveStartDate >=
              startOfMonth &&
            leaveStartDate <=
              reportDate;

        }


        return (
          matchesEmployee &&
          matchesDepartment &&
          matchesPeriod
        );

      }
    );


  // =========================
  // ATTENDANCE STATISTICS
  // =========================

  const presentCount =
    filteredAttendance.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;


  const absentCount =
    filteredAttendance.filter(
      (record) =>
        record.status ===
        "Absent"
    ).length;


  const leaveCount =
    filteredAttendance.filter(
      (record) =>
        record.status ===
        "Leave"
    ).length;


  const halfDayCount =
    filteredAttendance.filter(
      (record) =>
        record.status ===
        "Half Day"
    ).length;


  // =========================
  // PENDING LEAVE COUNT
  // =========================

  const pendingLeaveCount =
    filteredLeaves.filter(
      (leave) =>
        leave.status ===
        "Pending"
    ).length;


  // =========================
  // MARKED ATTENDANCE
  // =========================

  const markedAttendance =
    filteredAttendance.filter(
      (record) =>
        record.status ===
          "Present" ||
        record.status ===
          "Absent" ||
        record.status ===
          "Leave" ||
        record.status ===
          "Half Day"
    );


  // =========================
  // ATTENDANCE RATE
  // =========================

  const attendanceRate =
    markedAttendance.length === 0
      ? 0
      : Math.round(
          (
            presentCount /
            markedAttendance.length
          ) * 100
        );


  // =========================
  // RENDER
  // =========================

  return (

    <div className="reports-page">


      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="reports-header">

        <div>

          <h1>
            Reports
          </h1>

          <p>
            View attendance, leave,
            and employee reports.
          </p>

        </div>


        <div className="reports-reference-date">

          Report date:{" "}

          {formatDate(
            reportDateString
          )}

        </div>

      </div>


      {/* =========================
          REPORT FILTERS
      ========================== */}

      <ReportFilters

        employeeFilter={
          employeeFilter
        }

        setEmployeeFilter={
          setEmployeeFilter
        }


        departmentFilter={
          departmentFilter
        }

        setDepartmentFilter={
          setDepartmentFilter
        }


        periodFilter={
          periodFilter
        }

        setPeriodFilter={
          setPeriodFilter
        }


        employeeOptions={
          employeeOptions
        }

        departmentOptions={
          departmentOptions
        }

      />


      {/* =========================
          EXPORT ACTIONS
      ========================== */}

      <div className="report-actions">

        <ExportReportButton

          employees={
            filteredEmployees
          }

          attendance={
            filteredAttendance
          }

        />


        <ExportLeaveReportButton
          employees={filteredEmployees}
          leaves={filteredLeaves}
        />

      </div>


      {/* =========================
          REPORT STATISTICS
      ========================== */}

      <div className="report-stats">


        <ReportStatCard

          title="Total Employees"

          value={
            filteredEmployees.length
          }

          icon={<FaUsers />}

          variant="employees"

        />


        <ReportStatCard

          title="Present"

          value={presentCount}

          icon={<FaCalendarCheck />}

          variant="present"

        />


        <ReportStatCard

          title="Absent"

          value={absentCount}

          icon={<FaUserTimes />}

          variant="absent"

        />


        <ReportStatCard

          title="On Leave"

          value={leaveCount}

          icon={<FaPlaneDeparture />}

          variant="leave"

        />


        <ReportStatCard

          title="Half Day"

          value={halfDayCount}

          icon={<FaClock />}

          variant="half-day"

        />


        <ReportStatCard

          title="Pending Requests"

          value={pendingLeaveCount}

          icon={<FaHourglassHalf />}

          variant="pending"

        />


        <ReportStatCard

          title="Attendance Rate"

          value={`${attendanceRate}%`}

          icon={<FaChartLine />}

          variant="rate"

        />


      </div>


      {/* =========================
          EMPLOYEE ATTENDANCE
      ========================== */}

      <EmployeeAttendanceReport

        employees={
          filteredEmployees
        }

        attendance={
          filteredAttendance
        }

      />


      {/* =========================
          CHARTS
      ========================== */}

      <div className="report-charts">


        <AttendanceChart

          attendance={
            filteredAttendance
          }

        />


        <LeaveChart

          employees={
            filteredEmployees
          }

          leaves={
            filteredLeaves
          }

        />


      </div>


      {/* =========================
          LEAVE REPORT
      ========================== */}

      <LeaveReport

        employees={
          filteredEmployees
        }

        leaves={
          filteredLeaves
        }

      />


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


export default Reports;