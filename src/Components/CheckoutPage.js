import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkoutCart } from '../api/cartFetchCalls';

const CheckoutPage = (props) => {
    const {cart, itemCount, total, tax, shipping, finalTotal, retrieveCartAndProducts, showAllProducts } = props;
    const [showDeliveryForm, setDeliveryForm] = useState(true);
    const [showPaymentForm, setPaymentForm] = useState(false);
    const [showReviewOrder, setReviewOrder] = useState(false);
    const token = window.localStorage.getItem('token');

    const processCheckout = async (cartId) => {
        const products = [];
        for(let i = 0; i< cart.products.length; i++) {
            const obj = {};
            const product = cart.products[i];
            obj.id = product.id;
            obj.quantity = product.stock - product.quantity;
            products.push(obj);
        }
        await checkoutCart(token, cartId, products);
        await showAllProducts();
        await retrieveCartAndProducts();
        console.log('checkout complete');
    }


    return (
        <div>
            <br/>
            <div className='cart-container'>
            <Link to="/cart">Back to Cart</Link>
                <div className='cart-product-container'>
                    { showDeliveryForm ? (
                    <form onSubmit={(ev) => {ev.preventDefault(); setDeliveryForm(false); setPaymentForm(true);}}
                        className="checkout-form">
                        <h1>Delivery Options</h1>
                        <div>
                            <p>First Name</p>
                            <input></input>
                            <p>Last Name</p>
                            <input></input>
                        </div>
                        <p>Street Address</p>
                        <input></input>
                        <p>City</p>
                        <input></input>
                        <p>State</p>
                        <input></input>
                        <p>Zipcode</p>
                        <input></input>
                        <button className="checkout-form-button" type='submit'>Next: Payment Details</button>
                    </form>)
                    : null }
                    { showPaymentForm ? (
                    <form onSubmit={(ev) => {ev.preventDefault(); setPaymentForm(false); setReviewOrder(true);}}
                    className="checkout-form">
                        <h1>Payment</h1>
                        <p>Name (as shown on card)</p>
                        <input></input>
                        <p>Card Number</p>
                        <input></input>
                        <p>Security Code:</p>
                        <input></input>
                        <p>Zipcode</p>
                        <input></input>
                        <button className="checkout-form-button" type='submit'>Next: Review Your Order</button>
                    </form>
                    ): null}
                    {showReviewOrder ? (
                        <div>
                            <h1>Order Review</h1>
                            {
                                cart.products ? (
                                <div>
                                    <ul>
                                        {
                                            cart.products.map(product => {
                                                return (
                                                    <li key={product.id}>{product.name} x {product.quantity}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                ) : (
                                    <p>Thank you for shopping at reKANstructed!</p>
                                )}
                        </div>
                    ) : null}
                </div>
                <div className='final-checkout-container'>
                    <p>In Your Cart</p>
                    <hr></hr>
                    <p>Items ({itemCount})</p>
                    <p>Subtotal: ${total}</p>
                    <p>Estimated Shipping: {shipping}</p>
                    <p>Estimated Tax: ${tax} </p>
                    <p>Total ${finalTotal}</p>
                    <p></p>
                    <button disabled={!itemCount} className='checkout-button' onClick={() => { processCheckout(cart.id) }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;