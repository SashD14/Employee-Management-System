import { useContext } from "react";

import { EmployeeContext } from "./EmployeeContext";

export function useEmployees() {
  return useContext(EmployeeContext);
}