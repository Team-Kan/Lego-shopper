const { client } = require("../../server/db");
const { createCart } = require("../../server/db/cart");
const { createUser } = require("../../server/db/User");
const setup = require("../setup");
const tearDown = require("../tearDown");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});
describe("Testing Create Cart Function", () => {
  it("creates and returns a cart", async () => {
    const user = await createUser({
      username: "Bob",
      password: "password123",
    });
    const cart = await createCart({ id: user.id });
    expect(cart).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        isActive: true,
      })
    );
  });
});
