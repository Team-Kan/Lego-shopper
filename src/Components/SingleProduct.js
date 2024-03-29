import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddProductToCartForm } from ".";

const SingleProduct = (props) => {
  const { retrieveCartAndProducts, products, cart, setIsLoading } = props;
  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false)
  const [cartProduct, setCartProduct] = useState({})
  const id = useParams().id;
  const getProduct = async () => {
    setIsLoading(true)
    const singleProduct = products.find(product => product.id === +id);
    if (singleProduct) {
      setProduct(singleProduct);
      if(cart.products){
        const productInCart = cart.products.find(product => product.id === singleProduct.id);
        if(productInCart){
          setCartProduct(productInCart)
          setDisabled(true);
        }
      }
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  };
  
  useEffect(() => {
      getProduct();
  }, [id, products, cart]);

  return (
    <div className="flex md:justify-center items-center">
      {product.id ? (
        <div className="flex flex-col md:m-10 md:items-center rounded-md bg-[whitesmoke] border-2 border-slate-500 w-11/12 min-w-[600px]">
          <h1 className="text-2xl p-10 pl-20 text-center">{product.name}</h1>
          <div className="flex w-10/12 xl:w-1/2 self-center ">
            <img
              className="w-fill h-96 m-auto md:min-w-full md:h-auto md:m-0"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="flex m-10 shadow-lg shadow-black rounded-md">
            <div className="pl-2 border-r-2 border-white bg-[#3E363F] text-green-200 rounded-l-md">
              <h5>Description:</h5>
              <h6 className="w-48 h-48 md:w-72 lg:w-96">
                {product.description}
              </h6>
            </div>
            <h4 className="w-1/3 min-w-fit pl-2 pr-2 bg-[#3E363F] border-r-2 border-white text-green-200">
              Total number of <br /> pieces: {product.pieceCount}
              <br />
              <br />
              price: ${product.price}
            </h4>
            <div>
              {product.quantity ? (
                <AddProductToCartForm 
                  product={product} 
                  retrieveCartAndProducts={retrieveCartAndProducts}
                  cartProduct={cartProduct}
                  cart={cart} 
                  disabled={disabled} 
                  setDisabled={setDisabled}
                  setIsLoading={setIsLoading}
                />
              ) : (
                <div 
                  className="w-1/3 min-w-fit h-full pl-2 pr-2 bg-[#3E363F] border-r-2 border-l-white text-green-200"
                >
                  Out of Stock, check in later!
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default SingleProduct;
