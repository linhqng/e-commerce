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
  const [cartStatus, setCartStatus] = useState(0);
  const [openCartState, setOpenCartState] = useState(false);
  const [storageInfo, setStorageInfo] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [productsCart, setProductsCart] = useState([]);

  // Define category of Sidebar
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        const typeSetObj = new Set();
        data.map((el) => typeSetObj.add(el.type));
        setType([...typeSetObj]);
      });
  }, []);

  // Render products
  useEffect(() => {
    let apiURL = "http://localhost:3000/products";
    typePicked === ""
      ? (apiURL = apiURL + "?highlight=true")
      : (apiURL = apiURL + "?type=" + encodeURIComponent(typePicked));
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [typePicked]);

  // Check status of Cart
  useEffect(() => {
    storageInfo === null ? setCartStatus(0) : setCartStatus(storageInfo.length);
  }, [setCartStatus, storageInfo]);

  // Render items(s) in Cart
  useEffect(() => {
    let cartProductstURL = "http://localhost:3000/products?";
    if (storageInfo === null) return setProductsCart([]);
    else {
      storageInfo.forEach((el) => (cartProductstURL += `id=${el.id}&`));
    }
    fetch(cartProductstURL)
      .then((res) => res.json())
      .then((data) => {
        data.forEach(
          (el) =>
            (el["quantity"] = storageInfo.filter(
              (elem) => elem.id === el.id
            )[0].quantity)
        );
        setProductsCart(data);
      });
  }, [storageInfo]);

  // Choose category from side bar
  const handleSidebar = (value) => {
    setTypePicked(value);
  };
  // Clear filter from side bar
  const handleClear = () => {
    setTypePicked("");
  };
  // Set status of cart => close cart
  const openCart = () => {
    setOpenCartState(true);
  };
  // Set status of cart => close cart
  const closeCart = () => {
    setOpenCartState(false);
  };
  // Set status of cart (has item or not)
  const deleteCartItem = (value) => {
    setCartStatus(cartStatus - 1);
    if (storageInfo.length === 1) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...storageInfo].filter((el) => el.id !== value))
      );
    }
    setStorageInfo(JSON.parse(localStorage.getItem("cart")));
  };
  // Set status of cart (has item or not)
  const checkOut = () => {
    localStorage.removeItem("cart");
    setCartStatus(0);
    setStorageInfo(null);
  };

  // Handle add item to cart
  const addCart = (value) => {
    setCartStatus(cartStatus + 1);
    // Check cart
    // Cart empty => add new
    if (storageInfo === null) {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: value, quantity: 1 }])
      );
    } else {
      // Cart has item(s)
      const cartItems = [...storageInfo];
      const indexItem = cartItems.findIndex((el) => el.id === value); // Check item available or not
      // Can find => increase 1 more
      if (indexItem !== -1) {
        cartItems[indexItem].quantity = cartItems[indexItem].quantity + 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } // Cannot find => add new
      else
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartItems, { id: value, quantity: 1 }])
        );
    }
    setStorageInfo(JSON.parse(localStorage.getItem("cart")));
  };

  return (
    <div className="app">
      <Header cartStatus={cartStatus} openCart={openCart} />
      <Sidebar
        type={type}
        handleSidebar={handleSidebar}
        handleClear={handleClear}
      />
      <Products products={products} type={typePicked} addCart={addCart} />
      <Cart
        products={products}
        openCartState={openCartState}
        closeCart={closeCart}
        cartStatus={cartStatus}
        deleteCartItem={deleteCartItem}
        checkOut={checkOut}
        storageInfo={storageInfo}
        productsCart={productsCart}
      />
    </div>
  );
};

export default App;
