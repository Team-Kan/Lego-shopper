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
  
  module.exports = {
      fetchCart
  };