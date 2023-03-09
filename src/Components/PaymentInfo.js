import React from 'react'

const PaymentInfo = (props) => {
   const { setPaymentForm, setReviewOrder} = props
  return (
      <form onSubmit={(ev) => { ev.preventDefault(); setPaymentForm(false); setReviewOrder(true); }}
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
  )
}

export default PaymentInfo
