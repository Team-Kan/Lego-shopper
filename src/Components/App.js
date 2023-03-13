import React, { useEffect, useState } from "react";
import {
  Home,
  Login,
  Register,
  Admin,
  Collection,
  Nav,
  Cart,
  CheckoutPage,
  SingleProduct,
  Collections,
  Loading,
} from ".";
import {
  fetchAllProducts,
  fetchAllCollections,
  fetchCart,
  getUser,
} from "../api";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [auth, setAuth] = useState({});
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [cart, setCart] = useState({});
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState("$9.95");
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const attemptLogin = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token).then((user) => setAuth(user));
    }
  };

  const retrieveCartAndProducts = async () => {
    const token = window.localStorage.getItem("token");
    let cart;
    if (token) {
      cart = await fetchCart(token);
    } else {
      cart = await JSON.parse(window.localStorage.getItem("cart"));
      if(!cart){
        const newCart = {
          id: "guest",
          isActive: true,
          products: [],
          userId: "guest",
        }
        window.localStorage.setItem("cart", JSON.stringify(newCart));
        cart = await JSON.parse(window.localStorage.getItem("cart"));
      }

    }
      if (cart.products.length) {
        cart.products.sort((a, b) => a.cartProductId - b.cartProductId);
        const items = cart.products.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );
        setItemCount(items);

        const cost = (
          Math.round(
            100 *
              cart.products.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0
              )
          ) / 100
        ).toFixed(2);
        setTotal(cost);

        const tax = Math.round((100 * (0.06 * cost)) / 100).toFixed(2);
        setTax(tax);

        if (cost > 35) {
          setShipping("Free");
          setFinalTotal(Number(tax) + Number(cost));
        } else if (cost < 35 && cost > 0) {
          setShipping("$9.95");
          setFinalTotal(Number(tax) + Number(cost) + 9.99);
        } else {
          setFinalTotal(Number(tax) + Number(cost));
        }
      } else {
        setItemCount(0);
        setTotal(0);
        setTax(0);
        setShipping("$9.95");
        setFinalTotal(0);
      }
      setCart(cart);
  };

  const showAllProducts = async () => {
    const product = await fetchAllProducts();
    setProducts(product);
  };

  const showAllCollections = async () => {
    const collections = await fetchAllCollections();
    setCollections(collections);
  };

  useEffect(() => {
    attemptLogin();
    showAllProducts();
    showAllCollections();
    // retrieveCartAndProducts();
  }, []);

  useEffect(() => {
   retrieveCartAndProducts();
  }, [auth]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    setCart({});
  };

  return (
    <div>
      {isLoading ? <Loading /> : null}
      <Nav auth={auth} logout={logout} itemCount={itemCount} />
      {pathname.startsWith("/collections/") ||
      pathname.startsWith("/product/") ? (
        <Collections collections={collections} />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={<Home products={products} collections={collections} />}
        />
        <Route path="/login" element={<Login attemptLogin={attemptLogin} />} />
        <Route
          path="/register"
          element={<Register attemptLogin={attemptLogin} />}
        />
        <Route
          path="/admin"
          element={
            <Admin
              auth={auth}
              collections={collections}
              showAllCollections={showAllCollections}
              products={products}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="/collections/:id" element={<Collection />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              itemCount={itemCount}
              total={total}
              retrieveCartAndProducts={retrieveCartAndProducts}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              itemCount={itemCount}
              total={total}
              tax={tax}
              shipping={shipping}
              finalTotal={finalTotal}
              retrieveCartAndProducts={retrieveCartAndProducts}
              showAllProducts={showAllProducts}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <SingleProduct
              retrieveCartAndProducts={retrieveCartAndProducts}
              products={products}
              cart={cart}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
