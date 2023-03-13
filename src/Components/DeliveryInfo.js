import React, { useState } from 'react';
import { states } from '../api/cartFetchCalls';

const DeliveryInfo = (props) => {
    const { setDeliveryForm, setPaymentForm } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    return (
        <form 
          onSubmit={(ev) => { 
            ev.preventDefault(); 
            setDeliveryForm(false); 
            setPaymentForm(true); 
          }}
          className="checkout-form"
        >
          <h1>Delivery Options</h1>
          <div>
            <p>First Name</p>
            <input 
              placeholder="First Name"
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <p>Last Name</p>
            <input 
              placeholder="Last Name"
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </div>
          <p>Street Address</p>
          <input 
            placeholder="Street Address"
            value={street}
            onChange={(ev) => setStreet(ev.target.value)}
          />
          <p>City</p>
          <input 
            placeholder="City"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <p>State</p>
          <select
            placeholder="State"
            value={state}
            onChange={(ev) => setState(ev.target.value)}
          >
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
            placeholder="Zipcode"
            value={zipcode}
            onChange={(ev) => setZipcode(ev.target.value)}
          />
          <button className="checkout-form-button" type='submit'>Next: Payment Details</button>
        </form>
    )
}

export default DeliveryInfo;
