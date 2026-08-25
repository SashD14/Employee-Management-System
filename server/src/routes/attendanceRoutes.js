const express = require("express");

const router = express.Router();

const validateAttendance =
  require("../middleware/attendanceValidation");

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/authorize");

const {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");


router.use(authenticate);


router.get(
  "/",
  authorize("Admin", "HR", "Manager"),
  getAttendance
);


router.get(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  getAttendanceById
);


router.post(
  "/",
  authorize("Admin", "HR", "Manager"),
  validateAttendance,
  createAttendance
);


router.put(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  validateAttendance,
  updateAttendance
);


router.delete(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  deleteAttendance
);


module.exports = router;