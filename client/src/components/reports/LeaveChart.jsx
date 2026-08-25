import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

import "../../styles/reportChart.css";


// =========================
// CUSTOM TOOLTIP
// =========================

function CustomTooltip({
  active,
  payload,
}) {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const item = payload[0];

  const totalRequests =
    payload[0].payload.totalRequests;

  const percentage =
    totalRequests > 0
      ? (
          (item.value / totalRequests) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="report-chart-tooltip">

      <strong>
        {item.name}
      </strong>

      <span>
        Requests: {item.value}
      </span>

      <span>
        Percentage: {percentage}%
      </span>

    </div>
  );
}


// =========================
// LEAVE CHART
// =========================

function LeaveChart({ leaves }) {

  const pendingCount =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;


  const approvedCount =
    leaves.filter(
      (leave) =>
        leave.status === "Approved"
    ).length;


  const rejectedCount =
    leaves.filter(
      (leave) =>
        leave.status === "Rejected"
    ).length;


  // =========================
  // TOTAL REQUESTS
  // =========================

  const totalRequests =
    leaves.length;


  // =========================
  // CHART DATA
  // =========================

  const data = [
    {
      name: "Pending",
      value: pendingCount,
      totalRequests,
    },
    {
      name: "Approved",
      value: approvedCount,
      totalRequests,
    },
    {
      name: "Rejected",
      value: rejectedCount,
      totalRequests,
    },
  ].filter(
    (item) => item.value > 0
  );


  // =========================
  // COLORS
  // =========================

  const COLORS = [
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];


  return (

    <div className="report-chart">

      {/* =========================
          CHART HEADER
      ========================== */}

      <div className="report-chart-header">

        <div>

          <h2>
            Leave Status Distribution
          </h2>

          <p>
            Overview of employee leave requests
          </p>

        </div>


        <span className="report-chart-total">
          {totalRequests} Requests
        </span>

      </div>


      {/* =========================
          CHART
      ========================== */}

      {data.length === 0 ? (

        <div className="no-chart-data">
          No leave data available.
        </div>

      ) : (

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={105}
                paddingAngle={3}
              >

                {data.map((entry) => (

                  <Cell
                    key={entry.name}
                    fill={
                      COLORS[
                        [
                          "Pending",
                          "Approved",
                          "Rejected",
                        ].indexOf(entry.name)
                      ]
                    }
                  />

                ))}

                <Label
                  value={`${totalRequests} Requests`}
                  position="center"
                  className="donut-center-label"
                />

              </Pie>


              {/* CUSTOM TOOLTIP */}

              <Tooltip
                content={CustomTooltip}
              />


              <Legend
                verticalAlign="bottom"
                height={36}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );
}


export default LeaveChart;