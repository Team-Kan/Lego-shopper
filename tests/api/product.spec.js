const { createUser } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const { editIsAdmin, authenticate } = require("../../server/db/User");
const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createCollection } = require("../../server/db/collection");

let product1;
let product2;
let product3;
let product4;
let notAdmin;

beforeAll(async () => {
  await setup();

  product1 = await createProduct({
    name: "sample1",
    description: "ak",
    collectionId: 1,
    price: 19.99,
    imageUrl: "samy",
    pieceCount: 101,
    quantity: 1,
  });
  product2 = await createProduct({
    name: "sample2",
    description: "jk",
    collectionId: 1,
    price: 19.99,
    imageUrl: "double",
    pieceCount: 101,
    quantity: 1,
  });
  product3 = await createProduct({
    name: "sample3",
    description: "hk",
    collectionId: 1,
    price: 19.99,
    imageUrl: "tru",
    pieceCount: 101,
    quantity: 1,
  });
  product4 = await createProduct({
    name: "sample4",
    description: "lk",
    collectionId: 1,
    price: 19.99,
    imageUrl: "bing",
    pieceCount: 101,
    quantity: 1,
  });
  notAdmin = await await createUser({
    username: "dave",
    password: "password12",
  });
});

afterAll(async () => {
  await tearDown();
});

describe("POST api/products/create", () => {
  it("lets an admin create a product", async () => {
    await createCollection({ name: "gg" });
    const user = await createUser({ username: "bob", password: "password" });
    await editIsAdmin(user);
    const token = await authenticate({ username: "bob", password: "password" });
    const newProduct = {
      name: "sample5",
      description: "this is it",
      collectionId: 1,
      price: 19.99,
      imageUrl: "gg",
      pieceCount: 101,
      quantity: 1,
    };

    const response = await request(app)
      .post(`/api/products/create`)
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
  });
});

describe("GET /products/:id", () => {
  
})