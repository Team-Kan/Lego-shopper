const setup = require("../setup");
const tearDown = require("../tearDown");
const request = require("supertest");
const app = require("../../server/app");
const { createUser, authenticate } = require("../../server/db");
const { createCart } = require("../../server/db/cart");
const { createProduct } = require("../../server/db/product");
const { createCollection } = require("../../server/db/collection");


let user = {};
let cart = {};
let product = {};
let collection = {};
let token = '';
let quantity = 4;

beforeAll(async () => {
  await setup();
  user = await createUser({ username: "Laurie", password: "lauriespassword" });
  token = await authenticate({ username: "Laurie", password: "lauriespassword" });
  cart = await createCart({ id: user.id });
  collection = await createCollection({ name: "New releases"});
  product = await createProduct({
    name: "sample5",
    description: "this is it",
    collectionId: collection.id,
    price: 19.99,
    imageUrl: "gg",
    pieceCount: 101,
    quantity: 1,
  });
});

afterAll(async () => {
  await tearDown();
});



describe('post /cart-products/', () => {
  it('should add a product to the cart', async() => {
    const response = await request(app)
    .post('/api/cart-products')
    .set("Authorization", `Bearer ${token}`)
    .send({ cartId: cart.id, productId: product.id, quantity });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        cartId: cart.id,
        productId: product.id,
        quantity: quantity
      }
      )
    )
  })
})

describe('get /cart-products/', () => {
  it('should get all rows from the cart_product table', async() => {
    const response = await request(app)
    .get('/api/cart-products')
    .set("Authorization", `Bearer ${token}`)
    .send({ cartId: cart.id });

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          cartId: cart.id,
          productId: product.id,
          quantity: quantity
        })
      ])
    )
  })
})

describe('patch /cart-products/', () => {
  it('should change the quantity in the cart_product table', async() => {
    const newQuantity = 5;
    const response = await request(app)
    .patch('/api/cart-products')
    .set("Authorization", `Bearer ${token}`)
    .send({ cartId: cart.id, productId: product.id, quantity: newQuantity });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        cartId: cart.id,
        productId: product.id,
        quantity: newQuantity
      }
      )
    )
  })
})

describe('delete /cart-products/', () => {
  it('should delete the cart_product from the table', async() => {
    const response = await request(app)
    .delete('/api/cart-products')
    .set("Authorization", `Bearer ${token}`)
    .send({ cartId: cart.id, productId: product.id });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        cartId: cart.id,
        productId: product.id,
        quantity: 5
      }
      )
    )
  })
})