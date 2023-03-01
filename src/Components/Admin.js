import React, {useState, useEffect} from 'react'
const { fetchAllUsers } = require("../api")

const Admin = (props) => {
const { auth } = props;    
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
      <form>
        
      </form>

    </div>
  )
}

export default Admin
