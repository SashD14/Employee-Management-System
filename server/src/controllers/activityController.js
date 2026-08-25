const db = require("../config/db");

// =========================
// GET ACTIVITIES
// =========================

const getActivities = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        employee_id,
        type,
        message,
        icon,
        created_at
      FROM activities
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    next(error);
  }
};


// =========================
// CREATE ACTIVITY
// =========================

const createActivity = async (req, res, next) => {
  try {
    const {
      employee_id,
      type,
      message,
      icon,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO activities
       (employee_id, type, message, icon)
       VALUES (?, ?, ?, ?)`,
      [
        employee_id || null,
        type,
        message,
        icon || null,
      ]
    );

    res.status(201).json({
      message: "Activity created successfully",
      activityId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};


// =========================
// DELETE ALL ACTIVITIES
// =========================

const clearActivities = async (req, res, next) => {
  try {
    await db.query("DELETE FROM activities");

    res.json({
      message: "Activities cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getActivities,
  createActivity,
  clearActivities,
};