import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EmployeeDetails from "./pages/EmployeeDetails";
import LeaveDetails from "./pages/LeaveDetails";


function App() {

  return (

    <Routes>


      {/* =========================
          LOGIN
      ========================== */}

      <Route
        path="/"
        element={<Login />}
      />


      {/* =========================
          PROTECTED APPLICATION
      ========================== */}

      <Route
        element={<ProtectedRoute />}
      >

        <Route
          element={<MainLayout />}
        >


          {/* =========================
              DASHBOARD
              ALL LOGGED-IN USERS
          ========================== */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* =========================
              EMPLOYEES
              ADMIN + HR
          ========================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "HR",
                  "Manager",


                ]}
              />
            }
          >

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/employees/:id"
              element={<EmployeeDetails />}
            />

          </Route>


          {/* =========================
              ATTENDANCE
              ADMIN + HR + MANAGER
          ========================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "HR",
                  "Manager",
                  "Employee",
                ]}
              />
            }
          >

            <Route
              path="/attendance"
              element={<Attendance />}
            />

          </Route>


          {/* =========================
              LEAVES
              ADMIN + HR + MANAGER
          ========================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "HR",
                  "Manager",
                  "Employee",
                ]}
              />
            }
          >

            <Route
              path="/leaves"
              element={<Leaves />}
            />

            <Route
              path="/leaves/:id"
              element={<LeaveDetails />}
            />

          </Route>


          {/* =========================
              REPORTS
              ADMIN + HR + MANAGER
          ========================== */}

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Admin",
                  "HR",
                  "Manager",
                ]}
              />
            }
          >

            <Route
              path="/reports"
              element={<Reports />}
            />

          </Route>


          {/* =========================
              SETTINGS
              ALL LOGGED-IN USERS
          ========================== */}

          <Route
            path="/settings"
            element={<Settings />}
          />


        </Route>

      </Route>


      {/* =========================
          NOT FOUND
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />


    </Routes>

  );

}


export default App;