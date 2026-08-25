import "../styles/sidebar.css";

import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaPlaneDeparture,
  FaChartBar,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";


function Sidebar({
  isOpen,
  closeSidebar,
}) {

  // =========================
  // GET LOGGED-IN USER
  // =========================

  const storedUser =
    localStorage.getItem("user");


  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;


  const userRole =
    user?.role;


  // =========================
  // ROLE PERMISSIONS
  // =========================

  const canViewEmployees =
    ["Admin", "HR", "Manager"].includes(
      userRole
    );


  const canViewAttendance =
    [
      "Admin",
      "HR",
      "Manager",
      "Employee",
    ].includes(
      userRole
    );


  const canViewLeaves =
    [
      "Admin",
      "HR",
      "Manager",
      "Employee",
    ].includes(
      userRole
    );


  const canViewReports =
    [
      "Admin",
      "HR",
      "Manager",
    ].includes(
      userRole
    );


  return (

    <aside
      className={`sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >

      <ul>


        {/* DASHBOARD */}

        <li>

          <NavLink to="/dashboard"
          onClick={closeSidebar}>

            <FaHome />

            Dashboard

          </NavLink>

        </li>


        {/* EMPLOYEES */}

        {canViewEmployees && (

          <li>

            <NavLink to="/employees"
            onClick={closeSidebar}>

              <FaUsers />

              Employees

            </NavLink>

          </li>

        )}


        {/* ATTENDANCE */}

        {canViewAttendance && (

          <li>

            <NavLink to="/attendance"
            onClick={closeSidebar}>

              <FaCalendarCheck />

              Attendance

            </NavLink>

          </li>

        )}


        {/* LEAVES */}

        {canViewLeaves && (

          <li>

            <NavLink to="/leaves"
            onClick={closeSidebar}>

              <FaPlaneDeparture />

              Leaves

            </NavLink>

          </li>

        )}


        {/* REPORTS */}

        {canViewReports && (

          <li>

            <NavLink to="/reports"
            onClick={closeSidebar}>
            

              <FaChartBar />

              Reports

            </NavLink>

          </li>

        )}

      </ul>

    </aside>

  );

}


export default Sidebar;