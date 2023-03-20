const client = require("./client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);


const createUser = async ({ username, password }) => {
  // we are now not returning the password
  // We are now hashing the passwords before they are sent to the database
  try {
    if(!username || !password){
      const error = new Error("Please enter a username and password")
      error.status = 400;
      throw error;
    }
    // const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    // // This is used to make sure the username is an email
    // if(!regex.test(username)){
    //   const error = new Error("Plese enter a Valid email")
    //   error.status = 400
    //   throw error
    // }

    if(password.length < 8){
      const error = new Error("password must be atleast 8 characters long.")
      error.status = 400;
      throw error;
    }
    const hash = bcrypt.hashSync(password, salt)
    const SQL = `
      INSERT INTO users(username, password)
      VALUES($1, $2) 
      RETURNING id, username, "isAdmin"
    `;

    const {rows: [user]} = await client.query(SQL, [username, hash]);

    return user;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

const authenticate = async ({ username, password }) => {
  try {
    if(!username || !password){
      const error = new Error("Please enter a username and password")
      error.status = 400;
      throw error;
    }
    const {rows: [pass]} = await client.query(`
      SELECT password
      FROM users
      WHERE username = $1 
    `, [username])
    const isEqual = await bcrypt.compare(password, pass.password);

    if(isEqual){
    const SQL = `
      SELECT id, username, "isAdmin"
      FROM users
      WHERE username = $1 and password = $2
    `;
    
    const {rows: [user]} = await client.query(SQL, [username, pass.password]);
  
    if (!user) {
      const error = Error("Password or username are incorrect");
      error.status = 401;
      throw error;
    }
    return jwt.sign(user, process.env.JWT);
  } else {
    const error = Error("Password or username are incorrect");
    error.status = 401;
    throw error;
  }
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows: users} = await client.query(`
      SELECT id, username, "isAdmin"
      FROM users
      ORDER BY id
    `);

    return users
  } catch (error) {
    throw error;
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
    throw error
  }
  
};

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getAllUsers,
  editIsAdmin,
};
