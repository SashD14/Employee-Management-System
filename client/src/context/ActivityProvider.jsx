import { useState } from "react";

import { ActivityContext } from "./ActivityContext";

export function ActivityProvider({ children }) {

  const [activities, setActivities] =
    useState([]);


  function addActivity(activity) {

    const newActivity = {
      id: Date.now(),
      createdAt:
        new Date().toISOString(),
      ...activity,
    };


    setActivities(
      (currentActivities) => [
        newActivity,
        ...currentActivities,
      ]
    );

  }


  function clearActivities() {

    setActivities([]);

  }


  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities,
      }}
    >

      {children}

    </ActivityContext.Provider>
  );
}