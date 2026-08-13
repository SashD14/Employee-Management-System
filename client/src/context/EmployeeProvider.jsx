import { useState } from "react";

import { initialEmployees } from "../data/employees";

import { useActivities } from "./useActivities";

import { EmployeeContext } from "./EmployeeContext";


export function EmployeeProvider({ children }) {

  const [employees, setEmployees] =
    useState(initialEmployees);

  const { addActivity } = useActivities();


  // =========================
  // ADD EMPLOYEE
  // =========================

  const addEmployee = (employeeData) => {

    let newEmployee;

    setEmployees((currentEmployees) => {

      const nextId =
        currentEmployees.length > 0
          ? Math.max(
              ...currentEmployees.map(
                (employee) => employee.id
              )
            ) + 1
          : 1;


      newEmployee = {
        id: nextId,
        ...employeeData,
      };


      return [
        ...currentEmployees,
        newEmployee,
      ];
    });


   addActivity({
      employeeId: newEmployee.id,
      type: "employee-added",
      message: `Employee added: ${employeeData.name}`,
      icon: "+",
    });
  };


  // =========================
  // UPDATE EMPLOYEE
  // =========================

  const updateEmployee = (
    employeeId,
    updatedData
  ) => {

    let updatedEmployeeName = "";


    setEmployees((currentEmployees) => {

      return currentEmployees.map(
        (employee) => {

          if (employee.id === employeeId) {

            updatedEmployeeName =
              updatedData.name || employee.name;

            return {
              ...employee,
              ...updatedData,
            };
          }

          return employee;
        }
      );
    });


    addActivity({
      employeeId: employeeId,
      type: "employee-updated",
      message: `Employee updated: ${
        updatedEmployeeName || updatedData.name
      }`,
      icon: "↻",
    });
  };


  // =========================
  // DELETE EMPLOYEE
  // =========================

  const deleteEmployee = (employeeId) => {

    let deletedEmployeeName = "";


    setEmployees((currentEmployees) => {

      const employeeToDelete =
        currentEmployees.find(
          (employee) =>
            employee.id === employeeId
        );


      if (employeeToDelete) {
        deletedEmployeeName =
          employeeToDelete.name;
      }


      return currentEmployees.filter(
        (employee) =>
          employee.id !== employeeId
      );
    });


    if (deletedEmployeeName) {

      addActivity({
        employeeId: employeeId,
        type: "employee-deleted",
        message: `Employee removed: ${deletedEmployeeName}`,
        icon: "−",
      });

    }
  };


  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}