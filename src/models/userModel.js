const db = require("../config/db");

exports.createUser = async (name, email) => {
  const result = await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );

  return result.rows[0];
};

exports.getUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

exports.getUserById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
};

exports.updateUser = async (id, name, email) => {
  const result = await db.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id],
  );

  return result.rows[0];
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id=$1", [id]);
};
