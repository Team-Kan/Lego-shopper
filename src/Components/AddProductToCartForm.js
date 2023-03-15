import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addProductToCartFetch, fetchCart, updateQuantityFetch } from "../api";

const AddProductToCartForm = (props) => {
  const {
    product,
    retrieveCartAndProducts,
    disabled,
    cartProduct,
    cart,
    setIsLoading,
  } = props;
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { id } = cart;
  const location = useLocation();
  const pathname = location.pathname;


  const localCart = () => {
    let newProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      collectionId: product.collectionId,
      imageUrl: product.imageUrl,
      pieceCount: product.pieceCount,
      price: product.price,
      stock: product.quantity,
      quantity: quantity,
    };
    if (disabled) {
      const newQuantity = +cartProduct.quantity + 1;
      if (newQuantity > product.quantity) {
        setError("cart has hit stock limit.");
      } else {
        const productIndex = cart.products.indexOf(
          cart.products.find(({ id }) => id === product.id)
        );
        cart.products[productIndex].quantity = newQuantity;
        window.localStorage.setItem("cart", JSON.stringify(cart));
        return retrieveCartAndProducts();
      }
    } else {
      cart.products.push(newProduct);
      window.localStorage.setItem("cart", JSON.stringify(cart));
      return retrieveCartAndProducts();
    }
  };
  const onlineCart = async (token) => {
    if (disabled) {
      const newQuantity = +cartProduct.quantity + 1;
      if (newQuantity > product.quantity) {
        return setError("cart has hit stock limit.");
      }
      const update = await updateQuantityFetch(
        token,
        id,
        product.id,
        newQuantity
      );
      cartProduct.quantity = newQuantity;
      return retrieveCartAndProducts();
    }
    const cart = await fetchCart(token);
    const addedProduct = await addProductToCartFetch({
      cartId: cart.id,
      productId: product.id,
      quantity,
      token,
    });
    if (addedProduct) {
      setQuantity(1);
      return retrieveCartAndProducts();
    }
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    const token = window.localStorage.getItem("token");
    if (token) {
      await onlineCart(token);
    } else {
      localCart();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  };

  return (
    <form className={pathname === "/" || pathname.startsWith("/collections/") ? "single_product" : "flex bg-[#3E363F] rounded-r-md h-full text-green-200"}>
      {pathname === "/" ? null : <label className="mt-0">Current Stock: {product.quantity}</label>}
      <div className={pathname === "/" || pathname.startsWith("/collections/")  ? "" : "w-40 flex justify-center"}>
        <button
          className={`pl-3 pr-3 bg-red-400 text-red-200 rounded-md  ${
            !disabled
              ? "active:bg-red-700 active:text-red-400 active:translate-y-1"
              : ""
          }`}
          disabled={disabled}
          onClick={(ev) => {
            ev.preventDefault();
            quantity - 1 > 0 ? setQuantity(quantity - 1) : null;
          }}
        >
          -
        </button>
        <input
          className={"w-10 ml-3 mr-3 border-2 border-green-500 rounded-md text-center"}
          type="number"
          value={quantity}
          disabled={true}
        />
        <button
          className={`pl-3 pr-3 bg-green-700 rounded-md text-green-300 ${
            !disabled
              ? "active:bg-green-300 active:text-green-700 active:translate-y-1"
              : ""
          }`}
          disabled={disabled}
          onClick={(ev) => {
            ev.preventDefault();
            quantity < product.quantity ? setQuantity(quantity + 1) : null;
          }}
        >
          +
        </button>
      </div>
      <div>{error}</div>
      <button
        className={`p-3 border-slate-700 border-2 rounded-lg text-black bg-gradient-to-t from-green-500 to-white active:bg-gradient-to-b active:from-green-700 active:to-white active:translate-y-1`}
        onClick={(ev) => handleSubmit(ev)}
      >
        Add to cart
      </button>
    </form>
  );
};

export default AddProductToCartForm;
