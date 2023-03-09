import React, { useState } from "react";
import { DeleteProductForm, EditProductForm } from ".";

const EditOrDeleteProduct = (props) => {
  const { products, collections } = props;
  // const products =[]
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [product, setProduct] = useState({});

  const handleClick = (value) => {
    switch (value) {
      case "edit":
        setEditProduct(true);
        setDeleteProduct(false);
        break;
      case "delete":
        setDeleteProduct(true);
        setEditProduct(false);
        break;
    }
  };

  return (
    <div className="bg-white mb-6 min-h-[20rem] border-2 flex flex-col justify-center items-center border-green-600 rounded-md w-11/12 shadow-md shadow-green-700">
      <h1>Edit or Remove Product</h1>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={(ev) => handleClick(ev.target.value)}
          value={"edit"}
          disabled={editProduct}
          className={`m-1 pl-2 pr-2 bg-green-600 w-1/4 rounded-lg shadow-md shadow-green-700 hover:animate-pulse ${
            !editProduct
              ? "active:translate-y-1 active:bg-green-800 active:animate-none"
              : ""
          }`}
        >
          Edit
        </button>
        <button
          onClick={(ev) => handleClick(ev.target.value)}
          value={"delete"}
          disabled={deleteProduct}
          className={`m-1 pl-2 pr-2 bg-green-600 w-1/4 rounded-lg shadow-md shadow-green-700 hover:animate-pulse ${
            !deleteProduct
              ? "active:translate-y-1 active:bg-green-800 active:animate-none"
              : ""
          }`}
        >
          Delete
        </button>
      </div>
      <select
        onChange={(ev) => {
          const addedProduct = products.filter(
            ({ id }) => id === +ev.target.value
          );
          setProduct(addedProduct[0]);
        }}
        className="m-4 border-2 border-green-700 rounded-md w-8/12 p-2"
      >
        <option value={{}}>Select a product...</option>
        {products.length ? (
          products.map((product) => {
            return (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            );
          })
        ) : (
          <option value={{}}>There are no products.</option>
        )}
      </select>
      <div className="w-full">
        {editProduct ? (
          <EditProductForm
            product={product}
            setEditProduct={setEditProduct}
            collections={collections}
          />
        ) : null}
      </div>
      <div>
        {deleteProduct ? (
          <DeleteProductForm
            product={product}
            setDeleteProduct={setDeleteProduct}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditOrDeleteProduct;
