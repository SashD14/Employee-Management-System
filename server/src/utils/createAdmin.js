require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

const createAdmin = async () => {
  try {
    const name = "Admin";
    const email = "admin@company.com";
    const password = "Admin@123";
    const role = "Admin";
    const status = "Active";

    const hashedPassword = await bcrypt.hash(password, 10);

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

    console.log("Admin created successfully");
    console.log("Admin ID:", result.insertId);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await db.end();
  }
};

createAdmin();