import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkoutCart, fetchCart } from '../api/cartFetchCalls';

const CheckoutPage = () => {
    const [cart, setCart] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const [total, setTotal] = useState(0);
    const token = window.localStorage.getItem('token');

    const retrieveCartAndProducts = async (token) => {
        const cart = await fetchCart(token);
        if (cart.products) {
            cart.products.sort((a, b) => a.cartProductId - b.cartProductId);
            const items = cart.products.reduce((acc, curr) => acc + curr.quantity, 0);
            setItemCount(items);

            const cost = (Math.round(100 * cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)) / 100).toFixed(2);
            setTotal(cost);
        }
        setCart(cart);
    }

    const processCheckout = async (cartId) => {
        const response = await checkoutCart(token, cartId);
        console.log(response);
        if (!response.error) {
          const result = await retrieveCartAndProducts(token);
        } else {
          console.log("issue");
        }
      }

    useEffect(() => {
        if (token) {
            retrieveCartAndProducts(token)
        }
    }, [])
    return (
        <div>
            <Link to="/cart">Back to Cart</Link>
            <div className='cart-container'>
                <div className='cart-product-container'>
                    <h1>Delivery Options</h1>
                    <form>
                        <p>First Name</p>
                        <input></input>
                        <p>Last Name</p>
                        <input></input>
                        <p>Street Address</p>
                        <input></input>
                        <p>City</p>
                        <input></input>
                        <p>State</p>
                        <input></input>
                        <p>Zipcode</p>
                        <input></input>
                        <button></button>
                    </form>
                    <h1>Payment</h1>
                    <form>
                        <p>Name (as shown on card)</p>
                        <input></input>
                        <p>Card Number</p>
                        <input></input>
                        <p>Security Code:</p>
                        <input></input>
                        <p>Zipcode</p>
                        <input></input>
                        <button></button>
                    </form>
                    <h1>Order Review</h1>
                    { cart.products ? (
                    <ul>
                        {
                            cart.products.map(product => {
                                return (
                                    <li key={product.id}>{product.name} x {product.quantity}</li>
                                )
                            })
                        }
                    </ul>
                    ): null }
                    <p>Total $</p>
                </div>
                <div className='checkout-container'>
                    <p>In Your Cart</p>
                    <hr></hr>
                    <p>Items ({itemCount})</p>
                    <p>Subtotal: ${total}</p>
                    <p>Estimated Shipping</p>
                    <p>Estimated Tax</p>
                    <p>Total $</p>
                    <p></p>
                    <button className='checkout-button' onClick={() => { processCheckout(cart.id) }}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;