import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCartProduct, updateQuantityFetch } from '../api/cartFetchCalls';

const Cart = (props) => {
  const {cart, itemCount, total, retrieveCartAndProducts } = props;
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();

  const decreaseQuantity = async (productId, quantity) => {
    if (quantity - 1 === 0) {
      return;
    } else {
      quantity--;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      if (!response.error) {
        await retrieveCartAndProducts();
      } else {
        console.log("error decreasing quantity");
      }
    }
  }

  const increaseQuantity = async (productId, stock, quantity) => {
    if (quantity < stock) {
      quantity++;
      const response = await updateQuantityFetch(token, cart.id, productId, quantity);
      if (!response.error) {
        await retrieveCartAndProducts();
      } else {
        console.log("error increasing quantity");
      }
    } else {
      return;
    }
  }

  const removeItem = async(productId) => {
    const response = await deleteCartProduct(token, cart.id, productId);
    console.log(response);
    if (!response.error) {
      await retrieveCartAndProducts();
    } else {
      console.log("issue");
    }
  }

  return (
    <div>
      <br/>
      <div className='cart-container'> 
        <Link to="/">Back to Shopping</Link>
        <div className = 'cart-product-container'>
          {cart.products && cart.products.length > 0 ? (
            <ul>
              {
                cart.products.map(product => {
                  return (
                    <div key={product.id} className = 'cart-product'>
                      <Link to={`/product/${product.id}`}><img className = 'cart-product-image' src={product.imageUrl} /></Link>
                      <li className = 'cart-product-info'>
                        <p>{product.name}</p>
                        <p>Price: ${product.price}</p>
                        <p>{product.stock} IN STOCK</p>
                      </li>
                      <button className = 'quantity-button' 
                      onClick={() => { decreaseQuantity(product.id, product.quantity) }}>-</button>
                      <p>{product.quantity}</p>
                      <button className = 'quantity-button'
                      onClick={() => { increaseQuantity(product.id, product.stock, product.quantity) }}>+</button>
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
          <button disabled={!itemCount} className='checkout-button' onClick = {() => { navigate('/checkout') }}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;