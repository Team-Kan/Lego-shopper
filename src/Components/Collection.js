import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCollectionProducts } from "../api";
import AddProductToCartForm from "./AddProductToCartForm";

const Collection = (props) => {
  const {cart, retrieveCartAndProducts, setIsLoading} = props;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const id = Number(useParams().id);

  const showCollectionProducts = async (id) => {
    const products = await fetchCollectionProducts(id);
    if (!products.error) {
      setError("");
      setProducts(products);
    } else {
      setError(products.error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (id) {
      showCollectionProducts(id);
    }
  }, [id]);

  return (
    <div className="product_container">
      {error}
      {products.length
        ? products.map((product) => {
          const {
            name,
            price,
            imageUrl,
            quantity,
          } = product;
          let cartProduct;
          if (cart.products && cart.products.length > 0) {
            cartProduct = cart.products.filter(({ id }) => id === product.id)
            if (!cartProduct.length) {
              cartProduct = null
            }
          }
          return (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className='single_product'>
                <ul>
                  <img src={imageUrl} className='product_image' />
                  <li>{name}</li>
                  <li>Price: ${price}</li>
                  <li>Currently: {quantity ? `${quantity} In Stock` : "Out of Stock"}</li>
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

export default Collection;
