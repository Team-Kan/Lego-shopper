import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import Collection from './Collection';
import Nav from './Nav';
import { fetchAllProducts, fetchAllCollections } from "../api";
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Cart';
import SingleProduct from './SingleProduct';


const App = ()=> {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

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
  }, []);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }



  return (
    <div>
      <h1>Welcome to reKANstructed!</h1>
      <Nav auth={auth} logout={logout}/>
      <Routes>
        <Route path='/' element= { <Home products ={products} collections={collections}/> } />
        <Route path='/login' element={<Login attemptLogin={attemptLogin} />} />
        <Route path='/register' element={<Register attemptLogin={attemptLogin} />} />
        <Route path='/admin' element={<Admin auth={auth}/>}/>
        <Route path='/collections/:id' element={<Collection collections={collections}/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/product/:id' element={<SingleProduct />}/>
      </Routes>
    </div>
  );
};

export default App;
