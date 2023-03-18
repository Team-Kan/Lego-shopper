const client = require("./client");

const getAllProductsQuery = `
SELECT products.*, 
collections.name AS "collectionName"
FROM products
JOIN collections ON collections.id = "collectionId"
`;

const createProduct = async ({
  name,
  description,
  collectionId,
  price,
  imageUrl,
  pieceCount,
  quantity,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, "collectionId", price, "imageUrl", "pieceCount", quantity)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `, [name, description, collectionId, price, imageUrl, pieceCount, quantity]
    );
  
    if(!product){
      const error = new Error("Product could not be created, double check everything and try again.")
      error.status = 400
      throw error
    }
  
    return product;
  } catch (error) {
    throw error;
  }
  
};

const getAllProducts = async () => {
  try {
    const { rows: product } = await client.query(`
    ${getAllProductsQuery}
    ORDER BY Id
    `);
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductsByCollectionId = async (id) => {
  try {
    const { rows: products } = await client.query(
      `
    ${getAllProductsQuery}
    WHERE products."collectionId" = $1
    ORDER BY Id
    `,
      [id]
    );

    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  ${getAllProductsQuery}
  WHERE products.id = $1
  ORDER BY Id
  `,
      [id]
    );

    if (!product.id) {
      const error = Error({message : "no product found"});
      error.status = 401;
      throw error;
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductByName = async (name) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  ${getAllProductsQuery}
  WHERE products.name = $1
  ORDER BY Id
  `,
      [name]
    );

    if (!product.id) {
      const error = Error({message: "no product found"});
      error.status = 401;
      throw error;
    }
    return product
  } catch (error) {
    throw error;
  }
}

const deleteProduct = async (id) => {
  try {
    const { rows: [deletedProduct] } = await client.query(`
    DELETE
    FROM products
    WHERE "id"=$1
    RETURNING *;`, [id])

    if(!deletedProduct.id){
      const error = new Error(`Product with the id ${id} does not exist`)
      error.status = 401;
      throw error;
    }

    return deletedProduct;
  } catch (error) {
    throw error;
  }
}

const editProduct = async ({id,...fields}) => {
  try {
    const setFields = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`)
    .join(', ');
      
    if(!setFields.length){
      const error = new Error("You must atleast have one field to edit");
      error.status = 400;
      throw error
    }
      const {rows: [product] } = await client.query(`
        UPDATE products
        SET ${setFields}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields))

      if(!product.id){
        const error = new Error(`Product with the id ${id} does not exist`)
        error.status = 401;
        throw error;
      }
      return product;
    } catch (error) {
      throw error;
    }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCollectionId,
  getProductById,
  getProductByName,
  deleteProduct,
  editProduct,
};
