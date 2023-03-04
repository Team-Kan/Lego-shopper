import React from 'react';
import Products from './Products';
import Collections from './Collections';

const Home = (props)=> {
  const {products, collections} = props;
  return (
    <div>
      <Collections collections={collections} />
      <img className='welcome_image' src='https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'/>
      <Products products={products}/>
    </div>
  );
};

export default Home;
