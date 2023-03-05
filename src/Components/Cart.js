import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCartProduct, fetchCart, updateQuantityFetch } from '../api/cartFetchCalls';

const Cart = () => {
  const [ cart, setCart ] = useState({});
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const token = window.localStorage.getItem('token');

  const retrieveCartAndProducts = async(token) => {
    const cart = await fetchCart(token);
    if(cart.products) {
      const items = cart.products.reduce((acc, curr) => acc + curr.quantity, 0);
      setItemCount(items);

      let cost = (Math.round(100*cart.products.reduce((acc, curr) => acc + curr.price*curr.quantity, 0))/100).toFixed(2);
      setTotal(cost);
    } 
    setCart(cart);
  }

  const decreaseQuantity = async (productId, quantity) => {
    if (quantity - 1 === 0) {
      return;
    } else {
      quantity--;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      if (!response.error) {
        const result = await retrieveCartAndProducts(token);
      } else {
        console.log("error decreasing quantity");
      }
    }
  }

  const increaseQuantity = async(productId, quantity) => {
      quantity++;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      if (!response.error) {
        const result = await retrieveCartAndProducts(token);
      } else {
        console.log("error increasing quantity");
      }
  }

  const removeItem = async(productId) => {
    const response = await deleteCartProduct(token, cart.id, productId);
    console.log(response);
    if (!response.error) {
      const result = await retrieveCartAndProducts(token);
    } else {
      console.log("issue");
    }
  }

  useEffect(()=> {
    if(token) {
      retrieveCartAndProducts(token)
    }
  }, [])

  return (
    <div>
      <Link to="/">Back to Shopping</Link>
      <div className='cart-container'> 
        <div className = 'cart-product-container'>
          {cart.products ? (
            <ul>
              {
                cart.products.map(product => {
                  return (
                    <div key={product.id} className = 'cart-product'>
                      <Link to={`/product/${product.id}`}><img className = 'cart-product-image' src={product.imageUrl} /></Link>
                      <li className = 'cart-product-info'>
                        <p>{product.name}</p>
                        <p>Price: ${product.price}</p>
                      </li>
                      <button className = 'quantity-button' 
                      onClick={() => { decreaseQuantity(product.id, product.quantity) }}>-</button>
                      <p>{product.quantity}</p>
                      <button className = 'quantity-button'
                      onClick={() => { increaseQuantity(product.id, product.quantity) }}>+</button>
                      <p></p>
                      <button onClick={() => { removeItem(product.id)}}>Remove</button>
                    </div>
                  )
                })
              }
            </ul>
          ) : (<h2>Add items to cart</h2>)}
        </div>
        <div className = 'checkout-container'>
          <p>Order Summary</p>
          <hr></hr>
          <p>Items ({itemCount})</p>
          <p>Subtotal: ${total}</p>
          <button className='checkout-button'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;