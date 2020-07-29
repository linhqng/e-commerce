import React from "react";
import { useEffect, useRef, useState } from "react";

const Cart = (props) => {
  const url = "";
  const cartBox = useRef();
  const [total, setTotal] = useState([]);

  // Open cart box
  useEffect(() => {
    return props.openCartState
      ? cartBox.current.classList.remove("close")
      : cartBox.current.classList.add("close");
  }, [props.openCartState]);

  // Handle total price
  useEffect(() => {
    let totalArr = [];
    if (props.productsCart.length === 0) return setTotal("$0");
    else {
      props.productsCart.forEach((el) => {
        totalArr = [...totalArr, Number(el.price.slice(1)) * el.quantity];
      });
    }
    setTotal("$" + totalArr.reduce((a, b) => a + b, 0).toFixed(2));
  }, [total, props.productsCart]);

  // Handle close function
  const closeCart = (e) => {
    e.preventDefault();
    cartBox.current.classList.add("close");
    props.closeCart();
  };

  // Handle check out button
  const checkOut = () => {
    document.body.scrollIntoView({ behavior: "smooth" });
    props.checkOut();
  };

  return (
    <aside className="cart close" ref={cartBox}>
      <div className="cart__inner">
        <div className="cart__top">
          <a href={url} className="cart__close hover" onClick={closeCart}>
            ×
          </a>
          <div className="cart__icon">
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
          </div>
        </div>
        <div className="cart__bot">
          <div className="cart__item">
            <div className="cart__item-header">Item</div>
            <div className="cart__item-header"></div>
            <div className="cart__item-header">Price</div>
            <div className="cart__item-header">Qty</div>
            <div className="cart__item-header">SubTotal</div>
          </div>
          {props.productsCart.length === 0 ? (
            <span> There are no items added to Cart!</span>
          ) : (
            props.productsCart.map((elem) => (
              <CartItem
                key={elem.id}
                item={elem}
                deleteCartItem={props.deleteCartItem}
              />
            ))
          )}
        </div>
        <div className="cart__total">
          TOTAL:
          <span>{total}</span>
        </div>
        <div className="cart__checkout">
          <button className="btn hover" onClick={checkOut}>
            CHECK OUT
          </button>
        </div>
      </div>
    </aside>
  );
};

const CartItem = (props) => {
  const url = "";
  const deleteCartItem = (e) => {
    e.preventDefault();
    props.deleteCartItem(props.item.id);
  };

  return (
    <div className="cart__item">
      <img src={props.item.img} className="cart__item-image" alt="cart item" />
      <div className="cart__item-name">{props.item.name}</div>
      <div className="cart__item-price">{props.item.price}</div>
      <div className="cart__item-quantity">×{props.item.quantity}</div>
      <div className="cart__item-price">
        {"$" +
          (Number(props.item.price.slice(1)) * props.item.quantity).toFixed(2)}
      </div>
      <a href={url} className="cart__item-dlt hover" onClick={deleteCartItem}>
        ×
      </a>
    </div>
  );
};

export const CartBtn = (props) => {
  const cartStatusEle = useRef();
  const url = "";
  const openCart = (e) => {
    e.preventDefault();
    document.body.scrollIntoView({ behavior: "smooth" });
    props.openCart();
  };
  useEffect(() => {
    Boolean(props.cartStatus)
      ? cartStatusEle.current.classList.remove("noItem")
      : cartStatusEle.current.classList.add("noItem");
  }, [props.cartStatus]);
  return (
    <a href={url} onClick={openCart} className="cart__icon">
      <i className="fas fa-shopping-cart hover"></i>
      <span ref={cartStatusEle} className="noItem">
        <i className="fas fa-check-circle"></i>
      </span>
    </a>
  );
};

export default Cart;
