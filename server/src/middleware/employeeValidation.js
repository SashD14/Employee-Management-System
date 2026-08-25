const { body, validationResult } = require("express-validator");

const validateEmployee = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

  body("status")
    .trim()
    .isIn(["Active", "Inactive"])
    .withMessage("Status must be Active or Inactive"),

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

module.exports = validateEmployee;