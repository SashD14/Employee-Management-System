import "../styles/dashboard.css";

import Card from "../components/common/Card";
import DashboardCard from "../components/dashboard/DashboardCard";
import TodayAttendance from "../components/dashboard/TodayAttendance";
import PendingLeaves from "../components/dashboard/PendingLeaves";
import ActivityFeed from "../components/dashboard/ActivityFeed";

import { useLeaves } from "../context/useLeaves";
import { useEmployees } from "../context/useEmployees";
import { useAttendance } from "../context/useAttendance";

import {
  FaUsers,
  FaCalendarCheck,
  FaUserTimes,
  FaPlaneDeparture,
  FaClock,
} from "react-icons/fa";

function Dashboard() {
  // =========================
  // CONTEXT DATA
  // =========================

  const { leaves } = useLeaves();

  const { employees } = useEmployees();

  const { attendance } = useAttendance();

  // =========================
  // DASHBOARD DATE
  // =========================

  /*
   * Our demo attendance data currently
   * contains records up to 2026-08-08.
   *
   * We use the latest attendance date
   * available in the data instead of
   * hardcoding the date in the filter.
   */

  const today =
  new Date().toISOString().split("T")[0];

  // =========================
  // TODAY'S ATTENDANCE
  // =========================

  const todayAttendance =
    attendance.filter(
      (record) =>
        record.date === today &&
        employees.some(
          (employee) =>
            employee.id === record.employeeId
        )
  );

  const presentToday = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentToday = todayAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const leaveToday = todayAttendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const halfDayToday = todayAttendance.filter(
    (record) => record.status === "Half Day"
  ).length;

  // =========================
  // PENDING LEAVES
  // =========================

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  // =========================
  // TOTAL EMPLOYEES
  // =========================

  const totalEmployees = employees.length;

  // =========================
  // RENDER
  // =========================

  return (
    <div className="dashboard-page">

      {/* =========================
          DASHBOARD SUMMARY
      ========================== */}

      <div className="dashboard">

        {/* TOTAL EMPLOYEES */}

        <DashboardCard
          title="Employees"
          count={totalEmployees}
          icon={<FaUsers />}
          change="Total employees"
          positive={true}
        />

        {/* PRESENT TODAY */}

        <Card
          title="Present Today"
          count={presentToday}
          icon={<FaCalendarCheck />}
          change="Employees present"
          positive={true}
        />

        {/* ABSENT TODAY */}

        <Card
          title="Absent Today"
          count={absentToday}
          icon={<FaUserTimes />}
          change="Employees absent"
          positive={false}
        />

        {/* ON LEAVE */}

        <Card
          title="On Leave Today"
          count={leaveToday}
          icon={<FaPlaneDeparture />}
          change="Employees on leave"
          positive={leaveToday === 0}
        />

        {/* HALF DAY TODAY */}

        <Card
          title="Half Day Today"
          count={halfDayToday}
          icon={<FaClock />}
          change="Employees on half day"
          positive={true}
        />

        {/* PENDING LEAVES */}

        <Card
          title="Pending Leaves"
          count={pendingLeaves}
          icon={<FaPlaneDeparture />}
          change="Requests awaiting approval"
          positive={pendingLeaves === 0}
        />

      </div>

      {/* =========================
          TODAY'S ATTENDANCE
      ========================== */}

      <TodayAttendance />

      {/* =========================
          PENDING LEAVE REQUESTS
      ========================== */}

      <PendingLeaves />

      {/* =========================
          RECENT COMPANY ACTIVITY
      ========================== */}

      <ActivityFeed />

    </div>
  );
}

export default Dashboard;