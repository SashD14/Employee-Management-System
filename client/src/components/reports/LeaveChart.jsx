import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../../styles/reportChart.css";


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


  const data = [
    {
      name: "Pending",
      value: pendingCount,
    },
    {
      name: "Approved",
      value: approvedCount,
    },
    {
      name: "Rejected",
      value: rejectedCount,
    },
  ];


  const COLORS = [
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];


  return (

    <div className="report-chart">

      <h2>
        Leave Status Distribution
      </h2>


      {data.every(
        (item) => item.value === 0
      ) ? (

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
                cy="50%"
                outerRadius={100}
                label
              >

                {data.map(
                  (entry, index) => (

                    <Cell
                      key={entry.name}
                      fill={
                        COLORS[index]
                      }
                    />

                  )
                )}

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


export default LeaveChart;