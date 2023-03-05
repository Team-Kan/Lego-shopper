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
    <div className='flex md:justify-center items-center'>
      {product.id ?
      <div className='flex flex-col m-10 md:items-center rounded-lg bg bg-gradient-to-t from-yellow-500 via-yellow-300 to-yellow-100 min-w-[40rem]'>
        <h1 className='text-2xl p-10 pl-20 text-center'>{product.name}</h1>
        <img className='w-fill h-96 self-start m-6 md:h-[36rem] md:w-[36rem] md:self-center' src={product.imageUrl} alt={product.name}/>
        <div className='flex'>
          <div className='ml-2 mb-4 pl-2 border-r-2 border-white bg-slate-700 text-yellow-400 rounded-l-md'>
            <h5>Description:</h5>
            <h6 className='w-48 h-48 overflow-y-scroll'>{product.description}</h6>
          </div>
          <h4 className='min-w-fit h-56 mb-4 pl-2 pr-2 bg-slate-700 border-r-2 border-white text-yellow-400'>Total number of <br /> pieces: {product.pieceCount}</h4>
          <div>
            {product.quantity?
              <AddProductToCartForm product={product}/>
            : <div>Out of Stock, check in later!</div>}
          </div>
        </div>
      </div>
      :<div className='text-4xl'>{product.error}</div>}
    </div>
  )
}

export default SingleProduct;