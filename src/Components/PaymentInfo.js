import React, { useState } from "react";

const PaymentInfo = (props) => {
  const { setPaymentForm, setReviewOrder } = props;
  const [fullName, setFullName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState('');

  const nextPage = async(ev) => {
    ev.preventDefault(); 
    const fields = [fullName, cardNum, zipcode, securityCode];
    const result = fields.filter(field => field === '');
    if(result.length !== 0) {
      setError("You must fill out all fields");
    } else {
      setPaymentForm(false); 
      setReviewOrder(true);
      setError('');
    }
  }

  return (
    <form
      onSubmit={(ev) => {
        nextPage(ev);
      }}
      className="checkout-form"
    >
      <h1>Payment</h1>
      <label>Name (as shown on card)</label>
      <input
        minLength='4'
        placeholder="enter name here..."
        value={fullName}
        onChange={(ev) => setFullName(ev.target.value)}
      />
      <label>Card Number</label>
      <input
        placeholder="1111-2222-3333-4444"
        minLength='16'
        value={cardNum}
        onChange={(ev) => setCardNum(ev.target.value)}
      />
      <label>Security Code:</label>
      <input
        value={securityCode}
        minLength='3'
        maxLength="4"
        onChange={(ev) => setSecurityCode(ev.target.value)}
      />
      <label>Zipcode</label>
      <input 
        value={zipcode} 
        minLength='5'
        maxLength='10' 
        onChange={(ev) => setZipcode(ev.target.value)} 
      />
      <button className="checkout-form-button" type="submit">
        Next: Review Your Order
      </button>
      {error}
    </form>
  );
};

export default PaymentInfo;
