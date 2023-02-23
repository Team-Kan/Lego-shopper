const client = require('./client');

const AttachProductToCart = async({ cartId, productId, quantity }) => {
    const SQL = `
    INSERT into carts_products("cartId", "productId", quantity)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const { rows: [cart_product]} = await client.query(SQL, [ cartId, productId, quantity ]);
    console.log(cart_product);
    return cart_product;
}

module.exports = {
    AttachProductToCart
}