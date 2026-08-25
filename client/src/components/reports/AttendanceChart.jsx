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

  const totalRecords =
    payload[0].payload.totalRecords;

  const percentage =
    totalRecords > 0
      ? (
          (item.value / totalRecords) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="report-chart-tooltip">

      <strong>
        {item.name}
      </strong>

      <span>
        Records: {item.value}
      </span>

      <span>
        Percentage: {percentage}%
      </span>

    </div>
  );
}


// =========================
// ATTENDANCE CHART
// =========================

function AttendanceChart({ attendance }) {

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const leaveCount = attendance.filter(
    (record) => record.status === "Leave"
  ).length;

  const halfDayCount = attendance.filter(
    (record) => record.status === "Half Day"
  ).length;


  const totalRecords = attendance.length;


  const data = [
    {
      name: "Present",
      value: presentCount,
      totalRecords,
    },
    {
      name: "Absent",
      value: absentCount,
      totalRecords,
    },
    {
      name: "Leave",
      value: leaveCount,
      totalRecords,
    },
    {
      name: "Half Day",
      value: halfDayCount,
      totalRecords,
    },
  ].filter(
    (item) => item.value > 0
  );


  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
  ];


  return (
    <div className="report-chart">

      <div className="report-chart-header">

        <div>

          <h2>
            Attendance Distribution
          </h2>

          <p>
            Overview of attendance records
          </p>

        </div>

        <span className="report-chart-total">
          {totalRecords} Records
        </span>

      </div>


      {data.length === 0 ? (

        <div className="no-chart-data">
          No attendance data available.
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
                          "Present",
                          "Absent",
                          "Leave",
                          "Half Day",
                        ].indexOf(entry.name)
                      ]
                    }
                  />

                ))}

                <Label
                  value={`${totalRecords} Records`}
                  position="center"
                  className="donut-center-label"
                />

              </Pie>


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


export default AttendanceChart;