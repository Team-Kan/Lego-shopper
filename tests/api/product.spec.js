const { createUser } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const { editIsAdmin, authenticate } = require("../../server/db/User");
const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createCollection } = require("../../server/db/collection");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("POST api/products/create", () => {
  it("lets an admin create a product", async () => {
    await createCollection({ name: "gg" });
    await createCollection({ name: "ghg" });
    const user = await createUser({ username: "bob", password: "password" });
    await editIsAdmin(user);
    const token = await authenticate({ username: "bob", password: "password" });
    const newProduct = {
      name: "sample5",
      description: "this is it",
      collectionId: 2,
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
  it("should return the product with the id", async () => {
    const product2 = await createProduct({
      name: "sample2",
      description: "jk",
      collectionId: 1,
      price: 19.99,
      imageUrl: "double",
      pieceCount: 101,
      quantity: 1,
    });
    const response = await request(app).get(`/api/products/${product2.id}`);

    expect(response.body.name).toBe(product2.name);
  });
});
describe("GET /products/name/:name", () => {
  it("should return the product with the id", async () => {
    const product3 = await createProduct({
      name: "sample3",
      description: "gggg",
      collectionId: 2,
      price: 19.99,
      imageUrl: "double",
      pieceCount: 101,
      quantity: 1,
    });
    const response = await request(app).get(
      `/api/products/name/${product3.name}`
    );

    expect(response.body.price).toBe(product3.price);
  });
});

describe("GET api/products/collection/:collectionId", () => {
  it("should return the products with the collectionId", async () => {
    const response = await request(app).get(`/api/products/collection/2`);
    console.log(response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("sample5");
  });
});

describe("PATCH api/products/:id", () => {
  it("should edit the product", async () => {
    const product4 = await createProduct({
      name: "sample4",
      collectionId: 2,
      description: "this is a ;glhakdsgh",
      price: 19.99,
      imageUrl: "double",
      pieceCount: 101,
      quantity: 1,
    });
    const newDescription = "how you like this changing?"
    
    const token = await authenticate({ username: "bob", password: "password" });
    
    const response = await request(app)
    .patch(`/api/products/${product4.id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({description: newDescription});

    console.log(response.body);
    expect(response.body.description).toBe(newDescription)
  })
})

describe("DELETE api/products/:id", () => {
  it("should DELETE the product", async () => {
    const product5 = await createProduct({
      name: "sample5fgsadhf",
      collectionId: 2,
      description: "thiasdfsadfasd",
      price: 19.99,
      imageUrl: "double",
      pieceCount: 101,
      quantity: 1,
    });
    
    const token = await authenticate({ username: "bob", password: "password" });
    
    const response = await request(app)
    .delete(`/api/products/${product5.id}`)
    .set("Authorization", `Bearer ${token}`)

    expect(response.body.id).toBe(product5.id)
  })
})

