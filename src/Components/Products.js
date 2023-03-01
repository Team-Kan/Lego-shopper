import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const showAllProducts = async () => {
    const product = await fetchAllProducts();
    setProducts(product);
  };

  useEffect(() => {
    showAllProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      {products.length
        ? products.map((product) => {
            const {
              name,
              description,
              collectionName,
              price,
              imageUrl,
              pieceCount,
              quantity,
            } = product;
            return (
              <div key={product.id}>
                <ul>
                <li>Name:{name}</li>
                <li>Description: {description}</li>
                <li>Collection Name: {collectionName}</li>
                <li>Price: {price}</li>
                <li>Piece Count: {pieceCount}</li>
                <li>Quantity: {quantity}</li>
                <img src={imageUrl} />
                </ul>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Products;
