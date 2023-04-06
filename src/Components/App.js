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
  OrderHistory,
} from ".";
import {
  fetchAllProducts,
  fetchAllCollections,
  fetchCart,
  getUser,
  addProductToCartFetch,
  getOrderHistory,
  getTotalForCart,
} from "../api";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
  const [orderHistory, setOrderHistory] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const attemptLogin = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token).then((user) => setAuth(user));
    }
  };

  const recieveOrderHistory = async () => {
    const token = window.localStorage.getItem("token");
    const history = await getOrderHistory(token);
    console.log("hist",history)
    setOrderHistory(history)
  }

  const retrieveCartAndProducts = async () => {
    const token = window.localStorage.getItem("token");
    let cart;
    if (token) {
      recieveOrderHistory()
      const onlineCart = await fetchCart(token);
      const localCart = await JSON.parse(window.localStorage.getItem("cart"))
      if(localCart){
        if(localCart.products.length){
          const onlineCartProductIds = onlineCart.products.length ? onlineCart.products.map(product => product.id) : [];
          const newProducts = localCart.products.filter(({id}) => onlineCartProductIds.indexOf(id) === -1);
          if(newProducts.length){
            await Promise.all(newProducts.map(async (product) => {
              addProductToCartFetch({
                cartId: onlineCart.id,
                productId: product.id,
                quantity: product.quantity,
                token: token,
              })
             
            }))
          }
        }
        window.localStorage.removeItem("cart")
      }
      cart = await fetchCart(token)
      
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
     setCart(cart);
     const {
      itemCount,
      cost, 
      tax, 
      shipping, 
      finalTotal
     } = await getTotalForCart(cart)
      setItemCount(itemCount);
      setTotal(cost);
      setTax(tax);
      setShipping(shipping);
      setFinalTotal(finalTotal);
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
  }, []);

  useEffect(() => {
   retrieveCartAndProducts();
  }, [auth]);

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
    setCart({});
    navigate('/');
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
          element={
            <Home 
              retrieveCartAndProducts={retrieveCartAndProducts} 
              cart={cart} 
              products={products} 
              collections={collections} 
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="/login" element={<Login attemptLogin={attemptLogin} setIsLoading={setIsLoading}/>} />
        <Route
          path="/register"
          element={<Register attemptLogin={attemptLogin} setIsLoading={setIsLoading}/>}
        />
        <Route
          path="/admin"
          element={
            <Admin
              auth={auth}
              collections={collections}
              showAllCollections={showAllCollections}
              showAllProducts={showAllProducts}
              products={products}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route 
          path="/collections/:id" 
          element={
            <Collection 
              cart={cart}
              retrieveCartAndProducts={retrieveCartAndProducts}
              setIsLoading={setIsLoading}
              />
            } 
          />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              itemCount={itemCount}
              total={total}
              retrieveCartAndProducts={retrieveCartAndProducts}
              setIsLoading={setIsLoading}
              products={products}
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
        <Route 
          path="/order-history"
          element={<OrderHistory orderHistory={orderHistory}/>}
        />
      </Routes>
    </div>
  );
};

export default App;
