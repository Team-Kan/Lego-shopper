import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Nav = (props) => {
  const location = useLocation();
  const pathName = location.pathname;
  console.log(pathName);
  const {auth, logout} = props;
  return (
    <nav>
        <Link to='/' className={pathName === "/" ? "underline" : ""}>Shop All Products</Link>
        {
          auth.isAdmin ? (<Link to='/admin' className={pathName === "/admin" ? "underline" : " "}>Admin</Link>): null
        }
        {
          auth.id ? (
            <>
              <button onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
              <Link to='/login' className={pathName === "/login" ? "underline" : " "}>Login</Link>
              <Link to='/register' className={pathName === "/register" ? "underline" : " "}>Register</Link>
            </>
          )
        } 
        <Link to='/Cart' className={pathName.startsWith("/Cart") ? " underline" : ""}>Cart</Link>
    </nav>
  )
}

export default Nav;