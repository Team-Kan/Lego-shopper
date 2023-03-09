import React from 'react'

const DeliveryInfo = (props) => {
    const { setDeliveryForm, setPaymentForm} = props
    return (
        <form 
          onSubmit={(ev) => { ev.preventDefault(); setDeliveryForm(false); setPaymentForm(true); }}
          className="checkout-form"
        >
          <h1>Delivery Options</h1>
          <div>
            <p>First Name</p>
            <input />
            <p>Last Name</p>
            <input />
          </div>
          <p>Street Address</p>
          <input />
          <p>City</p>
          <input />
          <p>State</p>
          <input />
          <p>Zipcode</p>
          <input />
          <button className="checkout-form-button" type='submit'>Next: Payment Details</button>
        </form>
    )
}

export default DeliveryInfo;
