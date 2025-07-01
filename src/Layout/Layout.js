import React, { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Link, NavLink, json, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaArrowRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

import { Images } from "../data/Images";
import logo from "../asset/images/logo.png";
import logoLight from "../asset/images/logoLight.png";
import Sidebar from "./Sidebar";

const navigationLinks = [
  {
    id: 1,
    name: "Dashboard",
    links: "/dashboard",
    img: Images.dashboard,
    activeLinks: [
      "/dashboard",
      "/myprofile"
    ]
  },
  {
    id: 2,
    name: "Wallet",
    links: "/wallet",
    img: Images.wallet,
    activeLinks: [
      "/deposit",
      "/withdraw"
    ]
  },
  // {
  //   id: 2,
  //   name: "Asset",
  //   links: "/asset",
  //   img: Images.asset,
  // },
  {
    id: 3,
    name: "Verification",
    links: "/verification",
    img: Images.verification,
    activeLinks: []
  },
  {
    id: 4,
    name: "Referral",
    links: "/referral",
    img: Images.refferal,
    activeLinks: []
  },
  {
    id: 5,
    name: "Security",
    links: "/security",
    img: Images.security,
    activeLinks: [
      "/email-management",
      "/number-management",
      "/manageactivity",
    ]
  },
  // {
  //   id: 6,
  //   name: "Api Management",
  //   links: "/api-management",
  //   img: Images.api,
  // },
  {
    id: 7,
    name: "History",
    links: "/history",
    img: Images.trans_history,
    activeLinks: []
  },
  // {
  //   id: 8,
  //   name: "Support",
  //   links: "/support",
  //   img: Images.support,
  // },
  {
    id: 9,
    name: "Settings",
    links: "/settings",
    img: Images.setting,
  },
  // {
  //   id: 7,
  //   name: "Bank Details",
  //   links: "/bankdetails",
  //   img: Images.bankIcon,
  // },
];

const Layout = ({ children, props }) => {
  const { activeSection } = props;
  const [sidebarShow, setSidebarShow] = useState(false);
  const currentThemeRedux = useSelector((state) => state.theme.theme);

  const handleSidebarClose = () => {
    setSidebarShow(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  console.log("pross", activeSection);

  return (
    <div>
      <Header props={props} />
      <div className="custom_body d-flex position-relative">
        <div className="sidebar d-none d-lg-block">
          <Sidebar navigationLinks={navigationLinks} />
        </div>

        <button className="sidebar_open d-flex align-items-center justify-content-center d-lg-none  outline-0">
          <FaArrowRight fill="#ff602e" onClick={() => setSidebarShow(true)} />
        </button>
        <div className="mainbar">
          <div className="mainbar_wrapper">
            <div className="container">
              <div className="row justify-content-center mx-lg-0">
                <div className="col-12 col-lg-12 col-xl-12 col-xxl-12 col-xxxl-11 px-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>


      {/* start of mobile */}
      <Offcanvas
        show={sidebarShow}
        className="custom_canvas sidebar_canvas d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center justify-content-between w-100">
            <NavLink to="/" className="logo_wrap d-flex align-items-center">
              <img src={logo} alt="logo" className="img-fluid" />
            </NavLink>
            <button
              className="d-lg-none border-0 bg-transparent outline-0"
              onClick={handleSidebarClose}
            >
              <IoMdClose fontSize={25} />
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar navigationLinks={navigationLinks} />
        </Offcanvas.Body>
      </Offcanvas>

      {/* end of mobile */}
    </div>
  );
};

export default Layout;
