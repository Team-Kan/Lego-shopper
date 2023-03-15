import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCartProduct, updateQuantityFetch } from '../api/cartFetchCalls';

const Cart = (props) => {
  const {cart, itemCount, total, retrieveCartAndProducts } = props;
  const token = window.localStorage.getItem('token');
  const navigate = useNavigate();

  const localCartChangeValue = (product, value) => {
    console.log(product);
    const productId = cart.products.indexOf(product);
    cart.products[productId].quantity += value;
    window.localStorage.setItem("cart", JSON.stringify(cart));
    retrieveCartAndProducts();
  }

  const localCartRemoval = (product) => {
    const productId = cart.products.indexOf(product);
    cart.products.splice(productId, 1);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    retrieveCartAndProducts();
  }

  const decreaseQuantity = async (product) => {
    if (product.quantity - 1 === 0) {
      return;
    } else {
      if(token){
      product.quantity--;
      const response = await updateQuantityFetch(token, cart.id, product.id, product.quantity);
      if (!response.error) {
        return await retrieveCartAndProducts();
      } else {
        return console.log("error decreasing quantity");
      }
    } else {
      localCartChangeValue(product, -1)
    }
  }
}

  const increaseQuantity = async (productId, stock, quantity, product) => {
    if (quantity < stock) {
      if(token){
        quantity++;
        const response = await updateQuantityFetch(token, cart.id, productId, quantity);
        if (!response.error) {
          await retrieveCartAndProducts();
        } else {
          console.log("error increasing quantity");
        }
      } else {
        localCartChangeValue(product, 1)
      }
    } else {
      console.log("here");
      return;
    }
  }

  const removeItem = async(product) => {
    if(token){
      const response = await deleteCartProduct(token, cart.id, product.id);
      console.log(response);
      if (!response.error) {
        await retrieveCartAndProducts();
      } else {
        console.log("issue");
      }
    } else {
      localCartRemoval(product)
    }
  }

  return (
    <div>
      <br/>
      <div className='cart-container'> 
        <Link to="/" className="cart-links">Back to Shopping</Link>
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
                      onClick={() => { decreaseQuantity(product) }}>-</button>
                      <p>{product.quantity}</p>
                      <button className = 'quantity-button'
                      onClick={() => { increaseQuantity(product.id, product.stock, product.quantity, product) }}>+</button>
                      <p></p>
                      <button onClick={() => { removeItem(product)}}>Remove</button>
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