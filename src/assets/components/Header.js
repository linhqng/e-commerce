import React from "react";
import { CartBtn } from "./Cart";

const Header = (props) => {
  const url = "";
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <a href="index.html" className="header__logo">
            <img src="assets/images/logo.png" alt="logo" />
            <span>amazing</span>
          </a>
          <div className="header__search">
            <input
              type="text"
              name=""
              value={props.searchInput}
              placeholder="Search a product"
              onChange={props.handleSearchInput}
            />
            <a className="btn hover" href={url} onClick={props.handleSearchBtn}>
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <div className="header__right">
          <CartBtn cartStatus={props.cartStatus} openCart={props.openCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
