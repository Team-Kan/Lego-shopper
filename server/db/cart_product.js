const client = require('./client');

const AttachProductToCart = async({ cartId, productId, quantity }) => {
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

module.exports = {
    AttachProductToCart,
    getCartProductsByCartId
}