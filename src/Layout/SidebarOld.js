import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Images } from "../data/Images";

const SidebarOld = ({
  setCurrentLink,
  navigationLinks,
  setSidebarShow,
  setSubContentLinks,
  setIsSubContent,
}) => {
  const getLocation = useLocation().pathname;

  const handleCurrentId = (getValue, getId) => {
    setCurrentLink(getId);
    console.log("id", getId);
    setSidebarShow(false);
    setSubContentLinks();
    setIsSubContent(true);
  };

  return (
    <div className="d-flex flex-column sidebar_wrapper">
      {navigationLinks.map((value) => (
        <NavLink
          className={`sidebar_links mb-3 d-flex align-items-center `}
          to={value.links}
          onClick={() => handleCurrentId(value, value.id)}
        >
          <img src={value.img} alt="" className="img-fluid me-3" />
          {value.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarOld;
