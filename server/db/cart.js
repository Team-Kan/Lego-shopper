const client = require('./client');

const createCart = async({ id }) => {
    const SQL = `
    INSERT into carts("userId")
    VALUES ($1)
    RETURNING *`;

    const { rows: [cart]} = await client.query(SQL, [id]);
    console.log(cart);
    return cart;
}

module.exports = {
    createCart
}