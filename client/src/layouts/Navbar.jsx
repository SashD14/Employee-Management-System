import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaSearch,
  FaBars,
} from "react-icons/fa";

import { useEmployees } from "../context/useEmployees";

import "../styles/navbar.css";


function Navbar({ onMenuClick }) {

  const navigate =
    useNavigate();


  // =========================
  // SEARCH STATE
  // =========================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showResults, setShowResults] =
    useState(false);


  // =========================
  // SEARCH CONTAINER REF
  // =========================

  const searchRef =
    useRef(null);


  // =========================
  // GET EMPLOYEES
  // =========================

  const {
    employees,
  } = useEmployees();


  // =========================
  // GET LOGGED-IN USER
  // =========================

  const storedUser =
    localStorage.getItem("user");


  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;


  // =========================
  // FILTER EMPLOYEES
  // =========================

  const filteredEmployees =
    searchTerm.trim()
      ? employees
          .filter(
            (employee) =>
              employee.name
                ?.toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
          )
          .slice(0, 5)
      : [];


  // =========================
  // CLICK OUTSIDE SEARCH
  // =========================

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          searchRef.current &&
          !searchRef.current.contains(
            event.target
          )
        ) {

          setShowResults(false);

        }

      };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================
  // SELECT EMPLOYEE
  // =========================

  const handleEmployeeSelect =
    (employee) => {

      setSearchTerm("");

      setShowResults(false);


      navigate(
        `/employees/${employee.id}`
      );

    };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );


    if (!confirmLogout) {
      return;
    }


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/", {
      replace: true,
    });

  };


  return (

    <nav className="navbar">


      {/* =========================
          LEFT SIDE
      ========================== */}

      <div className="navbar-left">

        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >

          <FaBars />

        </button>

        <h2>
          Employee Management System
        </h2>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================== */}

      <div className="navbar-right">


        {/* =========================
            EMPLOYEE SEARCH
        ========================== */}

        <div
          className="navbar-search"
          ref={searchRef}
        >

          <FaSearch
            className="navbar-search-icon"
          />


          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(event) => {

              setSearchTerm(
                event.target.value
              );

              setShowResults(true);

            }}
            onFocus={() => {

              if (
                searchTerm.trim()
              ) {

                setShowResults(true);

              }

            }}
          />


          {/* SEARCH RESULTS */}

          {showResults &&
            searchTerm.trim() && (

              <div className="navbar-search-results">


                {filteredEmployees.length > 0 ? (

                  filteredEmployees.map(
                    (employee) => (

                      <button
                        type="button"
                        className="navbar-search-result"
                        key={employee.id}
                        onClick={() =>
                          handleEmployeeSelect(
                            employee
                          )
                        }
                      >

                        <div className="navbar-search-avatar">

                          {employee.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>


                        <div className="navbar-search-info">

                          <strong>
                            {employee.name}
                          </strong>


                          <span>
                            {employee.role ||
                              "Employee"}
                          </span>

                        </div>

                      </button>

                    )
                  )

                ) : (

                  <div className="navbar-search-empty">

                    No employee found

                  </div>

                )}


              </div>

            )}

        </div>


        {/* SETTINGS */}

        <button
          type="button"
          className="navbar-icon-button"
          title="Settings"
          onClick={() => navigate("/settings")}
        >

          <FaCog />

        </button>


        {/* USER */}

        <div className="navbar-user">

          <FaUserCircle
            className="navbar-user-icon"
          />


          <div className="navbar-user-info">

            <span className="navbar-user-name">

              {user?.name || "User"}

            </span>


            <span className="navbar-user-role">

              {user?.role || "Employee"}

            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          type="button"
          className="navbar-logout-button"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>


      </div>

    </nav>

  );

}


export default Navbar;