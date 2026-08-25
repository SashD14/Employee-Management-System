const db = require("../config/db");

const createActivity =
  require("../utils/createActivity");


// =========================
// GET EMPLOYEE ID FROM USER
// =========================

const getEmployeeIdFromUser = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT employee_id
    FROM users
    WHERE id = ?
    `,
    [userId]
  );

  if (
    rows.length === 0 ||
    !rows[0].employee_id
  ) {
    return null;
  }

  return rows[0].employee_id;
};


// =========================
// GET ALL ATTENDANCE
// =========================

const getAttendance = async (
  req,
  res,
  next
) => {
  try {

    let query = `
      SELECT
        attendance.id,
        attendance.employee_id,
        employees.name,
        DATE_FORMAT(
          attendance.date,
          '%Y-%m-%d'
        ) AS date,
        attendance.status
      FROM attendance
      JOIN employees
        ON attendance.employee_id = employees.id
    `;

    const values = [];


    // =========================
    // EMPLOYEE CAN ONLY SEE
    // OWN ATTENDANCE
    // =========================

    if (req.user.role === "Employee") {

      const employeeId =
        await getEmployeeIdFromUser(
          req.user.userId
        );


      if (!employeeId) {
        return res.status(403).json({
          message:
            "No employee profile is linked to this user account",
        });
      }


      query += `
        WHERE attendance.employee_id = ?
      `;

      values.push(employeeId);
    }


    query += `
      ORDER BY attendance.date DESC
    `;


    const [rows] =
      await db.query(
        query,
        values
      );


    res.json(rows);

  } catch (error) {
    next(error);
  }
};


// =========================
// GET ATTENDANCE BY ID
// =========================

const getAttendanceById = async (
  req,
  res,
  next
) => {
  try {

    let query = `
      SELECT
        attendance.id,
        attendance.employee_id,
        employees.name,
        DATE_FORMAT(
          attendance.date,
          '%Y-%m-%d'
        ) AS date,
        attendance.status
      FROM attendance
      JOIN employees
        ON attendance.employee_id = employees.id
      WHERE attendance.id = ?
    `;


    const values = [
      req.params.id,
    ];


    // =========================
    // EMPLOYEE CAN ONLY VIEW
    // OWN ATTENDANCE
    // =========================

    if (req.user.role === "Employee") {

      const employeeId =
        await getEmployeeIdFromUser(
          req.user.userId
        );


      if (!employeeId) {
        return res.status(403).json({
          message:
            "No employee profile is linked to this user account",
        });
      }


      query += `
        AND attendance.employee_id = ?
      `;

      values.push(employeeId);
    }


    const [rows] =
      await db.query(
        query,
        values
      );


    if (rows.length === 0) {
      return res.status(404).json({
        message:
          "Attendance record not found",
      });
    }


    res.json(rows[0]);

  } catch (error) {
    next(error);
  }
};


// =========================
// CREATE ATTENDANCE
// =========================

const createAttendance = async (
  req,
  res,
  next
) => {
  try {

    const {
      employee_id,
      date,
      status,
    } = req.body;


    // =========================
    // CHECK EMPLOYEE EXISTS
    // =========================

    const [employees] = await db.query(
      `
      SELECT id
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


    // =========================
    // CHECK DUPLICATE ATTENDANCE
    // =========================

    const [existingAttendance] =
      await db.query(
        `
        SELECT id
        FROM attendance
        WHERE employee_id = ?
        AND date = ?
        `,
        [
          employee_id,
          date,
        ]
      );


    if (existingAttendance.length > 0) {
      return res.status(409).json({
        message:
          "Attendance already exists for this employee on this date",
      });
    }


    // =========================
    // CREATE ATTENDANCE
    // =========================

    const [result] = await db.query(
      `
      INSERT INTO attendance
      (
        employee_id,
        date,
        status
      )
      VALUES (?, ?, ?)
      `,
      [
        employee_id,
        date,
        status,
      ]
    );


    // =========================
    // CREATE ACTIVITY
    // =========================

    await createActivity({
      employeeId: employee_id,
      type: "attendance-marked",
      message:
        `Attendance marked as ${status}`,
      icon:
        status === "Present"
          ? "✓"
          : status === "Absent"
            ? "×"
            : status === "Leave"
              ? "•"
              : "◐",
    });


    res.status(201).json({
      message:
        "Attendance created successfully",
      attendanceId:
        result.insertId,
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// UPDATE ATTENDANCE
// =========================

const updateAttendance = async (
  req,
  res,
  next
) => {
  try {

    const {
      employee_id,
      date,
      status,
    } = req.body;


    // =========================
    // CHECK RECORD EXISTS
    // =========================

    const [existingRecord] =
      await db.query(
        `
        SELECT id
        FROM attendance
        WHERE id = ?
        `,
        [req.params.id]
      );


    if (existingRecord.length === 0) {
      return res.status(404).json({
        message:
          "Attendance record not found",
      });
    }


    // =========================
    // CHECK EMPLOYEE EXISTS
    // =========================

    const [employees] = await db.query(
      `
      SELECT id
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


    // =========================
    // CHECK DUPLICATE ATTENDANCE
    // =========================

    const [duplicateAttendance] =
      await db.query(
        `
        SELECT id
        FROM attendance
        WHERE employee_id = ?
        AND date = ?
        AND id != ?
        `,
        [
          employee_id,
          date,
          req.params.id,
        ]
      );


    if (duplicateAttendance.length > 0) {
      return res.status(409).json({
        message:
          "Attendance already exists for this employee on this date",
      });
    }


    // =========================
    // UPDATE ATTENDANCE
    // =========================

    await db.query(
      `
      UPDATE attendance
      SET
        employee_id = ?,
        date = ?,
        status = ?
      WHERE id = ?
      `,
      [
        employee_id,
        date,
        status,
        req.params.id,
      ]
    );


    // =========================
    // CREATE ACTIVITY
    // =========================

    await createActivity({
      employeeId: employee_id,
      type: "attendance-updated",
      message:
        `Attendance updated to ${status}`,
      icon:
        status === "Present"
          ? "✓"
          : status === "Absent"
            ? "×"
            : status === "Leave"
              ? "•"
              : "◐",
    });


    // =========================
    // GET UPDATED RECORD
    // =========================

    const [rows] = await db.query(
      `
      SELECT
        attendance.id,
        attendance.employee_id,
        employees.name,
        DATE_FORMAT(
          attendance.date,
          '%Y-%m-%d'
        ) AS date,
        attendance.status
      FROM attendance
      JOIN employees
        ON attendance.employee_id = employees.id
      WHERE attendance.id = ?
      `,
      [req.params.id]
    );


    res.json({
      message:
        "Attendance updated successfully",
      attendance:
        rows[0],
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// DELETE ATTENDANCE
// =========================

const deleteAttendance = async (
  req,
  res,
  next
) => {
  try {

    // =========================
    // GET RECORD FIRST
    // =========================

    const [records] = await db.query(
      `
      SELECT
        employee_id,
        status
      FROM attendance
      WHERE id = ?
      `,
      [req.params.id]
    );


    if (records.length === 0) {
      return res.status(404).json({
        message:
          "Attendance record not found",
      });
    }


    const attendanceRecord =
      records[0];


    // =========================
    // DELETE ATTENDANCE
    // =========================

    await db.query(
      `
      DELETE FROM attendance
      WHERE id = ?
      `,
      [req.params.id]
    );


    // =========================
    // CREATE ACTIVITY
    // =========================

    await createActivity({
      employeeId:
        attendanceRecord.employee_id,

      type:
        "attendance-deleted",

      message:
        "Attendance record deleted",

      icon:
        "−",
    });


    res.json({
      message:
        "Attendance deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};


// =========================
// EXPORTS
// =========================

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};