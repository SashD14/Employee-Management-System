const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/authorize");

const {
  getActivities,
  createActivity,
  clearActivities,
} = require("../controllers/activityController");


router.use(authenticate);


router.get(
  "/",
  authorize("Admin", "HR", "Manager"),
  getActivities
);


router.post(
  "/",
  authorize("Admin", "HR", "Manager"),
  createActivity
);


router.delete(
  "/",
  authorize("Admin", "Manager"),
  clearActivities
);


module.exports = router;