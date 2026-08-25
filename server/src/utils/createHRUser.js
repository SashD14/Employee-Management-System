require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createHRUser = async () => {
  try {
    const name = "HR User";
    const email = "hr@company.com";
    const password = "HR@123";
    const role = "HR";
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

    console.log("HR user created successfully");
    console.log("HR User ID:", result.insertId);

  } catch (error) {
    console.error(
      "Error creating HR user:",
      error
    );
  } finally {
    await db.end();
  }
};

createHRUser();