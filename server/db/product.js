const client = require("./client");

const createProduct = async ({name, description, collectionId, price, imageUrl, pieceCount, quantity}) => {

  const {rows: [product]} = await client.query(`
  INSERT INTO products(name, description, "collectionId", price, "imageUrl", "pieceCount", quantity)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `, [name, description, collectionId, price, imageUrl, pieceCount, quantity])

  console.log(product)

  return product
}

const getAllProducts = async

module.exports={
  createProduct
}