import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import EmployeeDetails from "./pages/EmployeeDetails";
import LeaveDetails from "./pages/LeaveDetails";


function App() {
 return (
  <Routes>

    <Route path="/" element={<Login />} />

    <Route element={<MainLayout />}>

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/employees" element={<Employees />} />

      <Route path="/attendance" element={<Attendance />} />

      <Route path="/leaves" element={<Leaves />} />

      <Route path="/reports" element={<Reports />} />

      <Route
        path="/employees/:id"
        element={<EmployeeDetails />}
      />
      <Route
        path="/leaves/:id"
        element={<LeaveDetails />}
      />

    </Route>

    <Route path="*" element={<NotFound />} />

  </Routes>
);
}

export default App;