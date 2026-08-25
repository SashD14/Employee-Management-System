import { useEffect, useState } from "react";

import api from "../api/api";

import { useEmployees } from "./useEmployees";
import { useActivities } from "./useActivities";

import { LeaveContext } from "./LeaveContext";


export function LeaveProvider({ children }) {

  // =========================
  // LEAVES STATE
  // =========================

  const [leaves, setLeaves] =
    useState([]);


  // =========================
  // EMPLOYEES
  // =========================

  const { employees } =
    useEmployees();


  // =========================
  // ACTIVITIES
  // =========================

  const { fetchActivities } =
    useActivities();


  // =========================
  // FETCH LEAVES
  // =========================

  useEffect(() => {

    const loadLeaves = async () => {

      try {

        const response =
          await api.get("/leaves");


        const formattedLeaves =
          response.data.map(
            (leave) => ({

              id:
                leave.id,

              employeeId:
                leave.employee_id,

              employeeName:
                leave.name,

              leaveType:
                leave.leave_type,

              startDate:
                leave.start_date,

              endDate:
                leave.end_date,

              reason:
                leave.reason,

              status:
                leave.status,

            })
          );


        setLeaves(
          formattedLeaves
        );

      } catch (error) {

        console.error(
          "Failed to fetch leaves:",
          error.response?.data ||
          error.message
        );

      }

    };


    loadLeaves();

  }, []);


  // =========================
  // ADD LEAVE
  // =========================

  const addLeave = async (
    leaveData
  ) => {

    try {

      const response =
        await api.post(
          "/leaves",
          {

            employee_id:
              Number(
                leaveData.employeeId
              ),

            leave_type:
              leaveData.leaveType,

            start_date:
              leaveData.startDate,

            end_date:
              leaveData.endDate,

            reason:
              leaveData.reason,

            status:
              "Pending",

          }
        );


      // =========================
      // FIND EMPLOYEE
      // =========================

      const employee =
        employees.find(
          (employee) =>
            employee.id ===
            Number(
              leaveData.employeeId
            )
        );


      // =========================
      // CREATE FRONTEND RECORD
      // =========================

      const newLeave = {

        id:
          response.data.leaveId,

        employeeId:
          Number(
            leaveData.employeeId
          ),

        employeeName:
          employee?.name || "",

        leaveType:
          leaveData.leaveType,

        startDate:
          leaveData.startDate,

        endDate:
          leaveData.endDate,

        reason:
          leaveData.reason,

        status:
          "Pending",

      };


      // =========================
      // UPDATE FRONTEND STATE
      // =========================

      setLeaves(
        (currentLeaves) => [
          newLeave,
          ...currentLeaves,
        ]
      );


      // =========================
      // REFRESH ACTIVITIES
      // =========================

      await fetchActivities();


      return newLeave;

    } catch (error) {

      console.error(
        "Failed to create leave:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

  };


  // =========================
  // UPDATE LEAVE STATUS
  // =========================

  const updateLeaveStatus = async (
    leaveId,
    newStatus
  ) => {

    try {

      const leave =
        leaves.find(
          (item) =>
            item.id === leaveId
        );


      if (!leave) {
        return;
      }


      const response =
        await api.put(
          `/leaves/${leaveId}`,
          {

            employee_id:
              leave.employeeId,

            leave_type:
              leave.leaveType,

            start_date:
              leave.startDate,

            end_date:
              leave.endDate,

            reason:
              leave.reason,

            status:
              newStatus,

          }
        );


      const updatedLeave = {

        id:
          response.data.leave.id,

        employeeId:
          response.data.leave.employee_id,

        employeeName:
          response.data.leave.name,

        leaveType:
          response.data.leave.leave_type,

        startDate:
          response.data.leave.start_date,

        endDate:
          response.data.leave.end_date,

        reason:
          response.data.leave.reason,

        status:
          response.data.leave.status,

      };


      // =========================
      // UPDATE FRONTEND STATE
      // =========================

      setLeaves(
        (currentLeaves) =>
          currentLeaves.map(
            (currentLeave) =>
              currentLeave.id === leaveId
                ? updatedLeave
                : currentLeave
          )
      );


      // =========================
      // REFRESH ACTIVITIES
      // =========================

      await fetchActivities();


    } catch (error) {

      console.error(
        "Failed to update leave:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

  };


  // =========================
  // DELETE LEAVE
  // =========================

  const deleteLeave = async (
    leaveId
  ) => {

    try {


      // =========================
      // DELETE FROM BACKEND
      // =========================

      await api.delete(
        `/leaves/${leaveId}`
      );


      // =========================
      // REMOVE FROM FRONTEND
      // =========================

      setLeaves(
        (currentLeaves) =>
          currentLeaves.filter(
            (leave) =>
              leave.id !== leaveId
          )
      );


      // =========================
      // REFRESH ACTIVITIES
      // =========================

      await fetchActivities();


    } catch (error) {

      console.error(
        "Failed to delete leave:",
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

    <LeaveContext.Provider
      value={{

        leaves,

        addLeave,

        updateLeaveStatus,

        deleteLeave,

      }}
    >

      {children}

    </LeaveContext.Provider>

  );

}