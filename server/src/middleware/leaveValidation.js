const { body, validationResult } = require("express-validator");

const validateLeave = [
  body("employee_id")
    .notEmpty()
    .withMessage("Employee ID is required")
    .isInt({ min: 1 })
    .withMessage("Employee ID must be a positive integer"),

  body("leave_type")
  .trim()
  .notEmpty()
  .withMessage("Leave type is required")
  .isIn([
    "Casual Leave",
    "Sick Leave",
    "Annual Leave",
    "Unpaid Leave",
  ])
  .withMessage(
    "Invalid leave type"
  ),

  body("start_date")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be in YYYY-MM-DD format")
    .custom((value) => {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));

      if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
      ) {
        throw new Error("Invalid start date");
      }

      return true;
    }),

  body("end_date")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be in YYYY-MM-DD format")
    .custom((value) => {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));

      if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
      ) {
        throw new Error("Invalid end date");
      }

      return true;
    }),

  body("end_date").custom((endDate, { req }) => {
    if (!req.body.start_date) {
      return true;
    }

    const start = new Date(`${req.body.start_date}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);

    if (end < start) {
      throw new Error("End date cannot be before start date");
    }

    return true;
  }),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required"),

  body("status")
    .trim()
    .isIn(["Pending", "Approved", "Rejected"])
    .withMessage("Status must be Pending, Approved, or Rejected"),

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

module.exports = validateLeave;