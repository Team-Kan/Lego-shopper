import React, { useState, useEffect } from "react";
import { deleteProductFetch } from "../api";

const DeleteProductForm = (props) => {
  const {product, setDeleteProduct} = props; 
  const [error, setError] = useState("")

  const handleDelete = async (ev) => {
    ev.preventDefault();
    if(!product.id){
      return setError("Please select a product")
    }
    const token = window.localStorage.getItem("token")
    const deleted = await deleteProductFetch(product.id, token);
   
    if(deleted.error){
      return setError(deleted.error);
    }
    console.log(deleted)
    setDeleteProduct(false)
    return deleted
  }
  return (
    <div className="m-2">
      <form>
        <div>
          <div className="m-2">{error}</div>
          <button 
            onClick={ev => handleDelete(ev)}
            className="m-1 pl-4 pr-4 bg-red-600 rounded-lg shadow-md shadow-red-700 hover:animate-pulse active:bg-red-800 active:animate-none active:translate-y-1"
          >
            delete
          </button>
          <button
          className="m-1 pl-4 pr-4 bg-green-600 rounded-lg shadow-md shadow-green-700 hover:animate-pulse active:bg-green-800 active:animate-none active:translate-y-1"
          onClick={ev => {
            ev.preventDefault();
            setDeleteProduct(false);
          }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteProductForm;
