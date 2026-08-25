import { useState } from "react";

import { useEmployees } from "../context/useEmployees";
import { useAttendance } from "../context/useAttendance";

import AttendanceStatCard from "../components/attendance/AttendanceStatCard";
import AttendanceSearch from "../components/attendance/AttendanceSearch";
import AttendanceTable from "../components/attendance/AttendanceTable";
import FilterDropdown from "../components/common/FilterDropdown";

import "../styles/attendance.css";


function Attendance() {

  // =========================
  // TODAY'S DATE
  // =========================

  const getTodayDate = () => {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;

  };


  // =========================
  // EMPLOYEES
  // =========================

  const {
    employees,
  } = useEmployees();


  // =========================
  // ATTENDANCE
  // =========================

  const {
    attendance,
    updateAttendance,
  } = useAttendance();


  // =========================
  // SELECTED DATE
  // =========================

  // Automatically select today's date
  // when the Attendance page opens

  const [selectedDate, setSelectedDate] =
    useState(
      getTodayDate
    );


  // =========================
  // FILTER STATE
  // =========================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");


  // =========================
  // AVAILABLE DATES
  // =========================

  const today =
    getTodayDate();


  const availableDates = [
    ...new Set([
      today,
      ...attendance
        .map(
          (record) =>
            record.date
        )
        .filter(Boolean),
    ]),
  ].sort(
    (a, b) =>
      b.localeCompare(a)
  );


  // =========================
  // ATTENDANCE FOR
  // SELECTED DATE
  // =========================

  const selectedDateAttendance =
    attendance.filter(
      (record) =>
        record.date === selectedDate &&
        employees.some(
          (employee) =>
            employee.id ===
            record.employeeId
        )
    );


  // =========================
  // STATISTICS
  // =========================

  const presentCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status ===
        "Present"
    ).length;


  const absentCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status ===
        "Absent"
    ).length;


  const leaveCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status ===
        "Leave"
    ).length;


  const halfDayCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status ===
        "Half Day"
    ).length;


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
  // HANDLE DATE CHANGE
  // =========================

  function handleDateChange(newDate) {

    setSelectedDate(
      newDate
    );

    // Reset filters when changing date

    setStatusFilter(
      "All"
    );

  }


  // =========================
  // RENDER
  // =========================

  return (

    <div className="attendance-page">


      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="attendance-page-header">

        <div>

          <h1>
            Attendance
          </h1>

          <p>
            Manage and track employee
            attendance.
          </p>

        </div>


        {/* =========================
            DATE SELECTOR
        ========================== */}

        <div className="attendance-date-selector">

          <label
            htmlFor="attendance-date"
          >
            Attendance Date
          </label>


          <select
            id="attendance-date"
            value={selectedDate}
            onChange={(e) =>
              handleDateChange(
                e.target.value
              )
            }
          >

            {availableDates.map(
              (date) => (

                <option
                  key={date}
                  value={date}
                >
                  {formatDate(date)}
                </option>

              )
            )}

          </select>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================== */}

      <div className="attendance-stats">

        <AttendanceStatCard
          title="Present"
          value={presentCount}
        />


        <AttendanceStatCard
          title="Absent"
          value={absentCount}
        />


        <AttendanceStatCard
          title="Leave"
          value={leaveCount}
        />


        <AttendanceStatCard
          title="Half Day"
          value={halfDayCount}
        />

      </div>


      {/* =========================
          SEARCH
      ========================== */}

      <AttendanceSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


      {/* =========================
          FILTERS
      ========================== */}

      <div className="attendance-filters">

        <FilterDropdown
          value={statusFilter}
          setValue={setStatusFilter}
          options={[
            "All",
            "Present",
            "Absent",
            "Leave",
            "Half Day",
            "Not Marked",
          ]}
        />


        <FilterDropdown
          value={departmentFilter}
          setValue={setDepartmentFilter}
          options={departmentOptions}
        />

      </div>


      {/* =========================
          ATTENDANCE TABLE
      ========================== */}

      <AttendanceTable
        employees={employees}
        attendance={selectedDateAttendance}
        selectedDate={selectedDate}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        departmentFilter={departmentFilter}
        onUpdateAttendance={updateAttendance}
      />

    </div>

  );

}


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


export default Attendance;