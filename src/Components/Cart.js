import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../api/cartFetchCalls';

const Cart = () => {
  const [ cart, setCart ] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const token = window.localStorage.getItem('token');

  

  const retrieveCartAndProducts = async(token) => {
    const fakeProducts = [{
      id: 1, 
      name: "Lunar Research Base",
      description: "Inspired by NASA's Artemis Base Camp Concept",
      collectionId: 1,
      price: 59.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/81ctAoJcr9L._AC_SX679_.jpg",
      pieceCount: 768,
      quantity: 1,
    },
    {
      id: 2,
      name: "Recycling Truck",
      description:
        "Caring for the environment is fun with this recycling truck set, featuring a recycling center, 3 minifigures and a cat figure.",
      collectionId: 1,
      price: 19.99,
      imageUrl:
        "https://m.media-amazon.com/images/I/81TR1DUg4ML._AC_SX679_.jpg",
      pieceCount: 261,
      quantity: 1,
    }
    ];
    setCartProducts(fakeProducts);
    // const cart = await fetchCart(token);
    // console.log(cart);
    // if(cart.products) {
    //   console.log(cart.products);
    //   setCartProducts(cart.products);
    // } 
    // setCart(cart);
  }

  useEffect(()=> {
    if(token) {
      retrieveCartAndProducts(token)
    }
  }, [])

  return (
    <div>
      <Link to="/">Continue Shopping</Link>
      <div>
        <ul>
          {
            cartProducts.map(product => {
              return(
                <div key={product.id}>
                  <Link to={`/product/${product.id}`}><img src={product.imageUrl} /></Link>
                  <li>{product.name}</li>
                  <button>-</button>
                  <li>{product.quantity}</li>
                  <button>+</button>
                  <li>Price: ${product.price}</li>
                </div>
              )
            })
          }
        </ul>
        <button>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;