require("dotenv").config();

const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 5000;

db.query("SELECT 1")
  .then(() => {
    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error);
  });