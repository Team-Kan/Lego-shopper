const { client } = require("../../server/db/index");
const {createProduct} = require("../../server/db/product")

client.connect()

describe('Testing createProduct({name, description, collectionId, price, imageUrl, pieceCount, quantitiy})', () => {
  it('creates a product', async () => {
    const [first, second] = [
        {
          name: "legoman",
          description: "here is a description",
          collectionId: 1,
          price: 100,
          imageUrl: "www.image.com", 
          pieceCount: 10000,
          quantity: 3
        },
        {
          name: "legoGirl",
          description: "here is a not description",
          collectionId: 1,
          price: 100,
          imageUrl: "www.image.com", 
          pieceCount: 10000,
          quantity: 3
        }
    ]

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
        quantity: 3
      })
    )
    expect(secondProduct).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "legoGirl",
        description: "here is a not description",
        collectionId: 1,
        price: 100,
        imageUrl: "www.image.com", 
        pieceCount: 10000,
        quantity: 3
      })
    )

  })
})