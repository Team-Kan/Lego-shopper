import React, { useEffect, useState } from 'react';
import { Home, Login, Register, Admin, Collection, Nav, Cart, CheckoutPage, SingleProduct } from '.'
import { fetchAllProducts, fetchAllCollections, fetchCart } from "../api";
import { Link, Routes, Route, Navigate } from 'react-router-dom';

const App = ()=> {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [ cart, setCart ] = useState({});
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState('$9.95');
  const [finalTotal, setFinalTotal] = useState(0);

  const attemptLogin = ()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      fetch(
        '/api/auth/',
        {
          method: 'GET',
          headers: {
            'authorization': token 
          }
        }
      )
      .then( response => response.json())
      .then( user => setAuth(user));
    }
  };

  const retrieveCartAndProducts = async() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const cart = await fetchCart(token);
      if (cart.products) {
        cart.products.sort((a, b) => a.cartProductId - b.cartProductId);
        const items = cart.products.reduce((acc, curr) => acc + curr.quantity, 0);
        setItemCount(items);

        const cost = (Math.round(100 * cart.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)) / 100).toFixed(2);
        setTotal(cost);

        const tax = Math.round(100 * (0.06 * cost) / 100).toFixed(2);
        setTax(tax);

        if (cost > 35) {
          setShipping('Free');
          setFinalTotal((Number(tax) + Number(cost)));
        } else if (cost < 35 && cost > 0) {
          setShipping('$9.95');
          setFinalTotal((Number(tax) + Number(cost) + 9.99));
        } else {
          setFinalTotal((Number(tax) + Number(cost)));
        }
      } else {
        setItemCount(0);
        setTotal(0);
        setTax(0);
        setShipping('$9.95');
        setFinalTotal(0);
      }
      setCart(cart);
    }
    //else, setup local cart for the guest user
  }

  const showAllProducts = async () => {
    const product = await fetchAllProducts();
    setProducts(product);
  };

  const showAllCollections = async() => {
    const collections = await fetchAllCollections();
    setCollections(collections);
  }

  useEffect(()=> {
    attemptLogin();
    showAllProducts();
    showAllCollections();
    retrieveCartAndProducts();
  }, []);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }



  return (
    <div>
      <Nav auth={auth} logout={logout} itemCount={itemCount}/>
      <Routes>
        <Route path='/' element= { <Home products ={products} collections={collections}/> } />
        <Route path='/login' element={<Login attemptLogin={attemptLogin} />} />
        <Route path='/register' element={<Register attemptLogin={attemptLogin} />} />
        <Route path='/admin' element={<Admin auth={auth} collections={collections} showAllCollections={showAllCollections} products={products}/>}/>
        <Route path='/collections/:id' element={<Collection collections={collections}/>}/>
        <Route path='/cart' element={<Cart cart={cart} itemCount={itemCount} total={total} retrieveCartAndProducts={retrieveCartAndProducts} />}/>
        <Route path='/checkout' element={<CheckoutPage cart={cart} itemCount={itemCount} total={total} tax={tax} shipping={shipping} finalTotal={finalTotal} retrieveCartAndProducts={retrieveCartAndProducts}/>} />
        <Route path='/product/:id' element={<SingleProduct retrieveCartAndProducts={retrieveCartAndProducts} />}/>
      </Routes>
    </div>
  );
};

export default App;
