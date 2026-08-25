import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");

  const storedUser =
    localStorage.getItem("user");

  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;


  // =========================
  // NOT LOGGED IN
  // =========================

  if (!token) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  // =========================
  // ROLE NOT ALLOWED
  // =========================

  if (
    allowedRoles &&
    (!user ||
      !allowedRoles.includes(
        user.role
      ))
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  // =========================
  // ACCESS ALLOWED
  // =========================

  return <Outlet />;
}

export default ProtectedRoute;