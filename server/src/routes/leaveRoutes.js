const express = require("express");

const router = express.Router();

const validateLeave =
  require("../middleware/leaveValidation");

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/authorize");

const {
  getLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveController");


router.use(authenticate);


router.get(
  "/",
  authorize("Admin", "HR", "Manager"),
  getLeaves
);


router.get(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  getLeaveById
);


router.post(
  "/",
  authorize("Admin", "HR", "Manager"),
  validateLeave,
  createLeave
);


router.put(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  validateLeave,
  updateLeave
);


router.delete(
  "/:id",
  authorize("Admin", "HR", "Manager"),
  deleteLeave
);


module.exports = router;