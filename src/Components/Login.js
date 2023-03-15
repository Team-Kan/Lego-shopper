import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ attemptLogin })=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const navigate = useNavigate();

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
        navigate('/');
      }
      else {
        setError(data.error)
      }
    });
  };

  const _login = (ev)=> {
    ev.preventDefault();
    login({ username, password });
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
    <div className='border-2 rounded-md p-20 shadow-lg shadow-green-600 bg-white' >
      <h2 className='text-5xl p-10 text-green-700'>Login</h2>
      <form onSubmit={ _login }>
        <input
          className='border-green-700 border-2 rounded-md p-2 shadow-sm shadow-green-600 w-96'
          placeholder='username'
          value = { username }
          onChange = { ev => setUsername(ev.target.value) }
          />
        <input
          className='border-green-700 border-2 rounded-md p-2 shadow-sm shadow-green-600 w-96'
          placeholder='password'
          type="password"
          value={ password }
          onChange = { ev => setPassword(ev.target.value) }
        />
        <div>{error}</div>
        <button 
          className="bg-green-500 rounded-md active:bg-green-600 active:translate-y-1 shadow-md shadow-green-600"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
