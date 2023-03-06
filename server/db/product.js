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

const deleteProduct = async (id) => {
  try {
    const { rows: [deletedProduct] } = await client.query(`
    DELETE
    FROM products
    WHERE "id"=$1
    RETURNING *;`, [id])
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
}

const editProduct = async ({id,...fields}) => {
  try {
    const setFields = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`)
    .join(', ');
      
    if(!setFields.length){
      throw new Error("You must atleast have one field to edit");
    }
      const {rows: [product] } = await client.query(`
        UPDATE products
        SET ${setFields}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields))

      return product;
    } catch (error) {
      console.log(error);
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
