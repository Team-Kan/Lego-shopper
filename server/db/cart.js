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
        if(cart.cartProductId){
          const product = {
            cartId: cart.cartId,
            cartProductId: cart.cartProductId,
            id:   cart.productId,
            quantity: cart.quantity,
            name: cart.name, 
            description: cart.description,
            price: cart.price,
            imageUrl: cart.imageUrl
          }
          cartsById[cart.cartId].products.push(product);
        }
    })

    return cartsById;
}

const allCartsJoinQuery = `SELECT carts."userId", carts."isActive", carts.id AS "cartId",
carts_products.id AS "cartProductId", carts_products."productId", carts_products.quantity,
products.name, products.description, products.price, products."imageUrl" FROM carts
LEFT JOIN carts_products ON "cartId" = carts.id
LEFT JOIN products ON "productId" = products.id`;


const getActiveCartByUserId = async (id) => {
    const { rows } = await client.query(`
    ${allCartsJoinQuery}
    WHERE "userId" = $1 AND "isActive" = true;
    `, [id]);
    
    let cart = attachProductsToCart(rows);
    cart = Object.values(cart);

    return cart;
}

const getInactiveCartsByUserId = async (id) => {
    const { rows } = await client.query(`
    ${allCartsJoinQuery}
    WHERE "userId" = $1 AND "isActive" = false;
    `, [id]);
    
    let carts = attachProductsToCart(rows);
    console.log(carts);
    carts = Object.values(carts);
    
    return carts;
}

const checkoutCart = async(id) => {
    const { rows: [cart]} = await client.query(`
    UPDATE carts 
    SET "isActive" = false
    WHERE id = $1
    RETURNING *
    `, [id]);

    return cart;
}

module.exports = {
    createCart,
    getActiveCartByUserId,
    getInactiveCartsByUserId,
    checkoutCart
}