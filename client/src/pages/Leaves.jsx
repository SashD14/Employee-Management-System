import { useState } from "react";

import LeaveStatCard from "../components/leave/LeaveStatCard";
import LeaveSearch from "../components/leave/LeaveSearch";
import LeaveTable from "../components/leave/LeaveTable";
import FilterDropdown from "../components/common/FilterDropdown";

import { useLeaves } from "../context/useLeaves";
import { useEmployees } from "../context/useEmployees";

import "../styles/leaves.css";


function Leaves() {

  // =========================
  // FILTER STATE
  // =========================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [employeeFilter, setEmployeeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [leaveTypeFilter, setLeaveTypeFilter] =
    useState("All");


  // =========================
  // CONTEXT DATA
  // =========================

  const {
    leaves,
    updateLeaveStatus,
  } = useLeaves();


  const {
    employees,
  } = useEmployees();


  // =========================
  // LEAVE STATISTICS
  // =========================

  const pendingCount =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;


  const approvedCount =
    leaves.filter(
      (leave) =>
        leave.status === "Approved"
    ).length;


  const rejectedCount =
    leaves.filter(
      (leave) =>
        leave.status === "Rejected"
    ).length;


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
  // LEAVE TYPE OPTIONS
  // =========================

  const leaveTypeOptions = [
    "All",
    ...new Set(
      leaves.map(
        (leave) =>
          leave.leaveType
      )
    ),
  ];


  // =========================
  // FILTER LEAVES
  // =========================

  const filteredLeaves =
    leaves.filter((leave) => {


      // =========================
      // SEARCH
      // =========================

      const searchText =
        searchTerm
          .toLowerCase()
          .trim();


      const matchesSearch =
        leave.employeeName
          .toLowerCase()
          .includes(searchText);


      // =========================
      // EMPLOYEE FILTER
      // =========================

      const matchesEmployee =
        employeeFilter === "All" ||
        leave.employeeName ===
          employeeFilter;


      // =========================
      // STATUS FILTER
      // =========================

      const matchesStatus =
        statusFilter === "All" ||
        leave.status ===
          statusFilter;


      // =========================
      // LEAVE TYPE FILTER
      // =========================

      const matchesLeaveType =
        leaveTypeFilter === "All" ||
        leave.leaveType ===
          leaveTypeFilter;


      return (
        matchesSearch &&
        matchesEmployee &&
        matchesStatus &&
        matchesLeaveType
      );

    });


  // =========================
  // RENDER
  // =========================

  return (

    <div className="leaves-page">


      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="leaves-header">

        <div>

          <h1>
            Leaves
          </h1>

          <p>
            Manage employee leave
            requests and approvals.
          </p>

        </div>

      </div>


      {/* =========================
          LEAVE STATISTICS
      ========================== */}

      <div className="leave-stats">

        <LeaveStatCard
          title="Pending"
          value={pendingCount}
        />

        <LeaveStatCard
          title="Approved"
          value={approvedCount}
        />

        <LeaveStatCard
          title="Rejected"
          value={rejectedCount}
        />

      </div>


      {/* =========================
          SEARCH AND FILTERS
      ========================== */}

      <div className="leave-controls">


        <LeaveSearch
          searchTerm={searchTerm}
          setSearchTerm={
            setSearchTerm
          }
        />


        {/* Employee Filter */}

        <FilterDropdown
          value={employeeFilter}
          setValue={
            setEmployeeFilter
          }
          options={
            employeeOptions
          }
        />


        {/* Status Filter */}

        <FilterDropdown
          value={statusFilter}
          setValue={
            setStatusFilter
          }
          options={[
            "All",
            "Pending",
            "Approved",
            "Rejected",
          ]}
        />


        {/* Leave Type Filter */}

        <FilterDropdown
          value={leaveTypeFilter}
          setValue={
            setLeaveTypeFilter
          }
          options={
            leaveTypeOptions
          }
        />

      </div>


      {/* =========================
          RESULTS COUNT
      ========================== */}

      <div className="leave-results-header">

        <h2>
          Leave Requests
        </h2>

        <span>
          {filteredLeaves.length}{" "}
          of{" "}
          {leaves.length} requests
        </span>

      </div>


      {/* =========================
          LEAVE TABLE
      ========================== */}

      <LeaveTable
        leaves={
          filteredLeaves
        }
        onUpdateStatus={
          updateLeaveStatus
        }
      />

    </div>

  );
}


export default Leaves;