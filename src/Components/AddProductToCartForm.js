import React, { useState } from "react";
import { fetchCart } from "../api";

const AddProductToCartForm = (props) => {
  const { product, retrieveCartAndProducts } = props;
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const addProductToCartFetch = async ({
    cartId,
    productId,
    quantity,
    token,
  }) => {
    const response = await fetch(`http://localhost:3000/api/cart-products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartId, productId, quantity }),
    });
    const results = await response.json();

    return results;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token) {
      const cart = await fetchCart(token);
      const addedProduct = await addProductToCartFetch({
        cartId: cart.id,
        productId: product.id,
        quantity,
        token,
      });
      if (addedProduct.id) {
        setDisabled(true);
        retrieveCartAndProducts();
      }
    }
  };

  return (
    <form className="flex bg-[#3E363F] rounded-r-md h-full text-green-200">
      <label className="mt-0">Current Stock: {product.quantity}</label>
      <div className="w-40 flex justify-center">
        <button
          className="pl-3 pr-3 bg-red-400 text-red-200 active:bg-red-700 active:text-red-400 rounded-md active:translate-y-1"
          onClick={(ev) => {
            ev.preventDefault();
            quantity - 1 > 0 ? setQuantity(quantity - 1) : null;
          }}
        >
          -
        </button>
        <input
          className="w-10 ml-3 mr-3 border-2 border-green-500 rounded-md text-center"
          type="number"
          value={quantity}
          disabled={true}
        />
        <button
          className="pl-3 pr-3 bg-green-700 rounded-md text-green-300 active:bg-green-300 active:text-green-700 active:translate-y-1"
          onClick={(ev) => {
            ev.preventDefault();
            quantity < product.quantity ? setQuantity(quantity + 1) : null;
          }}
        >
          +
        </button>
      </div>
      <button
        className={`p-3 border-slate-700 border-2 rounded-lg text-black bg-gradient-to-t from-green-500 to-white  ${
          disabled
            ? ""
            : "active:bg-gradient-to-b active:from-green-700 active:to-white active:translate-y-1"
        }`}
        onClick={(ev) => handleSubmit(ev)}
        disabled={disabled}
      >
        {disabled ? "Product in cart" : "Add to cart"}
      </button>
    </form>
  );
};

export default AddProductToCartForm;
