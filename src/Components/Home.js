import React from 'react';
import Products from './Products';
import Collections from './Collections';

const Home = (props)=> {
  const {products, collections, cart, retrieveCartAndProducts, setIsLoading} = props;
  return (
    <div>
      <div className='banner_container'>
        <div className='banner'>
          <div className='banner-text'>
            <h1>Welcome to reKANstructed!</h1>
          </div>
        </div>
      </div>
      <Collections collections={collections} />
      <Products 
        products={products} 
        cart={cart} 
        retrieveCartAndProducts={retrieveCartAndProducts}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Home;
