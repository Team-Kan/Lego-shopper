import React from 'react';
import Products from './Products';
import Collections from './Collections';

const Home = (props)=> {
  const {products, collections} = props;
  return (
    <div>
      <Collections collections={collections} />
      <Products products={products}/>
    </div>
  );
};

export default Home;
