require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createManagerUser = async () => {
  try {
    const name = "Manager User";
    const email = "manager@company.com";
    const password = "Manager@123";
    const role = "Manager";
    const status = "Active";

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const [result] = await db.query(
      `INSERT INTO users
       (name, email, password, role, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        role,
        status,
      ]
    );

    console.log("Manager user created successfully");
    console.log(
      "Manager User ID:",
      result.insertId
    );

  } catch (error) {
    console.error(
      "Error creating Manager user:",
      error
    );
  } finally {
    await db.end();
  }
};

createManagerUser();