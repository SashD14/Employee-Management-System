const db = require("../config/db");


const createActivity = async ({
  employeeId,
  type,
  message,
  icon,
}) => {

  const [result] = await db.query(
    `
    INSERT INTO activities
    (
      employee_id,
      type,
      message,
      icon
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      employeeId || null,
      type,
      message,
      icon || null,
    ]
  );

  return result.insertId;
};


module.exports = createActivity;