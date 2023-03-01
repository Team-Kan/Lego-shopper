import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import { fetchAllProducts, fetchAllCollections } from "../api";
import { Link, Routes, Route, Navigate } from 'react-router-dom';


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
      <nav>
        <Link to='/'>Home</Link>
        {
          auth.id ? (
            <>
              <button onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )
        }
      </nav>
      <Routes>
            <Route path='/' element= { <Home products ={products} collections={collections}/> } />
            <Route path='/login' element={<Login attemptLogin={attemptLogin} />} />
            <Route path='/register' element={<Register attemptLogin={attemptLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
