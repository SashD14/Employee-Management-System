const express = require("express");

const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const validateEmployee =
  require("../middleware/employeeValidation");

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/authorize");


router.use(authenticate);


router.get(
  "/",
  authorize("Admin", "HR", "Manager"),
  getEmployees
);


router.get(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  getEmployeeById
);


router.post(
  "/",
  authorize("Admin", "HR", "Manager"),
  validateEmployee,
  createEmployee
);


router.put(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  validateEmployee,
  updateEmployee
);


router.delete(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  deleteEmployee
);


module.exports = router;