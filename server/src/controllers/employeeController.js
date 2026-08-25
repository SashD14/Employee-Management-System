const db = require("../config/db");

const getEmployees = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");

    res.json(rows);
  } catch (error) {
       next(error);
    }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
       next(error);
    }
};

const createEmployee = async (req, res, next) => {
  try {
    const {
      name,
      role,
      department,
      email,
      status,
    } = req.body;

    const [existingEmployees] = await db.query(
      "SELECT id FROM employees WHERE email = ?",
      [email]
    );

    if (existingEmployees.length > 0) {
      return res.status(409).json({
        message: "An employee with this email already exists",
      });
    }

    const [result] = await db.query(
      `INSERT INTO employees
       (name, role, department, email, status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, role, department, email, status]
    );

    res.status(201).json({
      message: "Employee created successfully",
      employeeId: result.insertId,
    });
  } catch (error) {
       next(error);
    }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { name, role, department, email, status } = req.body;

    const [existingEmployees] = await db.query(
      `SELECT id
      FROM employees
      WHERE email = ?
      AND id != ?`,
      [email, req.params.id]
    );

    if (existingEmployees.length > 0) {
      return res.status(409).json({
        message: "Another employee with this email already exists",
      });
    }

    const [result] = await db.query(
      `UPDATE employees
       SET name = ?, role = ?, department = ?, email = ?, status = ?
       WHERE id = ?`,
      [name, role, department, email, status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id]
    );

    res.json({
      message: "Employee updated successfully",
      employee: rows[0],
    });
  } catch (error) {
       next(error);
    }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const [result] = await db.query(
      "DELETE FROM employees WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
       next(error);
    }
};
module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};