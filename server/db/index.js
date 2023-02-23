const client = require('./client');
const { createCollection } = require('./collection');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  const SQL = `
  DROP TABLE IF EXISTS carts_products;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS collections;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE
  );
  CREATE TABLE collections(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
  );
  CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users (id),
    "isActive" BOOLEAN DEFAULT TRUE
  );
  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    "collectionId" INTEGER REFERENCES collections (id),
    price INTEGER NOT NULL,
    "imageUrl" VARCHAR NOT NULL,
    "pieceCount" INTEGER NOT NULL,
    quantity INTEGER NOT NULL
  );
  CREATE TABLE carts_products(
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES carts (id),
    "productId" INTEGER REFERENCES products (id),
    quantity INTEGER NOT NULL,
    UNIQUE ("cartId", "productId")
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

  const firstCollection = await createCollection({name: "Lego® City"});
  console.log("---- seeded Collection -----");
  console.log(firstCollection)
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
