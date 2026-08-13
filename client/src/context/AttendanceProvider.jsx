import { useState } from "react";

import { initialAttendance } from "../data/attendance";

import { useActivities } from "./useActivities";
import { useEmployees } from "./useEmployees";

import { AttendanceContext } from "./AttendanceContext";

export function AttendanceProvider({ children }) {

  const [attendance, setAttendance] =
    useState(initialAttendance);

  const { addActivity } =
    useActivities();

  const { employees } =
    useEmployees();


  // =========================
  // UPDATE ATTENDANCE
  // =========================

  const updateAttendance = (
    employeeId,
    selectedDate,
    newStatus
  ) => {

    // =========================
    // FIND EMPLOYEE
    // =========================

    const employee =
      employees.find(
        (employee) =>
          employee.id === employeeId
      );


    // =========================
    // UPDATE / CREATE RECORD
    // =========================

    setAttendance(
      (currentAttendance) => {

        const existingRecord =
          currentAttendance.find(
            (record) =>
              record.employeeId ===
                employeeId &&
              record.date ===
                selectedDate
          );


        // =========================
        // UPDATE EXISTING RECORD
        // =========================

        if (existingRecord) {

          return currentAttendance.map(
            (record) => {

              if (
                record.employeeId ===
                  employeeId &&
                record.date ===
                  selectedDate
              ) {

                return {
                  ...record,
                  status: newStatus,
                };

              }

              return record;

            }
          );

        }


        // =========================
        // CREATE NEW RECORD
        // =========================

        const newRecord = {

          id: Date.now(),

          employeeId:
            employeeId,

          date:
            selectedDate,

          status:
            newStatus,

        };


        return [
          ...currentAttendance,
          newRecord,
        ];

      }
    );


    // =========================
    // ADD ACTIVITY
    // =========================

    if (employee) {

      addActivity({

        employeeId:
          employeeId,

        type:
          "attendance-updated",

        message:
          `${employee.name} marked ${newStatus}`,

        icon:
          newStatus === "Present"
            ? "✓"
            : newStatus === "Absent"
              ? "×"
              : newStatus === "Leave"
                ? "•"
                : "◐",

      });

    }

  };


  // =========================
  // CONTEXT
  // =========================

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        updateAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );

}