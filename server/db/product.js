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

const getAllProducts = async () => {
  try {
    const{ rows: product} = await client.query(`
    SELECT products.*, 
    collections.name AS "collectionName"
    FROM products
    JOIN collections ON collections.id = "collectionId"
    ORDER BY Id
    `)
    return product;
  } catch (error) {
    console.log(error)
  }
}

module.exports={
  createProduct,
  getAllProducts
}