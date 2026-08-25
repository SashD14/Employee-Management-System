const express = require("express");

const router = express.Router();

const {
  changePassword,
} = require(
  "../controllers/userController"
);

const authMiddleware =
  require("../middleware/authMiddleware");


// =========================
// CHANGE PASSWORD
// =========================

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);


module.exports = router;