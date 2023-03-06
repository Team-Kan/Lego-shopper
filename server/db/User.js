const client = require("./client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);

const createUser = async ({ username, password }) => {
  // we are now not returning the password
  // We are now hashing the passwords before they are sent to the database
  try {
    const hash = bcrypt.hashSync(password, salt)
    const SQL = `
      INSERT INTO users(username, password)
      VALUES($1, $2) 
      RETURNING id, username, "isAdmin"
    `;

    const {rows: [user]} = await client.query(SQL, [username, hash]);

    return user
  } catch (error) {
    console.error(error)
  }
};

const getUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
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

    return user;  
  } catch (error) {
    console.error(error)
  }
};

const authenticate = async ({ username, password }) => {
  try {
    const SQL = `
      SELECT id, username, "isAdmin"
      FROM users
      WHERE username = $1 and password = $2
    `;
    const hash = bcrypt.hashSync(password, salt)
    const {rows: [user]} = await client.query(SQL, [username, hash]);
  
    if (!user.id) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    return jwt.sign(user, process.env.JWT);
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async () => {
  try {
    const { rows: users} = await client.query(`
      SELECT id, username, "isAdmin"
      FROM users
    `);

    return users
  } catch (error) {
    console.error(error)
  }

}

const editIsAdmin = async ({ id, isAdmin }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
        `
        UPDATE users
        SET "isAdmin" = $1
        WHERE id = $2
        RETURNING username, id, "isAdmin"
        `, [!isAdmin, id]
      ); /*Turn isAdmin to the opposite,
     so we can use the function for adding and removing admins
     */
  
    return user;
  } catch (error) {
    console.error(error)
  }
  
};

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getAllUsers,
  editIsAdmin,
};
