import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditOrDeleteCollection,
  EditOrDeleteProduct,
  CreateProductForm,
  CreateCollectionForm,
  ChangeAdminForm,
} from ".";
const { fetchAllUsers, getUser } = require("../api");

const Admin = (props) => {
  const {
    auth,
    collections,
    showAllCollections,
    showAllProducts,
    products,
    setIsLoading,
  } = props;
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  const displayAllUsers = async (token) => {
    const { isAdmin } = await getUser(token);
    if (!isAdmin) {
      return nav("/");
    }
    const users = await fetchAllUsers(token);
    setUsers(users);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return nav("/");
    }
    displayAllUsers(token);
  }, [auth]);

  return (
    <div>
      <h2 className=" bg-[#006600] text-white p-2">Welcome {auth.username}</h2>
      <div className="grid grid-cols-1 grid-rows-1 sm:gap-10 lg:grid-cols-2 justify-items-center">
        <CreateProductForm
          collections={collections}
          setIsLoading={setIsLoading}
          showAllProducts={showAllProducts}
        />
        <ChangeAdminForm
          users={users}
          displayAllUsers={displayAllUsers}
          setIsLoading={setIsLoading}
        />
        <EditOrDeleteProduct
          products={products}
          collections={collections}
          setIsLoading={setIsLoading}
        />
        <div className=" w-full flex flex-col content-center items-center">
          <CreateCollectionForm
            showAllCollections={showAllCollections}
            setIsLoading={setIsLoading}
          />
          <EditOrDeleteCollection 
            collections={collections}
            showAllCollections={showAllCollections}
            setIsLoading={setIsLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
