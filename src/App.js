import React from "react";
import { useState, useEffect } from "react";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import Header from "./assets/components/Header";
import Sidebar from "./assets/components/Sidebar";
import Products from "./assets/components/Products";
import Cart from "./assets/components/Cart.js";

const App = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState([]);
  const [typePicked, setTypePicked] = useState("");
  const [cartStatus, setCartStatus] = useState(localStorage.length);
  const [openCartState, setOpenCartState] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const typeSetObj = new Set();
        data.map((el) => typeSetObj.add(el.type));
        setType([...typeSetObj]);
      });
  }, []);

  useEffect(() => {
    if (localStorage.length !== 0) return setCartStatus(true);
  }, [setCartStatus]);
  const handleSidebar = (value) => {
    setTypePicked(value);
  };
  const handleClear = () => {
    setTypePicked("");
  };
  const handleCartStatus = (value) => {
    setCartStatus(value);
  };
  const openCart = (value) => {
    setOpenCartState(value);
  };
  const closeCart = (value) => {
    setOpenCartState(value);
  };

  return (
    <div className="app">
      <Header cartStatus={cartStatus} openCart={openCart} />
      <Sidebar
        type={type}
        handleSidebar={handleSidebar}
        handleClear={handleClear}
      />
      <Products
        products={products}
        type={typePicked}
        handleCartStatus={handleCartStatus}
      />
      <Cart
        products={products}
        openCartState={openCartState}
        closeCart={closeCart}
        cartStatus={cartStatus}
        handleCartStatus={handleCartStatus}
      />
    </div>
  );
};

export default App;
