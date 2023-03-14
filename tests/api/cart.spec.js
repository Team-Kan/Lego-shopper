const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createUser, authenticate } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const { createCollection } = require("../../server/db/collection");


beforeAll(async () => {
  await setup();
  let cart = {};
});

afterAll(async () => {
  await tearDown();
});

describe("CreateCart(userId)", () => {
  it("should create an active cart for user if one is not available", async () => {
    const { id, username } = await createUser({
      username: "bob",
      password: "bob_password",
    });
    const token = await authenticate({ username, password: "bob_password" });
    const response = await request(app)
      .get(`/api/cart/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({ id: 1, userId: 1 })
    );
  });

  it("should return an active cart for user if one exists", async () => {
    const token = await authenticate({
      username: "bob",
      password: "bob_password",
    });
    const response = await request(app)
      .get(`/api/cart/`)
      .set("Authorization", `Bearer ${token}`)

    cart = response.body;
    expect(response.body.id).toBe(1);
    expect(response.body.products.length).toBe(0);
  });
});

describe('testing checkout', () => {
  it('should take a cart and change the isActive property to false', async () => {
    const token = await authenticate({
      username: "bob",
      password: "bob_password",
    });
    console.log(cart);
    const collection = await createCollection({ name: "New releases"});
    const product = await createProduct({
      name: "sample5",
      description: "this is it",
      collectionId: collection.id,
      price: 19.99,
      imageUrl: "gg",
      pieceCount: 101,
      quantity: 3,
    });
    const response = await request(app)
      .patch(`/api/cart/${cart.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ products: [{id: product.id, quantity: 1}]});
    console.log(response.body);
    expect(response.body.isActive).toBe(false);
  })
});