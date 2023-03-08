import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkoutCart } from '../api/cartFetchCalls';

const CheckoutPage = (props) => {
    const {cart, itemCount, total, tax, shipping, finalTotal, retrieveCartAndProducts } = props;
    // const [cart, setCart] = useState({});
    // const [itemCount, setItemCount] = useState(0);
    // const [total, setTotal] = useState(0);
    // const [tax, setTax] = useState(0);
    // const [shipping, setShipping] = useState('$9.95');
    // const [finalTotal, setFinalTotal] = useState(0);
    const [showDeliveryForm, setDeliveryForm] = useState(true);
    const [showPaymentForm, setPaymentForm] = useState(false);
    const [showReviewOrder, setReviewOrder] = useState(false);
    const token = window.localStorage.getItem('token');

    // const retrieveCartAndProducts = async (token) => {
    //     const cart = await fetchCart(token);
    //     if (cart.products) {
    //         cart.products.sort((a, b) => a.cartProductId - b.cartProductId);
    //         const items = cart.products.reduce((acc, curr) => acc + curr.quantity, 0);
    //         setItemCount(items);

    //         const cost = (Math.round(100 * cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)) / 100).toFixed(2);
    //         setTotal(cost);
            
    //         const tax = Math.round(100*(0.06*cost)/100).toFixed(2);
    //         setTax(tax);

    //         if(cost > 35) {
    //             setShipping('Free');
    //             setFinalTotal((Number(tax)+Number(cost)));
    //         } else if(cost < 35 && cost > 0) {
    //             setShipping('$9.95');
    //             setFinalTotal((Number(tax)+Number(cost)+9.99));
    //         } else {
    //             setFinalTotal((Number(tax)+Number(cost)));
    //         }
    //     }
    //     setCart(cart);
    // }

    const processCheckout = async (cartId) => {
        const response = await checkoutCart(token, cartId);
        console.log(response);
        // setCart({});
        // if (!response.error) {
        await retrieveCartAndProducts();
        console.log('checkout complete');
        // } else {
        //   console.log("issue");
        // }
      }

    // useEffect(() => {
    //     if (token) {
    //         retrieveCartAndProducts(token)
    //     }
    // }, [])
    return (
        <div>
            <Link to="/cart">Back to Cart</Link>
            <div className='cart-container'>
                <div className='cart-product-container'>
                    { showDeliveryForm ? (
                    <form onSubmit={(ev) => {ev.preventDefault(); setDeliveryForm(false); setPaymentForm(true);}}>
                        <h1>Delivery Options</h1>
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
                        <button type='submit'>Next: Payment Details</button>
                    </form>)
                    : null }
                    { showPaymentForm ? (
                    <form onSubmit={(ev) => {ev.preventDefault(); setPaymentForm(false); setReviewOrder(true);}}>
                        <h1>Payment</h1>
                        <p>Name (as shown on card)</p>
                        <input></input>
                        <p>Card Number</p>
                        <input></input>
                        <p>Security Code:</p>
                        <input></input>
                        <p>Zipcode</p>
                        <input></input>
                        <button type='submit'>Next: Review Your Order</button>
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
                                    <p> Total ${finalTotal}</p>
                                </div>
                                ) : (
                                    <p>Thank you for shopping at reKANstructed!</p>
                                )}
                        </div>
                    ) : null}
                </div>
                <div className='checkout-container'>
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