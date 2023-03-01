import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import { Link, Routes, Route, Navigate } from 'react-router-dom';


const App = ()=> {
  const [auth, setAuth] = useState({});
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

  useEffect(()=> {
    attemptLogin();
  }, []);

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  }

  // having trouble with this function
  // const login = async({ username, password})=> {
  //   fetch(
  //     '/api/auth/',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({ username, password}),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //   .then( response => response.json())
  //   .then( (data) => {
  //     if(data.token){
  //       window.localStorage.setItem('token', data.token);
  //       attemptLogin();
  //     }
  //     else {
  //       console.log(data);
  //     }
  //   });
  // };

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
            <Route path='/' element= { <Home /> } />
            <Route path='/login' element={<Login attemptLogin={attemptLogin} />} />
            <Route path='/register' element={<Register attemptLogin={attemptLogin} />} />
            <Route path='/products' element={<Products/>}/>
      </Routes>
    </div>
  );
};

export default App;
