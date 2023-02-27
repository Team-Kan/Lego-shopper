const { createCart } = require("../../server/db/cart");
const { createUser } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const {addProductToCart, getCartProductsByCartId } = require("../../server/db/cart_product");
const setup = require("../setup");
const tearDown = require("../tearDown");
const { createCollection } = require("../../server/db/collection");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("Testing all functions related to the cart_products table", () => {
  describe("Testing Add Product to Cart Function", () => {
    it("creates and returns a cart_product row", async () => {
      const larryCollection = await createCollection({ name: 'larry' })
      const larry = await createUser({ username: "Lary", password: "lary_password" });
      const larryCart = await createCart({ id: larry.id });
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
      const cart_product = await addProductToCart({
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

  describe('Testing getCarProductsByCartId', () => {
    it('returns all products that are associated with a particular cart', async () => {
      const laurenCollection = await createCollection({ name: 'lauren' })
      const lauren = await createUser({ username: "Lauren", password: "larenisthecoolest" });
      const laurenCart = await createCart({ id: lauren.id });
      const laurenProduct1 = await createProduct({
        name: "Batman",
        description: "I'm Batman",
        collectionId: laurenCollection.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      });
      const laurenProduct2 = await createProduct({
        name: "Batmobile",
        description: "Batman's ride",
        collectionId: laurenCollection.id,
        price: 105,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 1,
      });

      const cartId = laurenCart.id;
      const productId1 = laurenProduct1.id;
      const productId2 = laurenProduct2.id;
      const quantity1 = 1;
      const quantity2 = 1;

      const cart_product1 = await addProductToCart({
        cartId,
        productId: productId1,
        quantity: quantity1,
      });
      const cart_product2 = await addProductToCart({
        cartId,
        productId: productId2,
        quantity: quantity2,
      });

      const allCartProducts = await getCartProductsByCartId({ id: laurenCart.id });
      console.log(allCartProducts);

      expect(allCartProducts).toEqual(
        expect.arrayContaining([cart_product1, cart_product2])
      );
    });
  })
})