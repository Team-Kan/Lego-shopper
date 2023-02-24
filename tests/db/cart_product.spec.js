const { createCart } = require("../../server/db/cart");
const { createUser } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const { AttachProductToCart } = require("../../server/db/cart_product");
const setup = require("../setup");
const tearDown = require("../tearDown");
const { createCollection } = require("../../server/db/collection");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});
describe("Testing Attach Product to Cart Function", () => {
  it("creates and returns a cart_product row", async () => {
    const larryCollection = await createCollection({name: 'larry'})
    const larry = await createUser({username: "Lary", password: "lary_password"});
    const larryCart = await createCart({id: larry.id});
    const larryProduct = await createProduct({
      name: "legoman",
      description: "here is a description",
      collectionId: larryCollection.id,
      price: 100,
      imageUrl: "www.image.com",
      pieceCount: 10000,
      quantity: 3,
    });
    const cartId = larryCart.id;
    const productId = larryProduct.id;
    const quantity = 5;
    const cart_product = await AttachProductToCart({
      cartId,
      productId,
      quantity,
    });
    expect(cart_product).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        cartId: cartId,
        productId: productId,
        quantity: quantity,
      })
    );
  });
});
