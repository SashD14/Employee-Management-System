import { useContext } from "react";
import { LeaveContext } from "./LeaveContext";

export function useLeaves() {
  return useContext(LeaveContext);
}