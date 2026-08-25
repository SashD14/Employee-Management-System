import { useState } from "react";
import { Navigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

import api from "../api/api";

import "../styles/login.css";


function Login() {

  // =========================
  // FORM STATE
  // =========================

  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);


  const [isLoading, setIsLoading] =
    useState(false);


  // =========================
  // CHECK LOGIN
  // =========================

  const token =
    localStorage.getItem("token");


  if (token) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  // =========================
  // HANDLE LOGIN
  // =========================

  const handleLogin =
    async (event) => {

      event.preventDefault();

      setIsLoading(true);


      try {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );


        // =========================
        // SAVE TOKEN
        // =========================

        localStorage.setItem(
          "token",
          response.data.token
        );


        // =========================
        // SAVE USER
        // =========================

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );


        // =========================
        // RELOAD APPLICATION
        // AFTER TOKEN IS SAVED
        // =========================

        window.location.replace("/dashboard");


      } catch (error) {

        console.error(error);


        alert(
          error.response?.data?.message ||
          "Login failed. Please try again."
        );

      } finally {

        setIsLoading(false);

      }

    };


  // =========================
  // RENDER
  // =========================

  return (

    <div className="login-page">


      {/* =========================
          BACKGROUND SHAPES
      ========================== */}

      <div className="login-background-shape login-shape-one" />

      <div className="login-background-shape login-shape-two" />


      {/* =========================
          LOGIN CONTAINER
      ========================== */}

      <div className="login-container">


        {/* =========================
            BRANDING SIDE
        ========================== */}

        <div className="login-branding">


          <div className="login-logo">

            <FaUsers />

          </div>


          <div className="login-brand-content">

            <span className="login-brand-tag">

              EMPLOYEE PORTAL

            </span>


            <h1>

              Employee Management System

            </h1>


            <p>

              Manage your employees, attendance,
              leave requests, and reports from one
              secure platform.

            </p>


            <div className="login-brand-features">

              <div>

                <span />

                Employee Management

              </div>


              <div>

                <span />

                Attendance Tracking

              </div>


              <div>

                <span />

                Leave Management

              </div>


              <div>

                <span />

                Reports & Insights

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            LOGIN FORM SIDE
        ========================== */}

        <div className="login-form-section">


          <div className="login-form-header">

            <h2>

              Welcome back

            </h2>


            <p>

              Please enter your details to sign in.

            </p>

          </div>


          <form
            className="login-form"
            onSubmit={handleLogin}
          >


            {/* =========================
                EMAIL
            ========================== */}

            <div className="login-field">

              <label
                htmlFor="email"
              >

                Email Address

              </label>


              <div className="login-input-wrapper">

                <FaEnvelope
                  className="login-input-icon"
                />


                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  required
                />

              </div>

            </div>


            {/* =========================
                PASSWORD
            ========================== */}

            <div className="login-field">

              <label
                htmlFor="password"
              >

                Password

              </label>


              <div className="login-input-wrapper">

                <FaLock
                  className="login-input-icon"
                />


                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  required
                />


                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>

            </div>


            {/* =========================
                LOGIN BUTTON
            ========================== */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
            >

              {isLoading
                ? "Signing in..."
                : (
                  <>
                    Sign In

                    <FaArrowRight />

                  </>
                )
              }

            </button>


          </form>


          <p className="login-footer">

            Secure access to your employee
            management portal.

          </p>


        </div>

      </div>

    </div>

  );

}


export default Login;