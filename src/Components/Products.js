import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddProductToCartForm from "./AddProductToCartForm";


const Products = (props) => {
  const{products, cart, retrieveCartAndProducts, setIsLoading} = props;

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
            let cartProduct;
            if(cart.products && cart.products.length > 0){
              cartProduct = cart.products.filter(({id}) => id === product.id)
              if(!cartProduct.length){
                cartProduct = null
              } 
            }            
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div  className='single_product'>
                <ul>
                <img src={imageUrl} className='product_image' />
                <li>Name:{name}</li>
                <li>Price: {price}</li>
                <li>Currently: {quantity ? `${quantity} In Stock`: "Out of Stock"}</li>
                <AddProductToCartForm  
                  product={product} 
                  retrieveCartAndProducts={retrieveCartAndProducts}
                  disabled={cartProduct}
                  cartProduct={cartProduct ? cartProduct[0] : null}
                  cart={cart}
                  setIsLoading={setIsLoading}
                />
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
