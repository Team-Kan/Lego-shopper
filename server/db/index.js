const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  const SQL = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
  `;
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
