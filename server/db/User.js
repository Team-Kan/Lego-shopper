const client = require("./client");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const createUser = async ({ username, password }) => {
  // we are now not returning the password
  const SQL = `
    INSERT INTO users(username, password)
    VALUES($1, $2) 
    RETURNING id, username, "isAdmin"
  `;
  const response = await client.query(SQL, [username, password]);
  return response.rows[0];
};

const getUserByToken = async (token) => {
  const payload = await jwt.verify(token, JWT);
  const SQL = `
    SELECT id, username, "isAdmin"
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [payload.id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id
    FROM users
    WHERE username = $1 and password = $2
  `;
  const response = await client.query(SQL, [username, password]);
  console.log(response);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id }, JWT);
};

const editIsAdmin = async ({ id, isAdmin }) => {
  const {
    rows: [user],
  } = await client.query(
    `
  UPDATE users
  SET "isAdmin" = $1
  WHERE id = $2
  RETURNING username, id, "isAdmin"
  `,
    [!isAdmin, id]
  ); /*Turn isAdmin to the opposite,
   so we can use the function for adding and removing admins
   */

  return user;
};

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  editIsAdmin,
};
