const client = require("./client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);
const JWT = process.env.JWT

const createUser = async ({ username, password }) => {
  // we are now not returning the password
  // We are now hashing the passwords before they are sent to the database
  const hash = bcrypt.hashSync(password, salt)
  const SQL = `
    INSERT INTO users(username, password)
    VALUES($1, $2) 
    RETURNING id, username, "isAdmin"
  `;

  const {rows: [user]} = await client.query(SQL, [username, hash]);

  return user
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
    SELECT id, username, "isAdmin"
    FROM users
    WHERE username = $1 and password = $2
  `;
  const hash = bcrypt.hashSync(password, salt)
  const {rows: [user]} = await client.query(SQL, [username, hash]);
  
  if (!user) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return jwt.sign(user, process.env.JWT);
};

const getAllUsers = async () => {
  const { rows: users} = await client.query(`
    SELECT id, username, "isAdmin"
    FROM users
  `);

  return users
}

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
  getAllUsers,
  editIsAdmin,
};
