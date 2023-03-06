import React, {useState, useEffect} from 'react'
import ChangeAdminForm from './ChangeAdminForm';
import {
  EditOrDeleteProduct,
  CreateProductForm, 
  CreateCollectionForm,
} from '.';
const { fetchAllUsers } = require("../api")

const Admin = (props) => {
const { auth, collections, showAllCollections } = props;    
const [users, setUsers] = useState([]);

const displayAllUsers = async () => {
    const token = window.localStorage.getItem("token");
    const users = await fetchAllUsers(token);
    console.log(users,"This is all of our users")
    setUsers(users);
}

useEffect(() => {
    displayAllUsers(); 
},[])

  return (
    <div>
      <h2>Welcome Admin {auth.username}</h2>
      <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 justify-items-center'>
        <CreateProductForm collections={collections}/>
        <ChangeAdminForm users={users}/>
        <EditOrDeleteProduct />
        <CreateCollectionForm showAllCollections={showAllCollections}/>
      </div>

    </div>
  )
}

export default Admin
