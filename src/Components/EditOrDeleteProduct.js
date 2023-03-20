import React, { useState } from "react";
import { DeleteProductForm, EditOrDeleteTemp, EditProductForm } from ".";

const EditOrDeleteProduct = (props) => {
  const { products, collections, setIsLoading } = props;
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

  const handleChange = (ev, list) => {
    const addedProduct = list.filter(({ id }) => id === +ev.target.value);
    setProduct(addedProduct[0]);
  };

  return (
    <div className="bg-white mb-6 min-h-[20rem] border-2 flex flex-col justify-center items-center border-green-600 rounded-md w-11/12 shadow-md shadow-green-700">
      <EditOrDeleteTemp
        name={"Product"}
        handleClick={handleClick}
        edit={editProduct}
        del={deleteProduct}
        list={products}
        handleChange={handleChange}
      />

      <div className="w-full">
        {editProduct ? (
          <EditProductForm
            product={product}
            setEditProduct={setEditProduct}
            setIsLoading={setIsLoading}
            collections={collections}
          />
        ) : null}
      </div>
      <div>
        {deleteProduct ? (
          <DeleteProductForm
            product={product}
            setDeleteProduct={setDeleteProduct}
            setIsLoading={setIsLoading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EditOrDeleteProduct;
