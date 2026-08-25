const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const activityRoutes = require("./routes/activityRoutes");

const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const userRoutes =
  require("./routes/userRoutes");

const app = express();

app.use(cors({
  origin: true,
}));



app.use(express.json());

app.get("/", (req, res) => {
  res.send("EMS Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/activities", activityRoutes);
app.use(
  "/api/users",
  userRoutes
);

app.use(errorHandler);

module.exports = app;