import { useState } from "react";

import EmployeeCard from "../components/employee/EmployeeCard";

import { useEmployees } from "../context/useEmployees";

import "../styles/employees.css";


function Employees() {

  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();


  // =========================
  // FORM STATE
  // =========================

  const [name, setName] = useState("");

  const [role, setRole] = useState("");

  const [department, setDepartment] =
    useState("IT");

  const [email, setEmail] = useState("");

  const [status, setStatus] =
    useState("Active");


  // =========================
  // FORM VISIBILITY
  // =========================

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);


  // =========================
  // VALIDATION
  // =========================

  const [errors, setErrors] =
    useState({});


  // =========================
  // SEARCH / FILTERS
  // =========================

  const [search, setSearch] =
    useState("");

  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("A-Z");


  // =========================
  // DEPARTMENT OPTIONS
  // =========================

  const departmentOptions = [
    "All",
    ...new Set(
      employees.map(
        (employee) =>
          employee.department
      )
    ),
  ];


  // =========================
  // FORM HELPERS
  // =========================

  function resetForm() {

    setName("");

    setRole("");

    setDepartment("IT");

    setEmail("");

    setStatus("Active");

    setErrors({});

    setEditingEmployee(null);

    setIsFormOpen(false);
  }


  function clearError(field) {

    setErrors(
      (currentErrors) => {

        const updatedErrors = {
          ...currentErrors,
        };

        delete updatedErrors[field];

        return updatedErrors;
      }
    );
  }


  // =========================
  // EMAIL VALIDATION
  // =========================

  function isValidEmail(emailAddress) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(emailAddress);
  }


  // =========================
  // ADD / UPDATE EMPLOYEE
  // =========================

  function handleSaveEmployee() {

    const newErrors = {};


    // Name

    if (name.trim() === "") {

      newErrors.name =
        "Name is required";

    }


    // Role

    if (role.trim() === "") {

      newErrors.role =
        "Role is required";

    }


    // Email

    const trimmedEmail =
      email.trim();


    if (trimmedEmail === "") {

      newErrors.email =
        "Email is required";

    }

    else if (
      !isValidEmail(trimmedEmail)
    ) {

      newErrors.email =
        "Enter a valid email address";

    }


    // Duplicate email

    const duplicateEmail =
      employees.some(
        (employee) => {

          const sameEmail =
            employee.email
              .toLowerCase()
              .trim() ===
            trimmedEmail
              .toLowerCase();

          const differentEmployee =
            editingEmployee === null ||
            employee.id !==
              editingEmployee.id;

          return (
            sameEmail &&
            differentEmployee
          );
        }
      );


    if (duplicateEmail) {

      newErrors.email =
        "This email is already in use";

    }


    setErrors(newErrors);


    if (
      Object.keys(newErrors).length > 0
    ) {

      return;
    }


    const employeeData = {

      name:
        name.trim(),

      role:
        role.trim(),

      department,

      email:
        trimmedEmail,

      status,

    };


    // =========================
    // ADD
    // =========================

    if (
      editingEmployee === null
    ) {

      addEmployee(
        employeeData
      );

    }


    // =========================
    // UPDATE
    // =========================

    else {

      updateEmployee(
        editingEmployee.id,
        employeeData
      );

    }


    resetForm();
  }


  // =========================
  // EDIT EMPLOYEE
  // =========================

  function handleEditEmployee(id) {

    const employee =
      employees.find(
        (employee) =>
          employee.id === id
      );


    if (!employee) {

      return;
    }


    setEditingEmployee(employee);

    setName(employee.name);

    setRole(employee.role);

    setDepartment(
      employee.department
    );

    setEmail(employee.email);

    setStatus(employee.status);

    setErrors({});

    setIsFormOpen(true);
  }


  // =========================
  // DELETE EMPLOYEE
  // =========================

  function handleDeleteEmployee(id) {

    const employee =
      employees.find(
        (employee) =>
          employee.id === id
      );


    if (!employee) {

      return;
    }


    const isConfirmed =
      window.confirm(
        `Are you sure you want to delete ${employee.name}?`
      );


    if (!isConfirmed) {

      return;
    }


    deleteEmployee(id);
  }


  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const searchText =
          search
            .toLowerCase()
            .trim();


        const matchesSearch =
          employee.name
            .toLowerCase()
            .includes(searchText) ||

          employee.role
            .toLowerCase()
            .includes(searchText) ||

          employee.email
            .toLowerCase()
            .includes(searchText) ||

          employee.department
            .toLowerCase()
            .includes(searchText);


        const matchesDepartment =
          selectedDepartment ===
            "All" ||

          employee.department ===
            selectedDepartment;


        const matchesStatus =
          selectedStatus ===
            "All" ||

          employee.status ===
            selectedStatus;


        return (
          matchesSearch &&
          matchesDepartment &&
          matchesStatus
        );
      }
    );


  // =========================
  // SORT
  // =========================

  const sortedEmployees =
    [...filteredEmployees];


  if (sortBy === "A-Z") {

    sortedEmployees.sort(
      (a, b) =>
        a.name.localeCompare(
          b.name
        )
    );

  }


  if (sortBy === "Z-A") {

    sortedEmployees.sort(
      (a, b) =>
        b.name.localeCompare(
          a.name
        )
    );

  }


  // =========================
  // RENDER
  // =========================

  return (

    <div className="employees-page">


      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="employees-header">

        <div>

          <h1>
            Employees
          </h1>

          <p>
            Manage employees and
            their information
          </p>

        </div>


        <button
          type="button"
          className="add-employee-button"
          onClick={() => {

            setEditingEmployee(null);

            setName("");

            setRole("");

            setDepartment("IT");

            setEmail("");

            setStatus("Active");

            setErrors({});

            setIsFormOpen(true);

          }}
        >
          Add Employee
        </button>

      </div>


      {/* =========================
          SEARCH + FILTERS
      ========================== */}

      <div className="employee-tools">

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          aria-label="Search employees"
        />


        <select
          value={selectedDepartment}
          onChange={(e) =>
            setSelectedDepartment(
              e.target.value
            )
          }
          aria-label="Filter by department"
        >

          {departmentOptions.map(
            (option) => (

              <option
                key={option}
                value={option}
              >
                {option === "All"
                  ? "All Departments"
                  : option}
              </option>

            )
          )}

        </select>


        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(
              e.target.value
            )
          }
          aria-label="Filter by status"
        >

          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>


        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          aria-label="Sort employees"
        >

          <option value="A-Z">
            Name (A-Z)
          </option>

          <option value="Z-A">
            Name (Z-A)
          </option>

        </select>

      </div>


      {/* =========================
          EMPLOYEE FORM
      ========================== */}

      {isFormOpen && (

        <div className="employee-form">

          <div className="employee-form-header">

            <h2>
              {editingEmployee
                ? "Edit Employee"
                : "Add Employee"}
            </h2>


            <button
              type="button"
              className="close-form-button"
              onClick={resetForm}
              aria-label="Close employee form"
            >
              ×
            </button>

          </div>


          {/* NAME */}

          <label htmlFor="employee-name">
            Name
          </label>

          <input
            id="employee-name"
            type="text"
            value={name}
            placeholder="Enter employee name"
            onChange={(e) => {

              setName(
                e.target.value
              );

              clearError("name");

            }}
          />

          {errors.name && (

            <p className="error">
              {errors.name}
            </p>

          )}


          {/* ROLE */}

          <label htmlFor="employee-role">
            Role
          </label>

          <input
            id="employee-role"
            type="text"
            value={role}
            placeholder="Enter employee role"
            onChange={(e) => {

              setRole(
                e.target.value
              );

              clearError("role");

            }}
          />

          {errors.role && (

            <p className="error">
              {errors.role}
            </p>

          )}


          {/* DEPARTMENT */}

          <label htmlFor="employee-department">
            Department
          </label>

          <select
            id="employee-department"
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
          >

            <option value="IT">
              IT
            </option>

            <option value="HR">
              HR
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Design">
              Design
            </option>

          </select>


          {/* EMAIL */}

          <label htmlFor="employee-email">
            Email
          </label>

          <input
            id="employee-email"
            type="email"
            value={email}
            placeholder="Enter employee email"
            onChange={(e) => {

              setEmail(
                e.target.value
              );

              clearError("email");

            }}
          />

          {errors.email && (

            <p className="error">
              {errors.email}
            </p>

          )}


          {/* STATUS */}

          <label htmlFor="employee-status">
            Status
          </label>

          <select
            id="employee-status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>


          {/* ACTIONS */}

          <div className="employee-form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>


            <button
              type="button"
              className="save-button"
              onClick={
                handleSaveEmployee
              }
            >
              {editingEmployee
                ? "Update Employee"
                : "Save Employee"}
            </button>

          </div>

        </div>

      )}


      {/* =========================
          LIST HEADER
      ========================== */}

      <div className="employee-list-header">

        <h2>
          All Employees
        </h2>

        <span>
          {filteredEmployees.length}{" "}
          of{" "}
          {employees.length}{" "}
          employees
        </span>

      </div>


      {/* =========================
          EMPLOYEE LIST
      ========================== */}

      <div className="employee-list">

        {sortedEmployees.length > 0 ? (

          sortedEmployees.map(
            (employee) => (

              <EmployeeCard
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.role}
                department={
                  employee.department
                }
                email={employee.email}
                status={employee.status}
                onEdit={
                  handleEditEmployee
                }
                onDelete={
                  handleDeleteEmployee
                }
              />

            )
          )

        ) : (

          <p className="no-results">
            No employees found.
          </p>

        )}

      </div>

    </div>

  );
}


export default Employees;