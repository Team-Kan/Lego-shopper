const client = require('./client');

const createCart = async ({ id }) => {
    try {
      const SQL = `
        INSERT into carts("userId")
        VALUES ($1)
        RETURNING *`;
    
      const { rows: [cart] } = await client.query(SQL, [id]);
      return cart;   
    } catch (error) {
      throw error;
    }
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
            stock: cart.stock,
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
products.name, products.description, products.price, products."imageUrl", products.quantity AS "stock" FROM carts
LEFT JOIN carts_products ON "cartId" = carts.id
LEFT JOIN products ON "productId" = products.id`;


const getActiveCartByUserId = async (id) => {
    try {
      const { rows } = await client.query(`
        ${allCartsJoinQuery}
        WHERE "userId" = $1 AND "isActive" = true
        ORDER BY "cartProductId";
      `, [id]);
    
      let cart = attachProductsToCart(rows);
      cart = Object.values(cart);

      return cart;
    } catch (error) {
      throw error;
    }
}

const getInactiveCartsByUserId = async (id) => {
  try {
    const { rows } = await client.query(`
      ${allCartsJoinQuery}
      WHERE "userId" = $1 AND "isActive" = false;
    `, [id]);
    
    let carts = attachProductsToCart(rows);
    carts = Object.values(carts);
    
    return carts;  
  } catch (error) {
  throw error;
  }   
}

const checkoutCart = async(id) => {
    try {
      const { rows: [cart]} = await client.query(`
        UPDATE carts 
        SET "isActive" = false
        WHERE id = $1
        RETURNING *
      `, [id]);
    
      return cart;    
    } catch (error) {
      throw error;
    }
    
}

const calculateOrder = (cart) => {
  let items = 0;
  let cost = 0;
  let tax = 0;
  let shipping = "$9.95";
  let finalTotal = 0;
  console.log(cart)
  if (cart.products && cart.products.length) {
    cart.products.sort((a, b) => a.cartProductId - b.cartProductId);
      items = cart.products.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );

    cost = (  
          cart.products.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0
          )
    ).toFixed(2);

    tax = (0.06 * cost).toFixed(2);

    if (cost > 35) {
      shipping = "Free";
      finalTotal = (Number(tax) + Number(cost)).toFixed(2);
    } else {
      finalTotal = (Number(tax) + Number(cost) + 9.95).toFixed(2);
    }
  }

  return {itemCount: items, cost, tax, shipping, finalTotal}
}

module.exports = {
    createCart,
    getActiveCartByUserId,
    getInactiveCartsByUserId,
    checkoutCart,
    calculateOrder
}