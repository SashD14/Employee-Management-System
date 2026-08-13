import "../styles/sidebar.css";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaPlaneDeparture,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
  <NavLink to="/dashboard">
    <FaHome />
    Dashboard
  </NavLink>
</li>

<li>
  <NavLink to="/employees">
    <FaUsers />
    Employees
  </NavLink>
</li>

<li>
  <NavLink to="/attendance">
    <FaCalendarCheck />
    Attendance
  </NavLink>
</li>

<li>
  <NavLink to="/leaves">
    <FaPlaneDeparture />
    Leaves
  </NavLink>
</li>

<li>
  <NavLink to="/reports">
    <FaChartBar />
    Reports
  </NavLink>
</li>
      </ul>
    </aside>
  );
}

export default Sidebar;