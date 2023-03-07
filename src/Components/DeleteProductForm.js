import React, { useState, useEffect } from "react";

const DeleteProductForm = (props) => {
  const {product, setDeleteProduct} = props; 

  const handleDelete = async (ev) => {
    ev.preventDefault();
    
  }
  return (
    <div className="m-2">
      <form>
        <div>
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
