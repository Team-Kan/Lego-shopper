import React from 'react'
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const {auth, logout} = props
  return (
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
        {
          auth.isAdmin ? (<Link to='/admin'>Admin</Link>): null
        }
    </nav>
  )
}

export default Nav;