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

module.exports = {
  fetchCart, 
  fetchCartProducts,
  updateQuantityFetch
};