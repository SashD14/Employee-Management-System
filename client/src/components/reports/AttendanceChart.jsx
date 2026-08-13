import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../../styles/reportChart.css";

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

  const data = [
    {
      name: "Present",
      value: presentCount,
    },
    {
      name: "Absent",
      value: absentCount,
    },
    {
      name: "Leave",
      value: leaveCount,
    },
    {
      name: "Half Day",
      value: halfDayCount,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
  ];

  return (
    <div className="report-chart">

      <h2>Attendance Distribution</h2>

      {data.every((item) => item.value === 0) ? (
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
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}

export default AttendanceChart;