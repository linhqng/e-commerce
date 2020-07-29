import React from "react";

const Sidebar = (props) => {
  const url = "";
  const clearBtn = document.querySelector(".sidebar__clear");
  const handleClear = (e) => {
    e.preventDefault();
    clearBtn.classList.add("hide");
    [...document.querySelectorAll(".sidebar__link")].map((el) =>
      el.classList.remove("active")
    );
    props.handleClear();
  };
  const handleSidebar = (value) => {
    clearBtn.classList.remove("hide");
    [...document.querySelectorAll(".sidebar__link")].map((el) => {
      el.classList.remove("active");
      return el.querySelector("span").innerText.replace(/&amp;/g, "&") === value
        ? el.classList.add("active")
        : null;
    });
    props.handleSidebar(value);
  };
  return (
    <aside className="sidebar">
      <a
        href={url}
        className="sidebar__clear btn hover hide"
        onClick={handleClear}
      >
        <i className="fa fa-eraser"></i>
        <span>Clear all filters</span>
      </a>
      <p className="sidebar__title">Show results for</p>
      <div className="sidebar__category">
        {props.type.map((el, i) => (
          <SidebarType key={i} type={el} handleSidebar={handleSidebar} />
        ))}
      </div>
    </aside>
  );
};

const SidebarType = (props) => {
  const url = "";
  const handleSidebar = (e) => {
    e.preventDefault();
    props.handleSidebar(props.type);
  };
  return (
    <a href={url} className="sidebar__link hover" onClick={handleSidebar}>
      <i className="fas fa-angle-right"></i>
      <span>{props.type}</span>
    </a>
  );
};

export default Sidebar;
