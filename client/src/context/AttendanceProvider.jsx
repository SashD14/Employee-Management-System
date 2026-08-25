import { useEffect, useState } from "react";

import api from "../api/api";

import { AttendanceContext } from "./AttendanceContext";
import { useActivities } from "./useActivities";


export function AttendanceProvider({ children }) {

  // =========================
  // ATTENDANCE STATE
  // =========================

  const [attendance, setAttendance] =
    useState([]);


  // =========================
  // ACTIVITIES
  // =========================

  const { fetchActivities } =
    useActivities();


  // =========================
  // FETCH ATTENDANCE
  // =========================

  useEffect(() => {

    const loadAttendance = async () => {

      try {

        const response =
          await api.get("/attendance");


        const formattedAttendance =
          response.data.map(
            (record) => ({

              id:
                record.id,

              employeeId:
                record.employee_id,

              date:
                record.date,

              status:
                record.status,

            })
          );


        setAttendance(
          formattedAttendance
        );

      } catch (error) {

        console.error(
          "Failed to fetch attendance:",
          error.response?.data ||
          error.message
        );

      }

    };


    loadAttendance();

  }, []);


  // =========================
  // UPDATE ATTENDANCE
  // =========================

  const updateAttendance = async (
    employeeId,
    selectedDate,
    newStatus
  ) => {

    try {


      // =========================
      // FIND EXISTING RECORD
      // =========================

      const existingRecord =
        attendance.find(
          (record) =>
            record.employeeId ===
              employeeId &&
            record.date ===
              selectedDate
        );


      let updatedRecord;


      // =========================
      // UPDATE EXISTING RECORD
      // =========================

      if (existingRecord) {

        const response =
          await api.put(
            `/attendance/${existingRecord.id}`,
            {

              employee_id:
                employeeId,

              date:
                selectedDate,

              status:
                newStatus,

            }
          );


        updatedRecord = {

          id:
            response.data.attendance.id,

          employeeId:
            response.data.attendance.employee_id,

          date:
            response.data.attendance.date,

          status:
            response.data.attendance.status,

        };


        // Update frontend state

        setAttendance(
          (currentAttendance) =>
            currentAttendance.map(
              (record) =>
                record.id ===
                  existingRecord.id
                  ? updatedRecord
                  : record
            )
        );


      } else {


        // =========================
        // CREATE NEW RECORD
        // =========================

        const response =
          await api.post(
            "/attendance",
            {

              employee_id:
                employeeId,

              date:
                selectedDate,

              status:
                newStatus,

            }
          );


        updatedRecord = {

          id:
            response.data.attendanceId,

          employeeId:
            employeeId,

          date:
            selectedDate,

          status:
            newStatus,

        };


        // Add new record to frontend state

        setAttendance(
          (currentAttendance) => [
            ...currentAttendance,
            updatedRecord,
          ]
        );

      }


      // =========================
      // REFRESH ACTIVITIES
      // =========================

      await fetchActivities();


    } catch (error) {

      console.error(
        "Failed to update attendance:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

  };


  // =========================
  // CONTEXT PROVIDER
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