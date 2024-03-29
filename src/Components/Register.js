import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { createUser } from '../api';

const Register = ({ attemptLogin, setIsLoading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const register = async({ username, password})=> {
    setIsLoading(true)
    const user = await createUser({username, password});

    if(user.error){
      return setError(user.error);
    }
    
    if(user.token){
      window.localStorage.setItem('token', user.token);
      attemptLogin();
      navigate('/');
    }
  };

  const _register = (ev)=> {
    ev.preventDefault();
    register({ username, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
    <div className='border-2 rounded-md p-20 shadow-lg shadow-green-600 bg-white'>
      <h2 className='text-5xl p-10 text-green-700'>Register</h2>
      <form onSubmit={ _register }>
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
        <button className="bg-green-300 rounded-md active:bg-green-600 active:translate-y-1 shadow-md shadow-green-600">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
