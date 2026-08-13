import "../styles/navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Employee Management System</h2>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search employee..."
        />

        <button>⚙️</button>

        <span>👤 Admin</span>
      </div>
    </nav>
  );
}

export default Navbar;