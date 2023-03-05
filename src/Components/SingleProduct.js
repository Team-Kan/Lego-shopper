import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { fetchProductById } from '../api';
import {AddProductToCartForm} from '.';

const SingleProduct = () => {
  
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const pathName = location.pathname;
  const pathArray = pathName.split("/");
  const id = pathArray[pathArray.length - 1];

  const getProduct = async () => {
    const product = await fetchProductById(id);
    if(product.error){
      setError(product.error)
      return 
    }
    setProduct(product);
  }

  useEffect(() => {
    getProduct()
  }, [id]);

  return ( 
    <>
      {product.id ?
      <div className='flex flex-col m-10'>
        <h1 className='text-2xl p-10 pl-20 text-center'>{product.name}</h1>
        <img className='md:h-[36rem] md:w-[36rem] w-96 h-96 m-6 self-center' src={product.imageUrl} alt={product.name}/>
        <div className='flex'>
          <div>
            <h5>Description:</h5>
            <h6 className='w-48'>{product.description}</h6>
          </div>
          <h4>Total number of pieces: {product.pieceCount}</h4>
          <div>
            {product.quantity?
              <AddProductToCartForm product={product}/>
            : <div>Out of Stock, check in later!</div>}
          </div>
        </div>
      </div>
      :<div className='text-4xl'>{product.error}</div>}
    </>
  )
}

export default SingleProduct;