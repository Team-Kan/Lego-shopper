const { createCollection } = require("../../server/db/collection");
const { client } = require("../../server/db/index");
const { createProduct, getAllProducts, getProductsByCollectionId, getProductById, deleteProduct } = require("../../server/db/product");
const setup = require("../setup");
const tearDown = require("../tearDown");

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await tearDown();
});

describe("Testing createProduct({name, description, collectionId, price, imageUrl, pieceCount, quantitiy})", () => {
  it("creates a product", async () => {
    const collection = await createCollection({name: "sample"})
    const [first, second] = [
      {
        name: "legoman",
        description: "here is a description",
        collectionId: collection.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      },
      {
        name: "legoGirl",
        description: "here is a not description",
        collectionId: collection.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      },
    ];

    const firstProduct = await createProduct(first);
    const secondProduct = await createProduct(second);
    expect(firstProduct).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "legoman",
        description: "here is a description",
        collectionId: 1,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      })
    );
    expect(secondProduct).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "legoGirl",
        description: "here is a not description",
        collectionId: 1,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      })
    );
  });
});

describe("Testing getAllProducts()", () => {
  it("returns all products with collection name", async () => {
    const product = await getAllProducts();
    expect(product[0]).toEqual(expect.objectContaining( {
      name: "legoman",
      description: "here is a description",
      collectionId: 1,
      price: 100,
      imageUrl: "www.image.com",
      pieceCount: 10000,
      quantity: 3,
      collectionName: "sample",
    }))
  });
});

describe("getProductsByCollectionId(id)", () => {
  it("return a list of all products in that collection", async () => {
    const collection2 = await createCollection({name: "this"})
    const collection3 = await createCollection({name: "now"})
    const [product3, product4, product5, product6] = await Promise.all([
      createProduct({name: "legoson",
        description: "here is a legoson",
        collectionId: collection2.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      }),
      createProduct({name: "legodaughter",
        description: "here is a legodaughter",
        collectionId: collection2.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      }),
      createProduct({name: "lego",
        description: "here is a lego",
        collectionId: collection3.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      }),
      createProduct({name: "legoneighbor",
        description: "here is a neighbor",
        collectionId: collection3.id,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
      }),
    ])
    const productsFromCollection2 = await getProductsByCollectionId(collection2.id);
    const productsFromCollection3 = await getProductsByCollectionId(collection3.id);
    expect(productsFromCollection2.length).toBe(2);
    expect(productsFromCollection3.length).toBe(2);
    expect(productsFromCollection3[0].name).toBe(product5.name);
  })
})

describe("getProductById(id)", () => {
  it("should return the product with that id", async () => {
    const product3 = await getProductById(3);
    const product5 = await getProductById(5);

    expect(product3)
    .toEqual(
      expect.objectContaining({
        name: "legoson",
        description: "here is a legoson",
        collectionId: 2,
        price: 100,
        imageUrl: "www.image.com",
        pieceCount: 10000,
        quantity: 3,
    }))
    expect(product5).toEqual(expect.objectContaining({
      name: "lego",
      description: "here is a lego",
      collectionId: 3,
      price: 100,
      imageUrl: "www.image.com",
      pieceCount: 10000,
      quantity: 3,
  }))
  })
})

describe("Testing deleteProduct(id)", () => {
  it("removed product from database", async () => {
    const  fakeProduct  = await createProduct({name: "Samurai",
    description: "here is a Samurai",
    collectionId: 1,
    price: 100,
    imageUrl: "www.image.com",
    pieceCount: 10000,
    quantity: 3,
  });
    await deleteProduct(fakeProduct.id);

    const { rows: [product]} = await client.query(`
    SELECT *
    FROM products
    WHERE id = $1;
    `, [fakeProduct.id])
    expect(product).toBeFalsy();
  })
});