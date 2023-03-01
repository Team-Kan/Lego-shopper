const { createProduct } = require("../../server/db/product");
const setup = require("../setup");
const tearDown = require("../tearDown");
let product1;
let product2;
let product3;
let product4;
beforeAll(async () => {
  await setup();
  product1 = await createProduct({
    name: "sample1",
    description: "ak",
    collectionId: 4,
    price: 19.99,
    imageUrl: "samy",
    pieceCount: 101,
    quantity: 1,
  });
  product2 = await createProduct({
    name: "sample2",
    description: "jk",
    collectionId: 4,
    price: 19.99,
    imageUrl: "double",
    pieceCount: 101,
    quantity: 1,
  });
  product3 = await createProduct({
    name: "sample3",
    description: "hk",
    collectionId: 4,
    price: 19.99,
    imageUrl: "tru",
    pieceCount: 101,
    quantity: 1,
  });
  product4 = await createProduct({
    name: "sample4",
    description: "lk",
    collectionId: 4,
    price: 19.99,
    imageUrl: "bing",
    pieceCount: 101,
    quantity: 1,
  });  
});

afterAll(async () => {
  await tearDown();
});
