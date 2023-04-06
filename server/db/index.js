const client = require("./client");
const { addProductToCart } = require("./cart_product");

const {
  getUserByToken,
  createUser,
  authenticate,
  editIsAdmin,
} = require("./User");

const {
  createCart,
  getActiveCartByUserId,
  getInactiveCartsByUserId,
  checkoutCart,
  calculateOrder,
} = require("./cart");

const {
  createCollection,
  getAllCollections,
  deleteCollection,
  editCollection,
} = require("./collection");

const {
  createProduct,
  getAllProducts,
  getProductsByCollectionId,
  getProductById,
  getProductByName,
  deleteProduct,
  editProduct,
} = require("./product");

const {sendMail} = require("./mail")

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

  await editIsAdmin(nabeel);
  await editIsAdmin(kristy);
  await editIsAdmin(anthony);
  console.log("--- seeded users ---");
  console.log(anthony);
  console.log(nabeel);

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
        name: "Lunar Roving Vehicle",
        description: "Inspired by NASA's Artemis Base Camp Concept Rover",
        collectionId: 1,
        price: 29.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81zQvgUK4AL._AC_SX679_.jpg",
        pieceCount: 275,
        quantity: 5,
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
        name: "Farmers Market Van",
        description:
          "The Farmers Market Van comes with a serving window, opening side doors, rear doors and a minifigure cab, while the veggie patch features a fun carrot-growing function",
        collectionId: 1,
        price: 29.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91aYFvakirL._AC_SX679_.jpg",
        pieceCount: 310,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® City Police Training Academy",
        description:
          "LEGO® City Police Training Academy features a 2-level modular police station playset, outdoor training facilities, quad bike toy and a horse figure",
        collectionId: 1,
        price: 64.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91RTR2+T0IL._AC_SL1500_.jpg",
        pieceCount: 823,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® City Fire Station",
        description: "LEGO® City Fire Station features a 3-level LEGO fire station with a toy garage, reception, firefighter quarters and control room",
        collectionId: 1,
        price: 49.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81CHdZUyLJL._AC_SX679_.jpg",
        pieceCount: 540,
        quantity: 5,
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
        name: "LEGO NINJAGO Legacy Fire Dragon Attack",
        description:
          "Includes a golden Nya Legacy collectible minifigure with a small stand to celebrate the 10th anniversary of NINJAGO toys.",
        collectionId: 2,
        price: 64.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81qGWVlPu6L._AC_SL1500_.jpg",
        pieceCount: 563,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO NINJAGO Jay’s Titan Mech",
        description:
          "This giant LEGO NINJAGO mech character with a cockpit for Jay has a large dragon blade, 2 katana swords and 2 shooters mounted on its shoulders",
        collectionId: 2,
        price: 79.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/8176ul2XGfL._AC_SL1500_.jpg",
        pieceCount: 794,
        quantity: 10,
      }),
      createProduct({
        name: "LEGO NINJAGO Hydro Bounty Building Set",
        description:
          "Includes 10 minifigures from the NINJAGO: Seabound TV series: Scuba Kai, Scuba Cole, Scuba Jay, Scuba Lloyd, Scuba Zane and Scuba Nya",
        collectionId: 2,
        price: 139.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91khJHkZI8L._AC_SL1500_.jpg",
        pieceCount: 1159,
        quantity: 8,
      }),
      createProduct({
        name: "LEGO NINJAGO Lloyd’s Golden Ultra Dragon",
        description:
          "Features 9 NINJAGO minifigures, including an exclusive Golden Oni Lloyd and all Golden Kai, Jay, Cole and Zane, all with golden swords",
        collectionId: 2,
        price: 149.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81XHXul489L._AC_SL1500_.jpg",
        pieceCount: 989,
        quantity: 8,
      }),
      createProduct({
        name: "LEGO® Architecture Great Pyramid of Giza Set",
        description:
          "Travel back in time to the 26th century BC. and discover the Great Pyramid of Giza and its surroundings with this LEGO set for adults",
        collectionId: 3,
        price: 79.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/71s3B71uO8L._AC_SL1500_.jpg",
        pieceCount: 5932,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® Creator Expert Taj Mahal",
        description:
          "Take your architectural admiration of the Taj Mahal to the next level! Build the LEGO® replica of one of the seven wonders of the world with this building kit for kids and adults.",
        collectionId: 3,
        price: 399.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91jh4Kc1KSL._AC_SL1500_.jpg",
        pieceCount: 5932,
        quantity: 4,
      }),
      createProduct({
        name: "LEGO® Architecture San Francisco Skyline",
        description:
          "This San Francisco building set captures the essence of the San Francisco skyline with models of the city's most iconic architectural marvels, from the Golden Gate Bridge to the Transamerica Pyramid",
        collectionId: 3,
        price: 72.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91aGPT5QLxL._AC_SX679_.jpg",
        pieceCount: 565,
        quantity: 8,
      }),
      createProduct({
        name: "LEGO® Architecture London Skyline",
        description:
          "Build a detailed LEGO Architecture model interpretation of the London skyline featuring famous landmarks!",
        collectionId: 3,
        price: 40.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91WU9-ozJzL._AC_SX466_.jpg",
        pieceCount: 468,
        quantity: 8,
      }),
      createProduct({
        name: "LEGO® Architecture Dubai Skyline",
        description:
          "The Burj Khalifa, Jumeirah Emirates Towers Hotel, Burj Al Arab Jumeirah hotel, Dubai Frame and The Dubai Fountain are featured in this architecture model kit, a charming souvenir for anyone with an affinity for Dubai",
        collectionId: 3,
        price: 70.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81yHERnYgJL._AC_SX679_.jpg",
        pieceCount: 740,
        quantity: 5,
      }),
      createProduct({
        name: "LEGO® Architecture Statue of Liberty",
        description:
          "This impressive LEGO interpretation faithfully reproduces the monument’s harmonious blend of sculpture and architecture",
        collectionId: 3,
        price: 99.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/817QaKEw4lL._AC_SX679_.jpg",
        pieceCount: 1685,
        quantity: 7,
      }),
      createProduct({
        name: "Millenium Falcon Microfighter",
        description: "The Millennium Falcon Microfighter features a seat for the Han Solo LEGO minifigure and 2 stud shooters, for fun, creative play. Han Solo also has a blaster pistol",
        collectionId: 4,
        price: 19.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/810mIHggsfL._AC_SX679_.jpg",
        pieceCount: 101,
        quantity: 26,
      }),
      createProduct({
        name: "Boba Fett's Starship Microfighter",
        description: "The LEGO Star Wars Microfighter set features an opening cockpit for Boba Fett LEGO minifigure, adjustable wings and landing modes",
        collectionId: 4,
        price: 6.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/815zsURmdSL._AC_SX679_.jpg",
        pieceCount: 85,
        quantity: 10,
      }),
      createProduct({
        name: "Obi-Wan Kenobi's Jedi StarFighter",
        description: "The starfighter has an opening minifigure cockpit, 2 stud shooters, retractable landing gear, lightsaber storage clips and an attachment point on the wing for R4-P17’s head",
        collectionId: 4,
        price: 9.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81dsPG1JP0L._AC_SX679_.jpg",
        pieceCount: 282,
        quantity: 10,
      }),
      createProduct({
        name: "The Clone Wars Armored Assault Tank (AAT)",
        description: "This set includes 2 LEGO Star Wars minifigures, Ahsoka Tano and Ahsoka's Clone Trooper, AAT Driver Battle Droid and Battle Droid LEGO figures, and cool weapons including 2 Lightsabers to role-play action stories",
        collectionId: 4,
        price: 19.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81kVxznTd0L._AC_SX679_.jpg",
        pieceCount: 286,
        quantity: 15,
      }),
      createProduct({
        name: "TIE Bomber",
        description: "The TIE Bomber has an opening minifigure cockpit, a warhead bay with torpedo-dropping function for4 torpedoes (the set includes 6 buildable torpedoes)",
        collectionId: 4,
        price: 59.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91-v0ignk5L._AC_SX679_.jpg",
        pieceCount: 625,
        quantity: 5,
      }),
      createProduct({
        name: "Republic Fighter Tank",
        description: "The Republic Fighter Tank features battle droids, clone troopers, and Mace Windu",
        collectionId: 4,
        price: 59.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/6109qhUHJZL._AC_SX679_.jpg",
        pieceCount: 262,
        quantity: 5,
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
        name: "LEGO Harry Potter Gryffindor House Banner ",
        description: 
          "Gryffindor fans can display their love for the Hogwarts house with this LEGO® Harry Potter™ toy, featuring a Hogwarts crest that opens for play",
        collectionId: 5,
        price: 34.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81BEq5ZYlWL._AC_SL1500_.jpg",
        pieceCount: 285,
        quantity: 17,
      }),
      createProduct({
        name: "LEGO Harry Potter Slytherin House Banner ",
        description: 
          "Slytherin fans can display their love for the Hogwarts house with this LEGO® Harry Potter™ toy, featuring a Hogwarts crest that opens for play",
        collectionId: 5,
        price: 34.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81r-V49FZPL._AC_SL1500_.jpg",
        pieceCount: 349,
        quantity: 17,
      }),
      createProduct({
        name: "LEGO Harry Potter and The Goblet of Fire Hungarian Horntail Triwizard Challenge",
        description: 
          "This Hungarian Horntail Triwizard Challenge playset includes 4 minifigures, all with wands: Harry Potter, Fleur Delacour, Cedric Diggory and Viktor Krum—and inside the buildable champions tent is a bed, 2 cups, small shelf and a magic potion bottle",
        collectionId: 5,
        price: 63.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/91XZwxiQCCL._AC_SL1500_.jpg",
        pieceCount: 265,
        quantity: 17,
      }),
      createProduct({
        name: "LEGO Harry Potter Hogwarts Castle",
        description: 
          "Hogwarts Castle features the Great Hall with buildable ‘stained glass windows', house banners, benches, tables, flaming torches and moving staircases",
        collectionId: 5,
        price: 469.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/915Vf8UDU3L._AC_SL1500_.jpg",
        pieceCount: 6020,
        quantity: 3,
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
        name: "LEGO® Marvel Super Heroes Nano Gauntlet™",
        description: 
          "This vibrantly colored LEGO brick recreation of the Nano Gauntlet includes the 6 Infinity Stones, a sturdy stand and a descriptive tablet",
        collectionId: 6,
        price: 49.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81SD23gywyL._AC_SX679_.jpg",
        pieceCount: 675,
        quantity: 8,
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
      createProduct({
        name: "LEGO® Marvel™ Black Panther",
        description: 
          "The model rests securely on a stand with an information plate attached. The hands include articulated fingers and detach from the main model to increase display possibilities",
        collectionId: 6,
        price: 250.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/71USiW4UYtL._AC_SX679_.jpg",
        pieceCount: 2961,
        quantity: 3,
      }),
      createProduct({
        name: "LEGO® Marvel™ Hulkbuster",
        description: 
          "The model incorporates 3 light-up arc reactors (1 in the chest and 1 in each hand), a fully jointed upper body and a spacious, opening cockpit",
        collectionId: 6,
        price: 459.99,
        imageUrl:
          "https://m.media-amazon.com/images/I/81R9CxlQBFL._AC_SX679_.jpg",
        pieceCount: 4049,
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
  getUserByToken,
  client,
  getAllProducts,
  getProductsByCollectionId,
  getProductById,
  getProductByName,
  deleteProduct,
  editProduct,
  authenticate,
  editIsAdmin,
  createCart,
  getActiveCartByUserId,
  getInactiveCartsByUserId,
  checkoutCart,
  createCollection,
  getAllCollections,
  deleteCollection,
  editCollection,
  sendMail,
  calculateOrder
};
