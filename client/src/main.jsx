import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { EmployeeProvider } from "./context/EmployeeProvider";
import { LeaveProvider } from "./context/LeaveProvider";
import { ActivityProvider } from "./context/ActivityProvider";
import { AttendanceProvider } from "./context/AttendanceProvider";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ActivityProvider>

        <EmployeeProvider>

          <LeaveProvider>

            <AttendanceProvider>

              <App />

            </AttendanceProvider>

          </LeaveProvider>

        </EmployeeProvider>

      </ActivityProvider>
    </BrowserRouter>
  </StrictMode>
);