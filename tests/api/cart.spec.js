const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createUser, authenticate } = require("../../server/db");
const { createCart } = require("../../server/db/cart");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("CreateCart(userId)", () => {
  it("should create an active cart for user if one is not avaible", async () => {
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

  it("should return a an active cart for user if one exist", async () => {
    const token = await authenticate({
      username: "bob",
      password: "bob_password",
    });
    const response = await request(app)
      .get(`/api/cart/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.id).toBe(1);
    expect(response.body.products.length).toBe(0);
  });
});
