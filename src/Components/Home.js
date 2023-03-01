import React from 'react';
import Products from './Products';

const Home = (props)=> {
  const {products} = props;
  return (
    <div>
      <h1>Home</h1>
      <Products products={products}/>
    </div>
  );
};

export default Home;
