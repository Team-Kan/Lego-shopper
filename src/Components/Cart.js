import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../api/cartFetchCalls';

const Cart = () => {
  const [ cart, setCart ] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const token = window.localStorage.getItem('token');

  const retrieveCartAndProducts = async(token) => {
    const cart = await fetchCart(token);
    console.log(cart);
    if(cart.products.length > 0) {
      console.log(cart.products);
      setCartProducts(cart.products);
    } 
    setCart(cart);
  }

  useEffect(()=> {
    if(token) {
      retrieveCartAndProducts(token)
    }
  }, [])

  return (
    <div>
      <Link to="/">Continue Shopping</Link>
      <div>
        <ul>
          {
            cartProducts.map(cartProduct => {
              console.log(cartProduct);
              <li key={cartProduct.id}>{cartProduct.id}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Cart;