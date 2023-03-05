const client = require("./client");
const { createCollection } = require("./collection");
const { createCart } = require("./cart");
const { createProduct } = require("./product");
const { addProductToCart } = require("./cart_product");

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
      password: process.env.NABEEL_PASSWORD,
    }),
    createUser({
      username: "kristy",
      password: process.env.KRISTY_PASSWORD,
    }),
    createUser({
      username: "actninswitch@gmail.com",
      password: process.env.ANTHONY_PASSWORD,
    }),
  ]);

  console.log("--- seeded users ---");
  console.log(anthony);
  console.log(nabeel);
  await editIsAdmin(nabeel);
  await editIsAdmin(kristy);
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
        name: "LEGO® Architecture Great Pyramid of Giza Set",
        description:
          "Travel back in time to the 26th century BC. and discover the Great Pyramid of Giza and its surroundings with this LEGO set for adults",
        collectionId: 3,
        price: 79.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91jh4Kc1KSL._AC_SL1500_.jpg",
        pieceCount: 1476,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® Creator Expert Taj Mahal",
        description:
          "Take your architectural admiration of the Taj Mahal to the next level! Build the LEGO® replica of one of the seven wonders of the world with this building kit for kids and adults.",
        collectionId: 3,
        price: 399.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/71s3B71uO8L._AC_SL1500_.jpg",
        pieceCount: 5932,
        quantity: 4,
      }),
      createProduct({
        name: "Millenium Falcon Microfighter",
        description: "Series 8",
        collectionId: 4,
        price: 19.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/810mIHggsfL._AC_SX679_.jpg",
        pieceCount: 101,
        quantity: 26,
      }),
      createProduct({
        name: "Hogwarts™ Icons - Collectors' Edition",
        description: 
          "Includes iconic artifacts: Harry's wand and glasses, a tray of potions, Tom Riddle's diary, the Golden Snitch, a Hogwarts scarf, Hedwig carrying an invitation to Hogwarts and more",
        collectionId: 5,
        price: 249.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/71+ZaMQXGZL._AC_SL1500_.jpg",
        pieceCount: 3010,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® Harry Potter™ Hufflepuff House Banner ",
        description: 
          "Hufflepuff fans can display their love for the Hogwarts house with this LEGO® Harry Potter™ toy, featuring a Hogwarts crest that opens for play",
        collectionId: 5,
        price: 24.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81HD5f34yXL._AC_SL1500_.jpg",
        pieceCount: 313,
        quantity: 17,
      }),
      createProduct({
        name: "LEGO® Marvel™ Super Heroes The Guardians' Ship",
        description: 
          "Indulge a kid's passion for the Guardians of the Galaxy™ and the Marvel Avengers™ movies with the stunning LEGO® Marvel The Guardians' Ship",
        collectionId: 6,
        price: 99.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81OzV37HNSL._AC_SL1500_.jpg",
        pieceCount: 1901,
        quantity: 5,
      }),
      createProduct({
        name: "LEGO® Marvel Super Heroes Infinity Gauntlet™",
        description: 
          "captures forever the captivating style of Marvel Studios' Avengers™: Infinity War and Avengers: Endgame movies™",
        collectionId: 6,
        price: 45.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81uwk+ags9L._AC_SL1500_.jpg",
        pieceCount: 590,
        quantity: 10,
      }),
      createProduct({
        name: "LEGO® Marvel™ I am Groot",
        description: 
          "Movable Baby Groot",
        collectionId: 6,
        price: 45.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81LGtW3NU8L._AC_SL1500_.jpg",
        pieceCount: 476,
        quantity: 5,
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
    addProductToCart({
      cartId: firstCart.id,
      productId: firstProduct.id,
      quantity: 1,
    }),
    addProductToCart({
      cartId: firstCart.id,
      productId: secondProduct.id,
      quantity: 2,
    }),
    addProductToCart({
      cartId: firstCart.id,
      productId: thirdProduct.id,
      quantity: 1,
    }),
    addProductToCart({
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
