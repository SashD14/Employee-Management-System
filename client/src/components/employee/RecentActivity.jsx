import { useActivities } from "../../context/useActivities";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
  FaUser,
  FaUserPlus,
  FaUserEdit,
  FaTrash,
} from "react-icons/fa";

import "../../styles/recentActivity.css";


function RecentActivity({
  employeeId,
}) {

  const { activities } =
    useActivities();


  const employeeActivities =
    activities.filter(
      (activity) =>
        activity.employeeId === employeeId
    );


  return (
    <div className="recent-activity">

      <h2>Recent Activity</h2>


      {employeeActivities.length === 0 ? (

        <p className="no-activity">
          No recent activity.
        </p>

      ) : (

        employeeActivities.map(
          (activity) => (

            <div
              key={activity.id}
              className="activity-item"
            >

              <div
                className={`activity-icon ${getActivityClass(
                  activity.type
                )}`}
              >
                {getActivityIcon(
                  activity.type
                )}
              </div>


              <div className="activity-content">

                <p>
                  {activity.message}
                </p>

                <small>
                  {formatActivityTime(
                    activity.createdAt
                  )}
                </small>

              </div>

            </div>

          )
        )

      )}

    </div>
  );
}


// =========================
// ACTIVITY ICON
// =========================

function getActivityIcon(type) {

  switch (type) {

    case "leave-approved":
      return <FaCheckCircle />;

    case "leave-rejected":
      return <FaTimesCircle />;

    case "attendance-updated":
      return <FaCalendarCheck />;

    case "employee-added":
      return <FaUserPlus />;

    case "employee-updated":
      return <FaUserEdit />;

    case "employee-deleted":
      return <FaTrash />;

    default:
      return <FaUser />;

  }
}


// =========================
// ACTIVITY COLOR
// =========================

function getActivityClass(type) {

  switch (type) {

    case "leave-approved":
      return "activity-approved";

    case "leave-rejected":
      return "activity-rejected";

    case "attendance-updated":
      return "activity-attendance";

    case "employee-added":
      return "activity-added";

    case "employee-updated":
      return "activity-updated";

    case "employee-deleted":
      return "activity-deleted";

    default:
      return "activity-default";

  }
}


// =========================
// FORMAT TIME
// =========================

function formatActivityTime(
  createdAt
) {

  const activityDate =
    new Date(createdAt);


  return activityDate.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}


export default RecentActivity;