const { createCart, getActiveCartByUserId, getInactiveCartsByUserId, checkoutCart } = require("../../server/db/cart");
const { createCollection } = require("../../server/db/collection");
const { createUser } = require("../../server/db/User");
const { createProduct } = require("../../server/db/product");
const { addProductToCart } = require("../../server/db/cart_product");
const setup = require("../setup");
const tearDown = require("../tearDown");

let user = {};
let cart = {};
let laurenCollection = { name: 'lauren' };
let laurenProduct1 = {
  name: "Batman",
  description: "I'm Batman",
  collectionId: laurenCollection.id,
  price: 100,
  imageUrl: "www.image.com",
  pieceCount: 10000,
  quantity: 3,
};
let laurenProduct2 = {
  name: "Batmobile",
  description: "Batman's ride",
  collectionId: laurenCollection.id,
  price: 105,
  imageUrl: "www.image.com",
  pieceCount: 10000,
  quantity: 1,
};
let productId1 = 1;
let productId2 = 2;
let quantity1 = 1;
let quantity2 = 1;

beforeAll(async () => {
  await setup();
  laurenCollection = await createCollection(laurenCollection)
  user = await createUser({ username: "Lauren", password: "larenisthecoolest" });

  laurenProduct1 = await createProduct(laurenProduct1);
  laurenProduct2 = await createProduct(laurenProduct2);

  productId1 = laurenProduct1.id;
  productId2 = laurenProduct2.id;
  quantity1 = 1;
  quantity2 = 1;
});

afterAll(async () => {
  await tearDown();
});

describe("Testing of all functions for Cart table", () => {
  

  describe("Testing Create Cart Function", () => {
    it("creates and returns a cart", async () => {

      cart = await createCart({ id: user.id });
      const cart_product1 = await addProductToCart({
        cartId: cart.id,
        productId: productId1,
        quantity: quantity1,
      });
      const cart_product2 = await addProductToCart({
        cartId: cart.id,
        productId: productId2,
        quantity: quantity2,
      });
      expect(cart).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          isActive: true,
        })
      );
    });
  });

  describe('Testing getActiveCartByUserId', () => {
    it('grabs the active cart by the user id', async () => {
      let userCart = await getActiveCartByUserId(user.id);
      expect(userCart[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          isActive: true,
          products: expect.any(Array)
        }))
    })
  })

  
  describe("Testing Checkout Cart Function", () => {
    it("checkouts out and returns a cart", async () => {

      let cart2 = await createCart({ id: user.id });
      const cart_product1 = await addProductToCart({
        cartId: cart2.id,
        productId: productId1,
        quantity: quantity1,
      });
      const cart_product2 = await addProductToCart({
        cartId: cart2.id,
        productId: productId2,
        quantity: quantity2,
      });

      const checkoutCart1 = await checkoutCart(cart.id);
      const checkoutCart2 = await checkoutCart(cart2.id);
   
      expect(checkoutCart1).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          isActive: false
        }))
        expect(checkoutCart2).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            isActive: false
          }))
    });
  });

  describe('Testing getInactiveCartsByUserId', () => {
    it('grabs the checked out carts by the user id', async () => {
      let userCarts = await getInactiveCartsByUserId(user.id);
      console.log(userCarts);
      expect(userCarts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            isActive: false,
            products: expect.any(Array)
          })])
      )
    })
  })
})