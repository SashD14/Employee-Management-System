const { body, validationResult } = require("express-validator");

const validateAttendance = [
  body("employee_id")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isInt({ min: 1 })
    .withMessage("Employee ID must be a positive integer"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format")
    .custom((value) => {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));

      if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
      ) {
        throw new Error("Invalid calendar date");
      }

      return true;
    }),

  body("status")
    .trim()
    .isIn(["Present", "Absent", "Leave", "Half Day"])
    .withMessage(
      "Status must be Present, Absent, Leave, or Half Day"
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateAttendance;