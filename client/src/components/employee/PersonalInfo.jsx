import "../../styles/personalInfo.css";

function PersonalInfo({ employee }) {
  return (
    <div className="personal-info">

      <h2>Personal Information</h2>

      <div className="info-grid">

        <div className="info-item">
          <span>Email</span>
          <p>{employee.email}</p>
        </div>

        <div className="info-item">
          <span>Department</span>
          <p>{employee.department}</p>
        </div>

        <div className="info-item">
          <span>Role</span>
          <p>{employee.role}</p>
        </div>

        <div className="info-item">
          <span>Status</span>
          <p>{employee.status}</p>
        </div>

      </div>

    </div>
  );
}

export default PersonalInfo;