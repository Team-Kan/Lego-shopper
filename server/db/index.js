const client = require("./client");
const { createCollection } = require("./collection");
const { createCart } = require("./cart");
const { createProduct } = require("./product");
const { AttachProductToCart } = require("./cart_product");

const {
  getUserByToken,
  createUser,
  authenticate,
  editIsAdmin,
} = require("./User");

const syncTables = async () => {
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
    price REAL NOT NULL,
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
const createInitialUsers = async () => {
  const [nabeel, kristy, anthony] = await Promise.all([
    createUser({
      username: "nabeel",
      password: "nabeel_password",
    }),
    createUser({
      username: "kristy",
      password: "kristy_password",
    }),
    createUser({
      username: "actninswitch@gmail.com",
      password: "SomethingSecret",
    }),
  ]);

  console.log("--- seeded users ---");
  console.log(anthony);
  console.log(nabeel);
  // await editIsAdmin(nabeel);
  // await editIsAdmin(kristy);
  await editIsAdmin(anthony);

  return { nabeel, kristy, anthony };
};

const createInitialCollections = async () => {
  const [
    firstCollection,
    secondCollection,
    thirdCollection,
    fourthCollection,
    fifthCollection,
    sixthCollection,
  ] = await Promise.all([
    createCollection({ name: "Lego® City" }),
    createCollection({ name: "NINJAGO®" }),
    createCollection({ name: "Architecture" }),
    createCollection({ name: "Star Wars™" }),
    createCollection({ name: "Harry Potter™" }),
    createCollection({ name: "Marvel" }),
  ]);

  console.log("---- seeded Collection -----");
  console.log(firstCollection);
  console.log(secondCollection);
  console.log(thirdCollection);
  console.log(fourthCollection);
  console.log(fifthCollection);
  console.log(sixthCollection);
};

const createInitialProducts = async () => {
  const [firstProduct, secondProduct, thirdProduct, fourthProduct, fifthProduct] =
    await Promise.all([
      createProduct({
        name: "Lunar Research Base",
        description: "Inspired by NASA's Artemis Base Camp Concept",
        collectionId: 1,
        price: 59.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81ctAoJcr9L._AC_SX679_.jpg",
        pieceCount: 768,
        quantity: 3,
      }),
      createProduct({
        name: "Recycling Truck",
        description:
          "Caring for the environment is fun with this recycling truck set, featuring a recycling center, 3 minifigures and a cat figure.",
        collectionId: 1,
        price: 19.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81TR1DUg4ML._AC_SX679_.jpg",
        pieceCount: 261,
        quantity: 4,
      }),
      createProduct({
        name: "Ninjago® Ninja Dojo",
        description:
          "Ninja dojo playset - Kids can help train their heroes with this 3-tiered LEGO® NINJAGO® Ninja Dojo Temple (71767) featuring a training area and 5 rooms",
        collectionId: 2,
        price: 64.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81QUSmkau7L._AC_SX679_.jpg",
        pieceCount: 1394,
        quantity: 6,
      }),
      createProduct({
        name: "Ninjago® Ninja Dojo Gardens Playset",
        description:
          "Relive all the excitement and thrills of 10 years of NINJAGO® with this three-tiered model.",
        collectionId: 2,
        price: 259.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81XzFekOiDS._AC_SX679_.jpg",
        pieceCount: 5686,
        quantity: 2,
      }),
      createProduct({
        name: "Millenium Falcon Microfighter",
        description: "Series 8",
        collectionId: 4,
        price: 19.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/810mIHggsfL._AC_SX679_.jpg",
        pieceCount: 101,
        quantity: 1,
      }),
    ]);

  console.log("---- seeded Product -----");
  console.log(firstProduct);
  console.log(secondProduct);
  console.log(thirdProduct);
  console.log(fourthProduct);
  return { firstProduct, secondProduct, thirdProduct, fourthProduct, fifthProduct };
};

const createInitialCartProducts = async (firstCart, products) => {
  const { firstProduct, secondProduct, thirdProduct, fourthProduct } = products;
  const [cartProduct1, cartProduct2, cartProduct3] = await Promise.all([
    AttachProductToCart({
      cartId: firstCart.id,
      productId: firstProduct.id,
      quantity: 1,
    }),
    AttachProductToCart({
      cartId: firstCart.id,
      productId: secondProduct.id,
      quantity: 2,
    }),
    AttachProductToCart({
      cartId: firstCart.id,
      productId: thirdProduct.id,
      quantity: 1,
    }),
    AttachProductToCart({
      cartId: firstCart.id,
      productId: fourthProduct.id,
      quantity: 1,
    }),
  ]);
  console.log("---- seeded cart_products ----");
  console.log(cartProduct1);
  console.log(cartProduct2);
  console.log(cartProduct3);
};

const syncAndSeed = async () => {
  await syncTables();
  const { anthony, lucy } = await createInitialUsers();
  await createInitialCollections();
  const products = await createInitialProducts();
  const firstCart = await createCart({ id: anthony.id });
  console.log("---- seeded Cart -----");
  console.log(firstCart);
  await createInitialCartProducts(firstCart, products);
};

module.exports = {
  syncAndSeed,
  createUser,
  syncTables,
  authenticate,
  getUserByToken,
  client,
};
