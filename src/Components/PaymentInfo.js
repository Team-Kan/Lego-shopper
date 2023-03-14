import React, { useState } from "react";

const PaymentInfo = (props) => {
  const { setPaymentForm, setReviewOrder } = props;
  const [fullName, setFullName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setPaymentForm(false);
        setReviewOrder(true);
      }}
      className="checkout-form"
    >
      <h1>Payment</h1>
      <label>Name (as shown on card)</label>
      <input
        placeholder="enter name here..."
        value={fullName}
        onChange={(ev) => setFullName(ev.target.value)}
      />
      <label>Card Number</label>
      <input
        placeholder="1111-2222-3333"
        value={cardNum}
        onChange={(ev) => setCardNum(ev.target.value)}
      />
      <label>Security Code:</label>
      <input
        value={securityCode}
        maxLength="4"
        onChange={(ev) => setSecurityCode(ev.target.value)}
      />
      <label>Zipcode</label>
      <input 
        value={zipcode} 
        maxLength="10" 
        onChange={(ev) => setZipcode(ev.target.value)} 
      />
      <button className="checkout-form-button" type="submit">
        Next: Review Your Order
      </button>
    </form>
  );
};

export default PaymentInfo;
