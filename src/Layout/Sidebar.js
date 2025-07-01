import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Images } from "../data/Images";
import { Link } from "react-scroll";

const Sidebar = (props) => {
  const { navigationLinks } = props;
  const location = useLocation().pathname;


  return (
    <div className="d-flex flex-column sidebar_wrapper">
      {navigationLinks.map((value) => (

        <NavLink

          className={`sidebar_links mb-3 d-flex align-items-center ${value.activeLinks?.includes(location) ? 'active' : ""}`}
          to={value.links}
        >
          {console.log('activelinks', value.activeLinks?.includes(location))}
          <img src={value.img} alt="" className="img-fluid me-3" />
          {value.name}
        </NavLink>
      ))}
      {/* {navigationLinks.map((value) => (
        <Link
          activeClass="active"
          to="asset_content"
          className={`sidebar_links mb-3 d-flex align-items-center `}
        >
          <img src={value.img} alt="" className="img-fluid me-3" />
          {value.name}
        </Link>
      ))} */}
    </div>
  );
};

export default Sidebar;
