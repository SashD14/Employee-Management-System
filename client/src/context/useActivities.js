import { useContext } from "react";

import { ActivityContext } from "./ActivityContext";

export function useActivities() {
  return useContext(ActivityContext);
}