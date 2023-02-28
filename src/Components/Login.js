import React, { useState } from 'react';

const Login = ({ attemptLogin })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async({ username, password})=> {
    fetch(
      '/api/auth/',
      {
        method: 'POST',
        body: JSON.stringify({ username, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then( response => response.json())
    .then( (data) => {
      if(data.token){
        window.localStorage.setItem('token', data.token);
        attemptLogin();
      }
      else {
        console.log(data);
      }
    });
  };

  const _login = (ev)=> {
    ev.preventDefault();
    login({ username, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ _login }>
        <input
          placeholder='username'
          value = { username }
          onChange = { ev => setUsername(ev.target.value) }
          />
        <input
          placeholder='password'
          value={ password }
          onChange = { ev => setPassword(ev.target.value) }
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
