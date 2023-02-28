import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Register = ({ attemptLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async({ username, password})=> {
    fetch(
      '/api/auth/register',
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
        console.log(data);
      }
    });
  };

  const _register = (ev)=> {
    ev.preventDefault();
    register({ username, password });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={ _register }>
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
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
