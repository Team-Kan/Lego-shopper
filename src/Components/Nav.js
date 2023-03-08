import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Nav = (props) => {
  const location = useLocation();
  const pathName = location.pathname;
  //console.log(pathName);
  const {auth, logout, itemCount } = props;
  return (
    <nav className='bg-brick p-2'>
        <Link to='/' className={pathName === "/" ? "underline rounded-md p-2 md:p-4  ml-1 bg-green-300 hover:bg-[#029602] text-black" : " rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white"}>Shop All Products</Link>
        {
          auth.isAdmin ? (<Link to='/admin' className={pathName === "/admin" ? "underline rounded-md p-2 md:p-4  ml-1 bg-green-300 hover:bg-[#029602] text-black" : " rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white"}>Admin</Link>): null
        }
        {
          auth.id ? (
            <>
              <button className=' rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white' onClick={ logout }>Logout { auth.username }</button>
            </>
          ) : (
            <>
              <Link to='/login' className={pathName === "/login" ? "underline rounded-md p-2 md:p-4  ml-1 bg-green-300 hover:bg-[#029602] text-black" : " rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white"}>Login</Link>
              <Link to='/register' className={pathName === "/register" ? "underline rounded-md p-2 md:p-4  ml-1 bg-green-300 hover:bg-[#029602] text-black" : " rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white"}>Register</Link>
            </>
          )
        } 
        <Link to='/Cart' className={pathName.startsWith("/Cart") || pathName.startsWith("/checkout") ? " underline rounded-md p-2 md:p-4  ml-1 bg-green-300 hover:bg-[#029602] text-black" : " rounded-md p-2 md:p-4  ml-1 bg-[#006600] hover:bg-[#029602] text-white"}>Cart ({itemCount})</Link>
    </nav>
  )
}

export default Nav;