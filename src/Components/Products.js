import React, { useState, useEffect } from "react";


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
              <div key={product.id} className='single_product'>
                <ul>
                <img src={imageUrl} className='product_image' />
                <li>Name:{name}</li>
                <li>Price: {price}</li>
                <li>Quantity: {quantity}</li>
                </ul>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Products;
