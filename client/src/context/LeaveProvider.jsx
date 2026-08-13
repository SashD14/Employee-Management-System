import { useState } from "react";

import { initialLeaves } from "../data/leaves";

import { useActivities } from "./useActivities";

import { LeaveContext } from "./LeaveContext";


export function LeaveProvider({ children }) {

  const [leaves, setLeaves] =
    useState(initialLeaves);

  const { addActivity } =
    useActivities();


  // =========================
  // UPDATE LEAVE STATUS
  // =========================

  const updateLeaveStatus = (
    leaveId,
    newStatus
  ) => {

    // Find the leave before updating it
    const leave = leaves.find(
      (item) =>
        item.id === leaveId
    );


    // Stop if leave does not exist
    if (!leave) {
      return;
    }


    // Update leave status
    setLeaves((currentLeaves) =>
      currentLeaves.map(
        (currentLeave) => {

          if (
            currentLeave.id === leaveId
          ) {

            return {
              ...currentLeave,
              status: newStatus,
            };
          }

          return currentLeave;
        }
      )
    );


    // =========================
    // ADD ACTIVITY
    // =========================

    if (newStatus === "Approved") {

      addActivity({

        employeeId:
          leave.employeeId,

        type:
          "leave-approved",

        message:
          `Leave approved: ${leave.employeeName}`,

        icon:
          "✓",

      });

    }


    if (newStatus === "Rejected") {

      addActivity({

        employeeId:
          leave.employeeId,

        type:
          "leave-rejected",

        message:
          `Leave rejected: ${leave.employeeName}`,

        icon:
          "×",

      });

    }

  };


  return (
    <LeaveContext.Provider
      value={{
        leaves,
        updateLeaveStatus,
      }}
    >

      {children}

    </LeaveContext.Provider>
  );
}