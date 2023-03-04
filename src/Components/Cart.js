import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, updateQuantityFetch } from '../api/cartFetchCalls';

const Cart = () => {
  const [ cart, setCart ] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const token = window.localStorage.getItem('token');

  

  const retrieveCartAndProducts = async(token) => {
    const cart = await fetchCart(token);
    console.log(cart);
    if(cart.products) {
      console.log(cart.products);
      //setCartProducts(cart.products);
    } 
    setCart(cart);
  }

  const decreaseQuantity = async (productId, quantity) => {
    if (quantity - 1 === 0) {
      return;
    } else {
      quantity--;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      console.log(response);
      if (!response.error) {
        const result = await retrieveCartAndProducts(token);
        console.log("here is the result ")
        
      } else {
        console.log("finished updating quantity");
      }
    }
  }

  const increaseQuantity = async(productId, quantity) => {
    if (quantity - 1 === 0) {
      return;
    } else {
      quantity++;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      console.log(response);
      if (!response.error) {
        const result = await retrieveCartAndProducts(token);
        console.log("here is the result ")
        
      } else {
        console.log("finished updating quantity");
      }
    }
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
        { cart.products ? (
        <ul>
          {
            cart.products.map(product => {
              return(
                <div key={product.id}>
                  <Link to={`/product/${product.id}`}><img src={product.imageUrl} /></Link>
                  <li>{product.name}</li>
                  <button onClick={() => {decreaseQuantity(product.id, product.quantity)}}>-</button>
                  <li>{product.quantity}</li>
                  <button onClick = {() => {increaseQuantity(product.id, product.quantity)}}>+</button>
                  <li>Price: ${product.price}</li>
                </div>
              )
            })
          }
        </ul> 
        ) : (<h2>Add items to cart</h2>)}
        <button>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;