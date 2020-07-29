import React from "react";
import { useState, useEffect } from "react";

const Products = (props) => {
  const [products, setProducts] = useState(props.products);
  const [select, setSelect] = useState("fea");
  const type = props.type;
  useEffect(() => {
    if (select === "asc") {
      setProducts(() =>
        [...props.products].sort(
          (a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1))
        )
      );
    }
    if (select === "desc") {
      setProducts(() =>
        [...props.products].sort(
          (a, b) => Number(b.price.slice(1)) - Number(a.price.slice(1))
        )
      );
    }
    if (select === "fea") {
      setProducts(props.products);
    }
  }, [select, props.products]);
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  const addCart = (value) => {
    props.handleCartStatus(true);
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems === null)
      return localStorage.setItem(
        "cart",
        JSON.stringify([{ ["id" + value]: 1 }])
      );
    const indexItem = cartItems.findIndex(
      (el) => Object.keys(el)[0] === "id" + value
    );
    if (indexItem !== -1) {
      const valueItem = Object.values(cartItems[indexItem])[0];
      cartItems[indexItem] = { ["id" + value]: valueItem + 1 };
      return localStorage.setItem("cart", JSON.stringify(cartItems));
    } else
      return localStorage.setItem(
        "cart",
        JSON.stringify([...cartItems, { ["id" + value]: 1 }])
      );
  };

  return (
    <main className="products">
      <div className="products__sort">
        <span>Sort by</span>
        <select name="products-sort" value={select} onChange={handleSelect}>
          <option value="fea">Featured</option>
          <option value="asc">Price asc.</option>
          <option value="desc">Price desc.</option>
        </select>
      </div>
      <div className="products__wrapper">
        {type === ""
          ? products.map((el) =>
              el.highlight === true ? (
                <Product key={el.id} item={el} addCart={addCart} />
              ) : null
            )
          : products.map((el) =>
              el.type === type ? (
                <Product key={el.id} item={el} addCart={addCart} />
              ) : null
            )}
      </div>
    </main>
  );
};

const Product = (props) => {
  const url = "";
  const handleProduct = (e) => {
    e.preventDefault();
    props.addCart(props.item.id);
  };
  return (
    <aside className="products__item">
      <div className="products__item-picture">
        <img src={props.item.img} alt="product" />
      </div>
      <div className="products__item-desc">
        <div className="products__item-name">{props.item.name}</div>
        <div className="products__item-price">{props.item.price}</div>
        <div className="products__item-btn">
          <a href={url} className="btn hover" onClick={handleProduct}>
            ADD TO CART
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Products;
