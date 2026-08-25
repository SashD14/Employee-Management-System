const db = require("../config/db");

const createActivity =
  require("../utils/createActivity");


// =========================
// GET ALL LEAVES
// =========================

const getLeaves = async (req, res, next) => {
  try {

    const [rows] = await db.query(`
      SELECT
        leaves.id,
        leaves.employee_id,
        employees.name,
        leaves.leave_type,
        DATE_FORMAT(
          leaves.start_date,
          '%Y-%m-%d'
        ) AS start_date,
        DATE_FORMAT(
          leaves.end_date,
          '%Y-%m-%d'
        ) AS end_date,
        leaves.reason,
        leaves.status
      FROM leaves
      JOIN employees
        ON leaves.employee_id = employees.id
    `);

    res.json(rows);

  } catch (error) {
    next(error);
  }
};


// =========================
// GET LEAVE BY ID
// =========================

const getLeaveById = async (
  req,
  res,
  next
) => {
  try {

    const [rows] = await db.query(
      `
      SELECT
        leaves.id,
        leaves.employee_id,
        employees.name,
        leaves.leave_type,
        DATE_FORMAT(
          leaves.start_date,
          '%Y-%m-%d'
        ) AS start_date,
        DATE_FORMAT(
          leaves.end_date,
          '%Y-%m-%d'
        ) AS end_date,
        leaves.reason,
        leaves.status
      FROM leaves
      JOIN employees
        ON leaves.employee_id = employees.id
      WHERE leaves.id = ?
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Leave record not found",
      });
    }

    res.json(rows[0]);

  } catch (error) {
    next(error);
  }
};


// =========================
// CREATE LEAVE
// =========================

const createLeave = async (
  req,
  res,
  next
) => {
  try {

    const {
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
      status,
    } = req.body;


    // =========================
    // CHECK EMPLOYEE EXISTS
    // =========================

    const [employees] = await db.query(
      `
      SELECT
        id,
        name
      FROM employees
      WHERE id = ?
      `,
      [employee_id]
    );

    if (employees.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }


    const employee = employees[0];


    // =========================
    // CREATE LEAVE
    // =========================

    const [result] = await db.query(
      `
      INSERT INTO leaves
      (
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status,
      ]
    );


    // =========================
    // CREATE ACTIVITY
    // =========================

    await createActivity({
      employeeId: employee_id,
      type: "leave-requested",
      message:
        `Leave requested: ${employee.name}`,
      icon: "•",
    });


    res.status(201).json({
      message: "Leave created successfully",
      leaveId: result.insertId,
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// UPDATE LEAVE
// =========================

const updateLeave = async (
  req,
  res,
  next
) => {
  try {

    const {
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
      status,
    } = req.body;


    // =========================
    // GET EXISTING LEAVE
    // =========================

    const [existingLeaves] = await db.query(
      `
      SELECT
        leaves.id,
        leaves.employee_id,
        leaves.status,
        employees.name
      FROM leaves
      JOIN employees
        ON leaves.employee_id = employees.id
      WHERE leaves.id = ?
      `,
      [req.params.id]
    );

    if (existingLeaves.length === 0) {
      return res.status(404).json({
        message: "Leave record not found",
      });
    }


    const existingLeave =
      existingLeaves[0];


    // =========================
    // CHECK EMPLOYEE EXISTS
    // =========================

    const [employees] = await db.query(
      `
      SELECT
        id,
        name
      FROM employees
      WHERE id = ?
      `,
      [employee_id]
    );

    if (employees.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }


    const employee = employees[0];


    // =========================
    // UPDATE LEAVE
    // =========================

    await db.query(
      `
      UPDATE leaves
      SET
        employee_id = ?,
        leave_type = ?,
        start_date = ?,
        end_date = ?,
        reason = ?,
        status = ?
      WHERE id = ?
      `,
      [
        employee_id,
        leave_type,
        start_date,
        end_date,
        reason,
        status,
        req.params.id,
      ]
    );


    // =========================
    // CREATE ACTIVITY ONLY
    // WHEN STATUS CHANGES
    // =========================

    if (
      existingLeave.status !== status &&
      status === "Approved"
    ) {

      await createActivity({
        employeeId: employee_id,
        type: "leave-approved",
        message:
          `Leave approved: ${employee.name}`,
        icon: "✓",
      });

    }


    if (
      existingLeave.status !== status &&
      status === "Rejected"
    ) {

      await createActivity({
        employeeId: employee_id,
        type: "leave-rejected",
        message:
          `Leave rejected: ${employee.name}`,
        icon: "×",
      });

    }


    // =========================
    // GET UPDATED LEAVE
    // =========================

    const [rows] = await db.query(
      `
      SELECT
        leaves.id,
        leaves.employee_id,
        employees.name,
        leaves.leave_type,
        DATE_FORMAT(
          leaves.start_date,
          '%Y-%m-%d'
        ) AS start_date,
        DATE_FORMAT(
          leaves.end_date,
          '%Y-%m-%d'
        ) AS end_date,
        leaves.reason,
        leaves.status
      FROM leaves
      JOIN employees
        ON leaves.employee_id = employees.id
      WHERE leaves.id = ?
      `,
      [req.params.id]
    );


    res.json({
      message: "Leave updated successfully",
      leave: rows[0],
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// DELETE LEAVE
// =========================

const deleteLeave = async (
  req,
  res,
  next
) => {
  try {


    // =========================
    // GET LEAVE BEFORE DELETE
    // =========================

    const [leaves] = await db.query(
      `
      SELECT
        leaves.id,
        leaves.employee_id,
        employees.name
      FROM leaves
      JOIN employees
        ON leaves.employee_id = employees.id
      WHERE leaves.id = ?
      `,
      [req.params.id]
    );


    if (leaves.length === 0) {
      return res.status(404).json({
        message: "Leave record not found",
      });
    }


    const leave =
      leaves[0];


    // =========================
    // DELETE LEAVE
    // =========================

    await db.query(
      `
      DELETE FROM leaves
      WHERE id = ?
      `,
      [req.params.id]
    );


    // =========================
    // CREATE ACTIVITY
    // =========================

    await createActivity({
      employeeId: leave.employee_id,
      type: "leave-deleted",
      message:
        `Leave request deleted: ${leave.name}`,
      icon: "−",
    });


    res.json({
      message: "Leave deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// EXPORTS
// =========================

module.exports = {
  getLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
};