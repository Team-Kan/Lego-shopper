const { createCart } = require("../../server/db/cart");
const { createUser } = require("../../server/db");
const { createProduct } = require("../../server/db/product");
const {addProductToCart, getCartProductsByCartId, editCartProduct, deleteCartProduct } = require("../../server/db/cart_product");
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

  describe('Testing getCartProductsByCartId', () => {
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

      expect(allCartProducts).toEqual(
        expect.arrayContaining([cart_product1, cart_product2])
      );
    });
  })

  describe("Testing Edit Products in Cart Function", () => {
    it("Edit: changes the quantity and returns cart_product", async () => {
      const harryCollection = await createCollection({ name: 'harry' })
      const harry = await createUser({ username: "harry", password: "hary_password" });
      const harryCart = await createCart({ id: harry.id });
      const harryProduct = await createProduct({
        name: "Harry Styles",
        description: "Minifigure of Harry Styles",
        collectionId: harryCollection.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      });
      const cartId = harryCart.id;
      const productId = harryProduct.id;
      const quantity = 5;
      const cart_product = await addProductToCart({
        cartId,
        productId,
        quantity,
      });

      const newQuantity = 2;
      const newCartProduct = await editCartProduct(cartId, productId, newQuantity);

      expect(newCartProduct).toEqual(
        expect.objectContaining({
          id: cart_product.id,
          cartId: cartId,
          productId: productId,
          quantity: newQuantity,
        })
      );
    });
  });

  describe("Testing Delete Products in Cart Function", () => {
    it("Delete: removes the cart_product from the cart", async () => {
      const TerryCollection = await createCollection({ name: 'terry' })
      const Terry = await createUser({ username: "terry", password: "tery_password" });
      const TerryCart = await createCart({ id: Terry.id });
      const TerryProduct = await createProduct({
        name: "Terry Styles",
        description: "Minifigure of Terry Styles",
        collectionId: TerryCollection.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      });
      const cartId = TerryCart.id;
      const productId = TerryProduct.id;
      const quantity = 5;
      const cart_product = await addProductToCart({
        cartId,
        productId,
        quantity,
      });

      const deletedProduct = await deleteCartProduct(cartId, productId);
      const newCart = await getCartProductsByCartId({id: cartId});

      expect(newCart).toEqual(
        expect.not.arrayContaining([
          expect.objectContaining(deletedProduct)
        ])
      );
    });
  });
})