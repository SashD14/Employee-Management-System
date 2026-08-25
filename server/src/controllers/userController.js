const bcrypt = require("bcryptjs");
const db = require("../config/db");


// =========================
// CHANGE PASSWORD
// =========================

const changePassword = async (
  req,
  res,
  next
) => {

  try {

    console.log(
      "Change password request:",
      req.user
    );


    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;


    // =========================
    // VALIDATE FIELDS
    // =========================

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      return res.status(400).json({
        message:
          "All password fields are required",
      });

    }


    if (
      newPassword !== confirmPassword
    ) {

      return res.status(400).json({
        message:
          "New passwords do not match",
      });

    }


    if (
      newPassword.length < 6
    ) {

      return res.status(400).json({
        message:
          "New password must be at least 6 characters",
      });

    }


    // =========================
    // GET CURRENT USER
    // =========================

    const userId =
      req.user.userId;


    console.log(
      "Logged-in user ID:",
      userId
    );


    const [rows] =
      await db.query(
        `
        SELECT
          id,
          password
        FROM users
        WHERE id = ?
        `,
        [userId]
      );


    if (rows.length === 0) {

      return res.status(404).json({
        message:
          "User account not found",
      });

    }


    const user =
      rows[0];


    // =========================
    // VERIFY CURRENT PASSWORD
    // =========================

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!passwordMatch) {

      return res.status(400).json({
        message:
          "Current password is incorrect",
      });

    }


    // =========================
    // HASH NEW PASSWORD
    // =========================

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );


    // =========================
    // UPDATE PASSWORD
    // =========================

    await db.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [
        hashedPassword,
        userId,
      ]
    );


    console.log(
      "Password changed successfully for user:",
      userId
    );


    // =========================
    // SUCCESS RESPONSE
    // =========================

    return res.status(200).json({
      message:
        "Password changed successfully",
    });


  } catch (error) {

    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );


    return res.status(500).json({
      message:
        error.message ||
        "Failed to change password",
    });

  }

};


module.exports = {
  changePassword,
};