import { useEffect, useState } from "react";

import api from "../api/api";
import { ActivityContext } from "./ActivityContext";

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState([]);

  // =========================
  // FETCH ACTIVITIES
  // =========================

  const fetchActivities = async () => {
    try {
      const response = await api.get("/activities");

      const formattedActivities = response.data.map(
        (activity) => ({
          id: activity.id,
          employeeId: activity.employee_id,
          type: activity.type,
          message: activity.message,
          icon: activity.icon,
          createdAt: activity.created_at,
        })
      );

      setActivities(formattedActivities);
    } catch (error) {
      console.error(
        "Failed to fetch activities:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await api.get("/activities");

        const formattedActivities = response.data.map(
          (activity) => ({
            id: activity.id,
            employeeId: activity.employee_id,
            type: activity.type,
            message: activity.message,
            icon: activity.icon,
            createdAt: activity.created_at,
          })
        );

        setActivities(formattedActivities);
      } catch (error) {
        console.error(
          "Failed to fetch activities:",
          error.response?.data || error.message
        );
      }
    };

    loadActivities();
  }, []);

  // =========================
  // ADD ACTIVITY
  // =========================

  const addActivity = async (activity) => {
    try {
      const response = await api.post(
        "/activities",
        {
          employee_id: activity.employeeId || null,
          type: activity.type,
          message: activity.message,
          icon: activity.icon || null,
        }
      );

      const newActivity = {
        id: response.data.activityId,
        employeeId: activity.employeeId || null,
        type: activity.type,
        message: activity.message,
        icon: activity.icon || null,
        createdAt: new Date().toISOString(),
      };

      setActivities((currentActivities) => [
        newActivity,
        ...currentActivities,
      ]);
    } catch (error) {
      console.error(
        "Failed to add activity:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =========================
  // CLEAR ACTIVITIES
  // =========================

  const clearActivities = async () => {
    try {
      await api.delete("/activities");

      setActivities([]);
    } catch (error) {
      console.error(
        "Failed to clear activities:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // =========================
  // CONTEXT PROVIDER
  // =========================

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities,
        fetchActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}