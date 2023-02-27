const client = require('./client');

const addProductToCart = async({ cartId, productId, quantity }) => {
    const SQL = `
    INSERT into carts_products("cartId", "productId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const { rows: [cart_product]} = await client.query(SQL, [ cartId, productId, quantity ]);
    return cart_product;
}

const getCartProductsByCartId = async({ id }) => {
    const SQL = `
    SELECT * FROM carts_products
    WHERE "cartId" = $1`;

    const { rows } = await client.query(SQL, [id]);
    return rows;
}

const editCartProduct = async(cartId, productId, quantity) => {
    const SQL = `
    UPDATE carts_products
    SET quantity = $3
    WHERE "cartId"=$1 AND "productId"=$2
    RETURNING *
    `;

    const { rows: [cart_product]} = await client.query(SQL, [cartId, productId, quantity]);
    return cart_product;
}

const deleteCartProduct = async(cartId, productId) => {
    const SQL = `
    DELETE FROM carts_products
    WHERE "cartId"=$1 AND "productId"=$2
    RETURNING *
    `;

    const { rows: [cart_product]} = await client.query(SQL, [cartId, productId]);
    return cart_product;
}

module.exports = {
    addProductToCart,
    getCartProductsByCartId,
    editCartProduct,
    deleteCartProduct
}