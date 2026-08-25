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

  const { leaves } =
    useLeaves();


  const { employees } =
    useEmployees();


  const { attendance } =
    useAttendance();


  // =========================
  // TODAY'S DATE
  // =========================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  // =========================
  // TODAY'S ATTENDANCE
  // =========================

  const todayAttendance =
    attendance.filter(
      (record) =>
        record.date === today
    );


  // =========================
  // PRESENT TODAY
  // =========================

  const presentToday =
    todayAttendance.filter(
      (record) =>
        record.status === "Present"
    ).length;


  // =========================
  // ABSENT TODAY
  // =========================

  const absentToday =
    todayAttendance.filter(
      (record) =>
        record.status === "Absent"
    ).length;


  // =========================
  // ON LEAVE TODAY
  // =========================

  const leaveToday =
    todayAttendance.filter(
      (record) =>
        record.status === "Leave"
    ).length;


  // =========================
  // HALF DAY TODAY
  // =========================

  const halfDayToday =
    todayAttendance.filter(
      (record) =>
        record.status === "Half Day"
    ).length;


  // =========================
  // PENDING LEAVES
  // =========================

  const pendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;


  // =========================
  // TOTAL EMPLOYEES
  // =========================

  const totalEmployees =
    isEmployee
      ? 1
      : employees.length;


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
          title={
            isEmployee
              ? "My Profile"
              : "Employees"
          }
          count={totalEmployees}
          icon={<FaUsers />}
          change={
            isEmployee
              ? "Your employee account"
              : "Total employees"
          }
          positive={true}
        />


        {/* PRESENT */}

        <Card
          title={
            isEmployee
              ? "My Attendance"
              : "Present Today"
          }
          count={presentToday}
          icon={<FaCalendarCheck />}
          change={
            isEmployee
              ? "Present today"
              : "Employees present"
          }
          positive={true}
        />


        {/* ABSENT */}

        <Card
          title={
            isEmployee
              ? "My Absence"
              : "Absent Today"
          }
          count={absentToday}
          icon={<FaUserTimes />}
          change={
            isEmployee
              ? "Absent today"
              : "Employees absent"
          }
          positive={false}
        />


        {/* ON LEAVE */}

        <Card
          title={
            isEmployee
              ? "My Leave"
              : "On Leave Today"
          }
          count={leaveToday}
          icon={<FaPlaneDeparture />}
          change={
            isEmployee
              ? "Leave status today"
              : "Employees on leave"
          }
          positive={leaveToday === 0}
        />


        {/* HALF DAY */}

        <Card
          title={
            isEmployee
              ? "My Half Day"
              : "Half Day Today"
          }
          count={halfDayToday}
          icon={<FaClock />}
          change={
            isEmployee
              ? "Half day status"
              : "Employees on half day"
          }
          positive={true}
        />


        {/* PENDING LEAVES */}

        <Card
          title={
            isEmployee
              ? "Pending Requests"
              : "Pending Leaves"
          }
          count={pendingLeaves}
          icon={<FaPlaneDeparture />}
          change={
            isEmployee
              ? "Your requests awaiting approval"
              : "Requests awaiting approval"
          }
          positive={pendingLeaves === 0}
        />


      </div>


      {/* =========================
          TODAY'S ATTENDANCE
      ========================== */}

      <TodayAttendance />


      {/* =========================
          PENDING LEAVES
      ========================== */}

      <PendingLeaves />


      {/* =========================
          RECENT ACTIVITY
      ========================== */}

      <ActivityFeed />


    </div>

  );

}


export default Dashboard;