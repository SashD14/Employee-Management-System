import "../../styles/employeeCard.css";
import { useNavigate } from "react-router-dom";

const EmployeeCard = (props) => {

  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/employees/${props.id}`);
  }

  return (
    <div
      className="employee-card"
      onClick={handleCardClick}
    >
      <h3>{props.name}</h3>

      <p>{props.role}</p>

      <p>
        <strong>Department:</strong> {props.department}
      </p>

      <p>
        <strong>Email:</strong> {props.email}
      </p>

      <p className={props.status === "Active" ? "green" : "red"}>
        {props.status === "Active"
          ? "🟢 Active"
          : "🔴 Inactive"}
      </p>

      <div className="employee-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onEdit(props.id);
          }}
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;