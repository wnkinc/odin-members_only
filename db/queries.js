const pool = require("./pool");

async function insertUser(firstName, lastName, username, email, password) {
  const checkUsername = `
    SELECT 1 FROM users WHERE username = $1;`;
  const checkUsernameResult = await pool.query(checkUsername, [username]);
  if (checkUsernameResult.rowCount > 0) {
    throw new Error("Username already taken");
  }

  const checkEmail = `
    SELECT 1 FROM users WHERE username = $1;`;
  const checkEmailResult = await pool.query(checkEmail, [username]);
  if (checkEmailResult.rowCount > 0) {
    throw new Error("Email already taken");
  }

  const query = `
        INSERT INTO users (firstName, lastName, username, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;
  const result = await pool.query(query, [
    firstName,
    lastName,
    username,
    email,
    password,
  ]);

  // Return the inserted user ID
  return result.rows[0].id;
}

module.exports = {
  insertUser,
};
