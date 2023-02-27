const client = require('./client');

const createCart = async ({ id }) => {
    const SQL = `
    INSERT into carts("userId")
    VALUES ($1)
    RETURNING *`;

    const { rows: [cart] } = await client.query(SQL, [id]);
    return cart;
}

const attachProductsToCart = (carts) => {
    const cartsById = {};

    carts.forEach(cart => {
        if(!cartsById[cart.cartId]) {
            cartsById[cart.cartId] = {
                id: cart.cartId,
                userId: cart.userId,
                isActive: cart.isActive,
                products: []
            }
        }
        const product = {
            cartId: cart.cartId,
            cartProductId: cart.id,
            id:   cart.productId,
            quantity: cart.quantity,
            name: cart.name, 
            description: cart.description,
            price: cart.price,
            imageUrl: cart.imageUrl
        }
        cartsById[cart.cartId].products.push(product);
    })

    return cartsById;
}

const getAllCarts = async() => {
    const SQL = `
    SELECT carts."userId", carts."isActive", carts_products.*, products.name, products.description, 
    products.price, products."imageUrl" FROM carts_products
    JOIN carts ON "cartId" = carts.id
    JOIN products ON "productId" = products.id`;

    const { rows } = await client.query(SQL);

    let carts = attachProductsToCart(rows);
    carts = Object.values(carts);
    return carts;
}

const getActiveCartByUserId = async (id) => {
    const carts = await getAllCarts();
    const [cart] = carts.filter(cart => {
        return cart.userId === id && cart.isActive === true;
    })
    return cart;
}

const getInactiveCartsByUserId = async (id) => {

}

module.exports = {
    createCart,
    getAllCarts,
    getActiveCartByUserId,
    getInactiveCartsByUserId
}