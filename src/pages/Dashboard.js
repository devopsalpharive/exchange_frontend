import React, { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Link, NavLink, json, useLocation } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Images } from "../data/Images";
import Wallet from "./WalletOld";
import Asset from "./AssetOld";
import Verification from "./VerificationOld";
import Refferal from "./RefferalOld";
import Settings from "./Settings";
import Sidebar from "../Layout/SidebarOld";
import MyProfile from "./MyProfile";

const Dashboard = (props) => {
  const navigationLinks = [
    {
      id: 1,
      name: "Wallet",
      links: "/wallet",
      // otherLinks: [
      //   { id: 1, subLink: "/myprofile" },
      //   { id: 2, subLink: "/others" },
      //   { id: 3, subLink: "/others" },
      // ],
      img: Images.dashboard,
      content: <Wallet />,
      // subContent: [
      //   { id: 1, subContentValue: "myprofile" },
      //   { id: 2, subContentValue: "others" },
      // ],
    },
    // {
    //   id: 2,
    //   name: "Asset",
    //   links: "/asset",
    //   otherLinks: [""],
    //   img: Images.asset,
    //   content: <Asset />,
    //   // subContent: ["asset"],
    // },
    {
      id: 3,
      name: "Verification",
      links: "/verification",
      otherLinks: [""],
      img: Images.verification,
      content: <Verification />,
      // subContent: ["verification"],
    },
    {
      id: 4,
      name: "Refferal",
      links: "/refferal",
      otherLinks: [""],
      img: Images.refferal,
      content: <Refferal />,
      // subContent: ["referral"],
    },
    // {
    //   id: 5,
    //   name: "Api Management",
    //   links: "/api-management",
    //   otherLinks: [""],
    //   img: Images.setting,
    //   content: (
    //     <Settings
    //       theme={props?.theme}
    //       setTheme={props?.setTheme}
    //       handleThemeChange={props?.handleThemeChange}
    //     />
    //   ),
    // },
    {
      id: 6,
      name: "Settings",
      links: "/settings",
      otherLinks: [""],
      img: Images.setting,
      content: (
        <Settings
          theme={props?.theme}
          setTheme={props?.setTheme}
          handleThemeChange={props?.handleThemeChange}
        />
      ),
      // subContent: ["setting"],
    },
  ];
  const location = useLocation();
  const [sidebarShow, setSidebarShow] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [subContentLinks, setSubContentLinks] = useState(null);
  const [isSubContent, setIsSubContent] = useState(false);

  const handleSidebarClose = () => {
    setSidebarShow(false);
  };

  const handleSetCurrentLink = (value) => {
    console.log("valuelinks", value.links === location.pathname);
    if (value.links === location.pathname) {
      setCurrentLink(value.id);
    }
  };

  useEffect(() => {
    navigationLinks.map((value) => {
      handleSetCurrentLink(value);
    });
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  console.log("prprprprp", props);
  return (
    <div>
      <Header
        theme={props?.theme}
        setTheme={props?.setTheme}
        handleThemeChange={props?.handleThemeChange}
      />
      <div className="custom_body d-flex position-relative">
        <div className="sidebar d-none d-lg-block">
          <Sidebar
            setCurrentLink={setCurrentLink}
            navigationLinks={navigationLinks}
            setSidebarShow={setSidebarShow}
            setSubContentLinks={setSubContentLinks}
            setIsSubContent={setIsSubContent}
          />
        </div>

        <button className="sidebar_open  d-flex align-items-center justify-content-center d-lg-none  outline-0">
          <FaArrowRight fill="#ff602e" onClick={() => setSidebarShow(true)} />
        </button>
        <div className="mainbar">
          <div className="mainbar_wrapper">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-11 col-xl-10 col-xxl-9 col-xxxl-11">
                  {" "}
                  {navigationLinks[currentLink - 1] &&
                    navigationLinks[currentLink - 1].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* start of mobile */}
      <Offcanvas
        show={sidebarShow}
        className="custom_canvas sidebar_canvas d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center justify-content-between w-100">
            <NavLink to="/" className="logo_wrap d-flex align-items-center">
              <img src={Images.logo} alt="logo" className="img-fluid" />
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
          <Sidebar
            setCurrentLink={setCurrentLink}
            navigationLinks={navigationLinks}
            setSidebarShow={setSidebarShow}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {/* end of mobile */}
    </div>
  );
};

export default Dashboard;
