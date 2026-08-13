import { useState } from "react";

import { useActivities } from "../../context/useActivities";

import "../../styles/activityFeed.css";


function ActivityFeed() {

  const { activities } = useActivities();

  const [showAll, setShowAll] =
    useState(false);


  // =========================
  // DISPLAY ACTIVITIES
  // =========================

  const displayedActivities =
    showAll
      ? activities
      : activities.slice(0, 5);


  return (

    <section className="activity-feed">


      {/* =========================
          HEADER
      ========================== */}

      <div className="activity-feed-header">

        <div>

          <h2>
            Recent Activity
          </h2>

          <p>
            Latest activity across the system
          </p>

        </div>


        <span className="activity-feed-count">
          {activities.length}
        </span>

      </div>


      {/* =========================
          ACTIVITY LIST
      ========================== */}

      <div className="activity-feed-list">

        {displayedActivities.length > 0 ? (

          displayedActivities.map(
            (activity) => (

              <div
                className="activity-feed-item"
                key={activity.id}
              >

                <div className="activity-feed-icon">
                  {activity.icon || "•"}
                </div>


                <div className="activity-feed-content">

                  <p>
                    {activity.message}
                  </p>

                  <span>
                    {formatActivityTime(
                      activity.createdAt
                    )}
                  </span>

                </div>

              </div>

            )
          )

        ) : (

          <div className="activity-feed-empty">

            <div className="activity-feed-empty-icon">
              ✓
            </div>

            <p>
              No recent activity
            </p>

          </div>

        )}

      </div>


      {/* =========================
          FOOTER
      ========================== */}

      {activities.length > 5 && (

        <div className="activity-feed-footer">

          <span>
            {showAll
              ? `Showing all ${activities.length} activities`
              : `Showing 5 of ${activities.length} activities`}
          </span>


          <button
            type="button"
            onClick={() =>
              setShowAll(
                (currentValue) =>
                  !currentValue
              )
            }
          >
            {showAll
              ? "Show Less"
              : "View All"}
          </button>

        </div>

      )}

    </section>

  );
}


// =========================
// FORMAT ACTIVITY TIME
// =========================

function formatActivityTime(date) {

  if (!date) {
    return "";
  }


  const activityDate =
    new Date(date);


  const now =
    new Date();


  const difference =
    now.getTime() -
    activityDate.getTime();


  const seconds =
    Math.floor(
      difference / 1000
    );


  if (seconds < 60) {
    return "Just now";
  }


  const minutes =
    Math.floor(
      seconds / 60
    );


  if (minutes < 60) {

    return `${minutes} minute${
      minutes === 1
        ? ""
        : "s"
    } ago`;

  }


  const hours =
    Math.floor(
      minutes / 60
    );


  if (hours < 24) {

    return `${hours} hour${
      hours === 1
        ? ""
        : "s"
    } ago`;

  }


  const days =
    Math.floor(
      hours / 24
    );


  return `${days} day${
    days === 1
      ? ""
      : "s"
  } ago`;

}


export default ActivityFeed;