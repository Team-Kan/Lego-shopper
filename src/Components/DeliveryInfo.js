import React, { useState } from 'react';
import { states } from '../api/cartFetchCalls';

const DeliveryInfo = (props) => {
    const { setDeliveryForm, setPaymentForm, firstName, setFirstName, email, setEmail } = props;
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [secondLine, setSecondLine] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState('');

    const nextPage = async(ev) => {
      ev.preventDefault(); 
      const fields = [firstName, lastName, street, city, state, zipcode, email];
      const result = fields.filter(field => field === '');
      if(result.length !== 0) {
        setError("You must fill out all fields");
      } else {
        setDeliveryForm(false); 
        setPaymentForm(true); 
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
      <h1>Delivery Options</h1>
      <div>
        <p>First Name</p>
        <input
          className='name-input'
          minLength='2'
          placeholder="First Name"
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
        />
        <p>Last Name</p>
        <input
          className='name-input'
          minLength='2'
          placeholder="Last Name"
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
        />
      </div>
      <p>Street Address</p>
      <input
        placeholder="Street Address Line 1"
        value={street}
        onChange={(ev) => setStreet(ev.target.value)}
      />
      <input
        placeholder="Street Address Line 2"
        value={secondLine}
        onChange={(ev) => setSecondLine(ev.target.value)}
      />
      <div>
        <p>City</p>
        <input
          className='city-input'
          minLength='2'
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
        />
        <p>State</p>
        <select
          className='state-dropdownlist'
          placeholder="State"
          value={state}
          onChange={(ev) => setState(ev.target.value)}
        >
          <option value=''>--select a state--</option>
          {
            states.map((state, idx) => {
              return (
                <option key={idx}>{state}</option>
              )
            })
          }
        </select>
        <p>Zipcode</p>
        <input
          className='zipcode-input'
          minLength='5'
          maxLength='10'
          value={zipcode}
          onChange={(ev) => setZipcode(ev.target.value)}
        />
      </div>
      <p>Email Address</p>
      <input
        value={email}
        minLength='5'
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <button className="checkout-form-button" type='submit'>Next: Payment Details</button>
      {error}
    </form>
  )
}

export default DeliveryInfo;
