import { useEffect, useState } from "react";

import api from "../api/api";
import { useActivities } from "./useActivities";
import { EmployeeContext } from "./EmployeeContext";


export function EmployeeProvider({ children }) {

  // =========================
  // EMPLOYEE STATE
  // =========================

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // ACTIVITY CONTEXT
  // =========================

  const { addActivity } =
    useActivities();


  // =========================
  // FETCH EMPLOYEES
  // =========================

  const fetchEmployees = async () => {

    try {

      const response =
        await api.get("/employees");


      setEmployees(
        response.data
      );

      return response.data;

    } catch (error) {

      console.error(
        "Failed to fetch employees:",
        error.response?.data ||
        error.message
      );

      throw error;

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    const loadEmployees = async () => {

      try {

        const response =
          await api.get("/employees");


        setEmployees(
          response.data
        );

      } catch (error) {

        console.error(
          "Failed to fetch employees:",
          error.response?.data ||
          error.message
        );

      } finally {

        setLoading(false);

      }

    };


    loadEmployees();

  }, []);


  // =========================
  // ADD EMPLOYEE
  // =========================

  const addEmployee = async (
    employeeData
  ) => {

    try {

      const response =
        await api.post(
          "/employees",
          employeeData
        );


      const newEmployee = {

        id:
          response.data.employeeId,

        ...employeeData,

      };


      // Update employee state immediately

      setEmployees(
        (currentEmployees) => [
          ...currentEmployees,
          newEmployee,
        ]
      );


      // Add activity immediately

      await addActivity({

        employeeId:
          newEmployee.id,

        type:
          "employee-added",

        message:
          `Employee added: ${newEmployee.name}`,

        icon:
          "+",

      });


      return newEmployee;

    } catch (error) {

      console.error(
        "Failed to add employee:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

  };


  // =========================
  // UPDATE EMPLOYEE
  // =========================

  const updateEmployee = async (
    employeeId,
    updatedData
  ) => {

    try {

      const response =
        await api.put(
          `/employees/${employeeId}`,
          updatedData
        );


      const updatedEmployee =
        response.data.employee;


      // Update frontend immediately

      setEmployees(
        (currentEmployees) =>
          currentEmployees.map(
            (employee) =>
              employee.id === employeeId
                ? updatedEmployee
                : employee
          )
      );


      // Add activity immediately

      await addActivity({

        employeeId,

        type:
          "employee-updated",

        message:
          `Employee updated: ${updatedEmployee.name}`,

        icon:
          "↻",

      });


      return updatedEmployee;

    } catch (error) {

      console.error(
        "Failed to update employee:",
        error.response?.data ||
        error.message
      );

      throw error;

    }

  };


  // =========================
  // DELETE EMPLOYEE
  // =========================

  const deleteEmployee = async (
    employeeId
  ) => {

    try {

      const employeeToDelete =
        employees.find(
          (employee) =>
            employee.id === employeeId
        );


      if (!employeeToDelete) {
        return;
      }


      const deletedEmployeeName =
        employeeToDelete.name;


      // Delete from backend

      await api.delete(
        `/employees/${employeeId}`
      );


      // Remove immediately from frontend

      setEmployees(
        (currentEmployees) =>
          currentEmployees.filter(
            (employee) =>
              employee.id !== employeeId
          )
      );


      // Add activity immediately

      await addActivity({

        employeeId:
          null,

        type:
          "employee-deleted",

        message:
          `Employee removed: ${deletedEmployeeName}`,

        icon:
          "−",

      });

    } catch (error) {

      console.error(
        "Failed to delete employee:",
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

    <EmployeeContext.Provider
      value={{

        employees,

        loading,

        fetchEmployees,

        addEmployee,

        updateEmployee,

        deleteEmployee,

      }}
    >

      {children}

    </EmployeeContext.Provider>

  );

}