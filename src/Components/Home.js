import React from 'react';
import Products from './Products';
import Collections from './Collections';

const Home = (props)=> {
  const {products, collections} = props;
  return (
    <div>
      <div className='container'>
        <div className='banner'>
          <div className='banner-text'>
            <h1>Welcome to reKANstructed!</h1>
          </div>
        </div>
      </div>
      <Collections collections={collections} />
      <Products products={products}/>
    </div>
  );
};

export default Home;
