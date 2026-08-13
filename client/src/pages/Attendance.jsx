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

  const [selectedDate, setSelectedDate] =
    useState("2026-08-08");


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

  // =========================
// AVAILABLE DATES
// =========================

    const today =
      new Date().toISOString().split("T")[0];

    const availableDates = [
      ...new Set([
        today,
        ...attendance.map(
          (record) => record.date
        ),
      ]),
    ].sort(
      (a, b) =>
        b.localeCompare(a)
    );


  // =========================
  // MAKE SURE SELECTED DATE
  // EXISTS IN DATE LIST
  // =========================

  const datesToDisplay =
    availableDates.includes(
      selectedDate
    )
      ? availableDates
      : [
          selectedDate,
          ...availableDates,
        ];


  // =========================
  // ATTENDANCE FOR SELECTED DATE
  // =========================

  const selectedDateAttendance =
    attendance.filter(
      (record) =>
        record.date === selectedDate &&
        employees.some(
          (employee) =>
            employee.id === record.employeeId
        )
  );


  // =========================
  // STATISTICS
  // =========================

  const presentCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "Present"
    ).length;


  const absentCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "Absent"
    ).length;


  const leaveCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "Leave"
    ).length;


  const halfDayCount =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "Half Day"
    ).length;


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
  // RESET STATUS FILTER
  // =========================

  function handleDateChange(newDate) {

    setSelectedDate(newDate);

    /*
     * Reset the status filter when
     * changing dates.
     *
     * This prevents a previous filter
     * from making the new date appear
     * empty unexpectedly.
     */

    setStatusFilter("All");

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

            {datesToDisplay.map(
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
        attendance={
          selectedDateAttendance
        }
        selectedDate={selectedDate}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        departmentFilter={
          departmentFilter
        }
        onUpdateAttendance={
          updateAttendance
        }
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