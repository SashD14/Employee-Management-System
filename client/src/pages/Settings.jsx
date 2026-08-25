import { useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaShieldAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaKey,
} from "react-icons/fa";

import api from "../api/api";

import "../styles/settings.css";


function Settings() {

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
  // PASSWORD STATE
  // =========================

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");


  const [
    newPassword,
    setNewPassword,
  ] = useState("");


  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");


  // =========================
  // PASSWORD VISIBILITY
  // =========================

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);


  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);


  // =========================
  // STATUS
  // =========================

  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  const [
    error,
    setError,
  ] = useState("");


  // =========================
  // CHANGE PASSWORD
  // =========================

  const handleChangePassword =
    async (event) => {

      event.preventDefault();


      setMessage("");

      setError("");


      // =========================
      // VALIDATE PASSWORDS
      // =========================

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        setError(
          "Please fill in all password fields."
        );

        return;

      }


      if (
        newPassword !== confirmPassword
      ) {

        setError(
          "New passwords do not match."
        );

        return;

      }


      if (
        newPassword.length < 6
      ) {

        setError(
          "New password must be at least 6 characters."
        );

        return;

      }


      try {

        setLoading(true);


        const response =
          await api.put(
            "/users/change-password",
            {
              currentPassword,
              newPassword,
              confirmPassword,
            }
          );


        setMessage(
          response.data.message ||
          "Password changed successfully."
        );


        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");


        setShowCurrentPassword(false);

        setShowNewPassword(false);

        setShowConfirmPassword(false);


      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to change password."
        );

      } finally {

        setLoading(false);

      }

    };


  // =========================
  // GET USER INITIAL
  // =========================

  const userInitial =
    user?.name
      ? user.name
          .charAt(0)
          .toUpperCase()
      : "U";


  return (

    <div className="settings-page">


      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="settings-page-header">

        <div>

          <span className="settings-page-badge">

            <FaUser />

            Account Settings

          </span>


          <h1>
            Settings
          </h1>


          <p>
            Manage your profile, security, and account access.
          </p>

        </div>

      </div>


      {/* =========================
          PROFILE CARD
      ========================== */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon profile-icon">

            <FaUser />

          </div>


          <div>

            <h2>
              Profile Information
            </h2>

            <p>
              Details of your currently logged-in account.
            </p>

          </div>

        </div>


        <div className="settings-profile-content">


          {/* AVATAR */}

          <div className="settings-avatar-wrapper">

            <div className="settings-avatar">

              {userInitial}

            </div>


            <span className="settings-online-dot">

              <FaCheckCircle />

            </span>

          </div>


          {/* DETAILS */}

          <div className="settings-details-grid">


            {/* FULL NAME */}

            <div className="settings-info-item">

              <div className="settings-info-icon">

                <FaUser />

              </div>


              <div className="settings-info-content">

                <span>
                  Full Name
                </span>

                <strong>
                  {user?.name || "User"}
                </strong>

              </div>

            </div>


            {/* EMAIL */}

            <div className="settings-info-item">

              <div className="settings-info-icon">

                <FaEnvelope />

              </div>


              <div className="settings-info-content">

                <span>
                  Email Address
                </span>

                <strong>
                  {user?.email || "-"}
                </strong>

              </div>

            </div>


            {/* ROLE */}

            <div className="settings-info-item">

              <div className="settings-info-icon">

                <FaUserTag />

              </div>


              <div className="settings-info-content">

                <span>
                  Role
                </span>

                <strong className="settings-role-badge">

                  {user?.role || "User"}

                </strong>

              </div>

            </div>


          </div>

        </div>

      </section>


      {/* =========================
          SECURITY
      ========================== */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon security-icon">

            <FaLock />

          </div>


          <div>

            <h2>
              Security
            </h2>

            <p>
              Keep your account secure by updating your password.
            </p>

          </div>

        </div>


        <form
          className="change-password-form"
          onSubmit={handleChangePassword}
        >


          {/* CURRENT PASSWORD */}

          <div className="settings-input-group">

            <label>
              Current Password
            </label>


            <div className="settings-password-input">

              <FaLock
                className="settings-input-lock"
              />


              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(
                    event.target.value
                  )
                }
              />


              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    !showCurrentPassword
                  )
                }
                aria-label="Toggle password visibility"
              >

                {showCurrentPassword
                  ? <FaEyeSlash />
                  : <FaEye />
                }

              </button>

            </div>

          </div>


          {/* NEW PASSWORD */}

          <div className="settings-input-group">

            <label>
              New Password
            </label>


            <div className="settings-password-input">

              <FaLock
                className="settings-input-lock"
              />


              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(
                    event.target.value
                  )
                }
              />


              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
                aria-label="Toggle password visibility"
              >

                {showNewPassword
                  ? <FaEyeSlash />
                  : <FaEye />
                }

              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="settings-input-group">

            <label>
              Confirm New Password
            </label>


            <div className="settings-password-input">

              <FaLock
                className="settings-input-lock"
              />


              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
              />


              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                aria-label="Toggle password visibility"
              >

                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />
                }

              </button>

            </div>

          </div>


          {/* MESSAGE */}

          {message && (

            <div className="settings-success-message">

              <FaCheckCircle />

              <span>
                {message}
              </span>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="settings-error-message">

              <span>
                {error}
              </span>

            </div>

          )}


          {/* BUTTON */}

          <div className="settings-form-actions">

            <button
              type="submit"
              className="change-password-button"
              disabled={loading}
            >

              <FaKey />

              <span>

                {loading
                  ? "Changing Password..."
                  : "Change Password"
                }

              </span>

            </button>

          </div>


        </form>

      </section>


      {/* =========================
          SYSTEM ACCESS
      ========================== */}

      <section className="settings-section">

        <div className="settings-section-header">

          <div className="settings-section-icon access-icon">

            <FaShieldAlt />

          </div>


          <div>

            <h2>
              System Access
            </h2>

            <p>
              Your current account permissions and access status.
            </p>

          </div>

        </div>


        <div className="settings-access-grid">


          {/* ACCESS LEVEL */}

          <div className="settings-access-card">

            <span className="settings-access-label">

              Access Level

            </span>


            <strong>

              {user?.role === "Admin"
                ? "Full System Access"
                : user?.role === "HR"
                  ? "HR System Access"
                  : user?.role === "Manager"
                    ? "Management Access"
                    : "Employee Access"
              }

            </strong>

          </div>


          {/* ACCOUNT STATUS */}

          <div className="settings-access-card">

            <span className="settings-access-label">

              Account Status

            </span>


            <div className="settings-active-status">

              <span className="settings-active-dot" />

              Active

            </div>

          </div>


        </div>

      </section>


    </div>

  );

}


export default Settings;