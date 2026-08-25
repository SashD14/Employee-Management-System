require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createEmployeeUser = async () => {
  try {
    const name = "Sahil User";
    const email = "employee@company.com";
    const password = "Employee@123";
    const role = "Employee";
    const status = "Active";
    const employeeId = 2;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users
       (employee_id, name, email, password, role, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        name,
        email,
        hashedPassword,
        role,
        status,
      ]
    );

    console.log("Employee user created successfully");
    console.log("User ID:", result.insertId);
  } catch (error) {
    console.error("Error creating employee user:", error);
  } finally {
    await db.end();
  }
};

createEmployeeUser();