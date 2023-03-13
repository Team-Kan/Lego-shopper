const MAIN_URL = "http://localhost:3000/"

const fetchCart = async (token) => {
  const response = await fetch(`${MAIN_URL}api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  const result = await response.json();
  return result;
}

const fetchCartProducts = async(token, cartId) => {
  const response = await fetch(`${MAIN_URL}api/cart-products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      cartId: cartId,
    })
  })
  const result = await response.json();
  return result;
}

const updateQuantityFetch = async (token, cartId, productId, quantity) => {
  console.log(quantity);
  const response = await fetch(`${MAIN_URL}api/cart-products`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      cartId: cartId,
      productId: productId,
      quantity: quantity
    })
  })
  const result = await response.json();
  return result;
}

const deleteCartProduct = async(token, cartId, productId) => {
  const response = await fetch(`${MAIN_URL}api/cart-products`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      cartId: cartId,
      productId: productId
    })
  })
  const result = await response.json();
  return result;
}

const checkoutCart = async(cartId, products) => {  
  const response = await fetch(`${MAIN_URL}api/cart/${cartId}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({
      products: products
    })
  })
  const result = await response.json();
  return result;
}

const addProductToCartFetch = async ({
  cartId,
  productId,
  quantity,
  token,
}) => {
  const response = await fetch(`http://localhost:3000/api/cart-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cartId, productId, quantity }),
  });
  const results = await response.json();

  return results;
};


module.exports = {
  fetchCart, 
  fetchCartProducts,
  updateQuantityFetch,
  deleteCartProduct, 
  checkoutCart,
  addProductToCartFetch
};