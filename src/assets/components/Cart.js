import React from "react";
import { useEffect, useRef, useState } from "react";

const Cart = (props) => {
  const url = "";
  const cartBox = useRef();

  useEffect(() => {
    return props.openCartState
      ? cartBox.current.classList.remove("close")
      : cartBox.current.classList.add("close");
  }, [props.openCartState]);

  const closeCart = (e) => {
    e.preventDefault();
    cartBox.current.classList.add("close");
    props.closeCart(false);
  };

  const [products, setProducts] = useState(props.products);
  const [storage, setStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  const [total, setTotal] = useState([]);
  useEffect(() => {
    let totalArr = [];
    if (storage === null) setTotal("$0");
    else {
      storage.forEach((el) => {
        const id = Number(Object.keys(el)[0].slice(2));
        products.forEach((elem) => {
          if (elem.id === id)
            totalArr = [
              ...totalArr,
              Number(elem.price.slice(1)) * el["id" + id],
            ];
        });
      });
    }
    setTotal("$" + totalArr.reduce((a, b) => a + b, 0).toFixed(2));
  }, [total, products, storage]);

  const deleteCartItem = (value) => {
    setStorage(
      storage.length === 1
        ? null
        : [...storage].filter((el) => Object.keys(el)[0] !== "id" + value)
    );
    props.handleCartStatus(localStorage.length);
  };
  const clearStorage = () => {
    localStorage.clear();
    setStorage(null);
    props.handleCartStatus(false);
  };
  useEffect(() => {
    return props.openCartState
      ? setStorage(JSON.parse(localStorage.getItem("cart")))
      : undefined;
  }, [props.openCartState]);

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
          {storage !== null ? (
            storage.map((el) => {
              const id = Number(Object.keys(el)[0].slice(2));
              return products.map((elem) =>
                elem.id === id ? (
                  <CartItem
                    key={id}
                    item={elem}
                    quantity={el["id" + id]}
                    deleteCartItem={deleteCartItem}
                  />
                ) : null
              );
            })
          ) : (
            <span> There are no items added to Cart!</span>
          )}
        </div>
        <div className="cart__total">
          TOTAL:
          <span>{total}</span>
        </div>
        <div className="cart__checkout">
          <button className="btn hover" onClick={clearStorage}>
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
      <div className="cart__item-quantity">×{props.quantity}</div>
      <div className="cart__item-price">
        {"$" + (Number(props.item.price.slice(1)) * props.quantity).toFixed(2)}
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
    props.openCart(true);
  };
  useEffect(() => {
    props.cartStatus
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
