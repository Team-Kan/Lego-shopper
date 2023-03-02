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
  const {
    rows: [product],
  } = await client.query(
    `
  INSERT INTO products(name, description, "collectionId", price, "imageUrl", "pieceCount", quantity)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `,
    [name, description, collectionId, price, imageUrl, pieceCount, quantity]
  );

  console.log(product);

  return product;
};

const getAllProducts = async () => {
  try {
    const { rows: product } = await client.query(`
    ${getAllProductsQuery}
    ORDER BY Id
    `);
    return product;
  } catch (error) {
    console.log(error);
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

    if (!products.length) {
      const error = Error({message: "collection does not exist"});
      error.status = 401;
      throw error;
    }

    return products;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCollectionId,
  getProductById,
  getProductByName,
};
