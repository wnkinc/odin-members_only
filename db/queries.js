// queries.js
const pool = require("./pool");

async function insertUser(firstName, lastName, username, email, hash, salt) {
  const checkUsername = `
    SELECT 1 FROM users WHERE username = $1;`;
  const checkUsernameResult = await pool.query(checkUsername, [username]);
  if (checkUsernameResult.rowCount > 0) {
    throw new Error("Username already taken");
  }

  const checkEmail = `
    SELECT 1 FROM users WHERE email = $1;`;
  const checkEmailResult = await pool.query(checkEmail, [email]);
  if (checkEmailResult.rowCount > 0) {
    throw new Error("Email already taken");
  }

  const query = `
        INSERT INTO users (firstName, lastName, username, email, hash, salt)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `;
  const result = await pool.query(query, [
    firstName,
    lastName,
    username,
    email,
    hash,
    salt,
  ]);

  // Return the inserted user ID
  return result.rows[0].id;
}

async function grantMembership(userId) {
  const checkUserExists = `
    SELECT 1 FROM users WHERE id = $1;
  `;
  const checkUserExistsResult = await pool.query(checkUserExists, [userId]);

  if (checkUserExistsResult.rowCount === 0) {
    throw new Error("User not found");
  }

  const updateMembershipStatus = `
    UPDATE users
    SET membership_status = true
    WHERE id = $1
    RETURNING id;
  `;

  const result = await pool.query(updateMembershipStatus, [userId]);

  // Return the updated user object
  return result.rows[0];
}

module.exports = {
  insertUser,
  grantMembership,
};
