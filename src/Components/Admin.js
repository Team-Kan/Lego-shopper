import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EditOrDeleteProduct,
  CreateProductForm, 
  CreateCollectionForm,
  ChangeAdminForm
} from '.';
const { fetchAllUsers, getUser } = require("../api");

const Admin = (props) => {
const { auth, collections, showAllCollections, products } = props;    
const [users, setUsers] = useState([]);
const nav = useNavigate();

const displayAllUsers = async (token) => {
    const {isAdmin} = await getUser(token)
    if(!isAdmin){
      return nav("/")
    }
    const users = await fetchAllUsers(token);
    console.log(users,"This is all of our users")
    setUsers(users);
}

useEffect(() => {
  const token = window.localStorage.getItem("token")
  if(!token){
    return nav("/");
  }
    displayAllUsers(token);
}, [auth])

  return (
    <div>
      <h2>Welcome Admin {auth.username}</h2>
      <div className='grid grid-cols-1 grid-rows-1 sm:gap-10 lg:grid-cols-2 justify-items-center'>
        <CreateProductForm collections={collections}/>
        <ChangeAdminForm users={users}/>
        <EditOrDeleteProduct products={products} collections={collections}/>
        <CreateCollectionForm showAllCollections={showAllCollections}/>
      </div>

    </div>
  )
}

export default Admin
