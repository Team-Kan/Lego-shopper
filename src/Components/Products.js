import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Products = (props) => {
  const{products} = props;

  return (
    <div className="product_container">
      {products.length
        ? products.map((product) => {
            const {
              name,
              price,
              imageUrl,
              quantity,
            } = product;
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div  className='single_product'>
                <ul>
                <img src={imageUrl} className='product_image' />
                <li>Name:{name}</li>
                <li>Price: {price}</li>
                <li>Quantity: {quantity}</li>
                </ul>
              </div>
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default Products;
