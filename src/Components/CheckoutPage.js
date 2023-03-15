import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkoutCart } from '../api/cartFetchCalls';
import {PaymentInfo, DeliveryInfo} from '.';


const CheckoutPage = (props) => {
    const {cart, itemCount, total, tax, shipping, finalTotal, retrieveCartAndProducts, showAllProducts } = props;
    const [showDeliveryForm, setDeliveryForm] = useState(true);
    const [showPaymentForm, setPaymentForm] = useState(false);
    const [showReviewOrder, setReviewOrder] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const token = window.localStorage.getItem('token');

    const processCheckout = async (cartId) => {
        const products = [];
        for(let i = 0; i< cart.products.length; i++) {
            const obj = {};
            const product = cart.products[i];
            obj.id = product.id;
            obj.updatedStock = product.stock - product.quantity;
            obj.html = `<li key=${product.id}>${product.name} x ${product.quantity}</li>`
            products.push(obj);
        }
        await checkoutCart(cartId, products, firstName, email, finalTotal);
        await showAllProducts();
        await retrieveCartAndProducts();
        console.log('checkout complete');
    }


    return (
        <div>
            <br/>
            <div className='cart-container'>
            <Link to="/cart" className="cart-links">Back to Cart</Link>
                <div className='cart-product-container'>
                    { showDeliveryForm ? (
                      <DeliveryInfo  
                        firstName={firstName} 
                        setFirstName={setFirstName} 
                        email={email} 
                        setEmail={setEmail} 
                        setDeliveryForm={setDeliveryForm} 
                        setPaymentForm={setPaymentForm}
                        />)
                    : null }
                    { showPaymentForm ? (
                      <PaymentInfo setPaymentForm={setPaymentForm} setReviewOrder={setReviewOrder}/>
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
                    <button disabled={ !showReviewOrder || !itemCount } className='checkout-button' onClick={() => { processCheckout(cart.id) }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;