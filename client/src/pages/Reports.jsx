import { useState } from "react";

import "../styles/reports.css";

import { useEmployees } from "../context/useEmployees";
import { useAttendance } from "../context/useAttendance";
import { useLeaves } from "../context/useLeaves";

import AttendanceChart from "../components/reports/AttendanceChart";
import LeaveChart from "../components/reports/LeaveChart";

import ExportReportButton from "../components/reports/ExportReportButton";

import ReportStatCard from "../components/reports/ReportStatCard";
import ReportFilters from "../components/reports/ReportFilters";

import EmployeeAttendanceReport from "../components/reports/EmployeeAttendanceReport";
import LeaveReport from "../components/reports/LeaveReport";

import ExportLeaveReportButton from "../components/reports/ExportLeaveReportButton";


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
      employees.map(
        (employee) =>
          employee.name
      )
    ),
  ];


  // =========================
  // DEPARTMENT OPTIONS
  // =========================

  const departmentOptions = [
    "All",

    ...new Set(
      employees.map(
        (employee) =>
          employee.department
      )
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
  // DATE INFORMATION
  // =========================

  const today =
    new Date();


  const todayString =
    today
      .toISOString()
      .split("T")[0];


  const startOfWeek =
    new Date(today);


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


  const startOfMonth =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      1
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


        // =========================
        // EMPLOYEE FILTER
        // =========================

        const matchesEmployee =
          employeeFilter === "All" ||
          employee?.name ===
            employeeFilter;


        // =========================
        // DEPARTMENT FILTER
        // =========================

        const matchesDepartment =
          departmentFilter === "All" ||
          employee?.department ===
            departmentFilter;


        // =========================
        // PERIOD FILTER
        // =========================

        let matchesPeriod = true;


        const recordDate =
          new Date(
            `${record.date}T00:00:00`
          );


        if (
          periodFilter === "Today"
        ) {

          matchesPeriod =
            record.date ===
            todayString;

        }


        if (
          periodFilter ===
          "This Week"
        ) {

          matchesPeriod =
            recordDate >=
              startOfWeek &&
            recordDate <=
              today;

        }


        if (
          periodFilter ===
          "This Month"
        ) {

          matchesPeriod =
            recordDate >=
              startOfMonth &&
            recordDate <=
              today;

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


        // =========================
        // EMPLOYEE FILTER
        // =========================

        const matchesEmployee =
          employeeFilter === "All" ||
          employee?.name ===
            employeeFilter;


        // =========================
        // DEPARTMENT FILTER
        // =========================

        const matchesDepartment =
          departmentFilter === "All" ||
          employee?.department ===
            departmentFilter;


        return (
          matchesEmployee &&
          matchesDepartment
        );

      }
    );


  // =========================
  // ATTENDANCE RATE
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


  const presentRecords =
    filteredAttendance.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;


  const attendanceRate =
    markedAttendance.length === 0
      ? 0
      : Math.round(
          (
            presentRecords /
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

      <h1>
        Reports
      </h1>


      <div className="reports-header">

        <p>
          View attendance, leave,
          and employee reports.
        </p>

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

          employees={
            filteredEmployees
          }

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

        />


        <ReportStatCard

          title="Active Employees"

          value={
            filteredEmployees.filter(
              (employee) =>
                employee.status ===
                "Active"
            ).length
          }

        />


        <ReportStatCard

          title="Attendance Rate"

          value={
            `${attendanceRate}%`
          }

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


export default Reports;