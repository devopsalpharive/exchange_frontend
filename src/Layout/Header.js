import React, { useEffect, useState } from "react";
import { Container, Offcanvas } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { BsGlobe } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { RiAccountPinBoxFill, RiLogoutCircleRLine } from "react-icons/ri";
import { RxTriangleDown } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { Images } from "../data/Images";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { MdContactSupport, MdHistory, MdOutlineSettingsSuggest, MdOutlineVerified, MdSecurity, MdSupport } from "react-icons/md";
import { LiaShareAltSolid } from "react-icons/lia";
import { LuLayoutPanelLeft, LuLayoutPanelTop } from "react-icons/lu";
import isEmpty from "is-empty";

/** Action */
import { userLogout, updateUserSettings } from "../actions/userAction";



const Header = ({ props }) => {
  // console.log('prorr',props)
  const token = localStorage.token
  const { theme, setTheme, handleThemeChange, isLogin } = props;
  const [layout, setLayout] = useState('first')
  const currentThemeRedux = useSelector((state) => state.theme.theme);
  const { getUser, userAsset, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  // console.log("Header_getUser", getUser);
  const [canvasShow, setCanvasShow] = useState(false);
  const [floatingHeader, setFloatingHeader] = useState(false);
  const handleCanvaClose = () => setCanvasShow(false);
  const handleCanvaShow = () => setCanvasShow(true);
  const location = window.location

  // console.log('locationnnn', location)


  const userSettings = async (data) => {
    try {
      console.log("update_data", data);
      const update = await updateUserSettings(data, getUser.secretKey);
      console.log("update_data", update);
      // if(update)
    } catch (e) {
      console.log("userSettings_err", e);
    }
  };

  useEffect(() => {
    const handleHeaderChange = () => {
      if (window.scrollY > 100) {
        setFloatingHeader(true);
      } else {
        setFloatingHeader(false);
      }
    };
    window.addEventListener("scroll", handleHeaderChange);
    return () => {
      window.removeEventListener("scroll", handleHeaderChange);
    };
  }, [floatingHeader]);
  const layoutfn = (e) => {
    setLayout(e);
    dispatch({
      type: "SPOT_LAYOUT",
      value: e,
    })

    localStorage.setItem('spotlayout', e)
  }
  return (
    <header className={`header ${floatingHeader ? "active" : ""}`}>
      {/* start of web */}
      <div className="container container100 h-100 px-3">
        <div className="d-flex align-items-center justify-content-between web_header">
          <div className="d-flex align-items-center gap-5">
            <Link className="logo_wrap d-flex align-items-center" to="/">
              <img src={Images.logo} alt="logo" className="img-fluid" />
            </Link>
            <div className="menus d-none d-lg-block">
              <ul className="d-flex align-items-center justify-content-center  mb-0 px-0">
                {/* <NavLink to="/buy" className="text-decoration-none ">
                  Buy
                </NavLink> */}
                {/* <NavLink
                  to="#"
                  className="text-decoration-none my-anchor-element "
                >
                  Trade <RxTriangleDown className="theme_react_icon" />
                </NavLink>
                <Tooltip
                  anchorSelect=".my-anchor-element"
                  place="bottom"
                  clickable
                >
                  <div className="d-flex flex-column tooltip_navlinks">
                    <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                      Spot
                    </NavLink>{" "}
                    <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                      Margin
                    </NavLink>{" "}

                  </div>
                </Tooltip> */}
                <div className="hover_tooltip">
                  <a
                    className={`text-decoration-none
                       ${location.pathname.includes('/spot-trading')
                        || location.pathname.includes('/margin-trading')
                        || location.pathname.includes('/derivative-trading')
                        || location.pathname.includes('/futures-trading') ? "active" : ""}`}
                  >
                    Trade <RxTriangleDown className="theme_react_icon" />
                  </a>
                  <div className="hover_tooltip_content">
                    <ul className="hover_tooltip_ul">
                      <div className="hover_tooltip_pointer">

                      </div>

                      <li>
                        <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                          Spot
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                          Margin
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink to="/derivative-trading/" className="text-decoration-none mb-2">
                          Derivative
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/futures-trading/" className="text-decoration-none mb-2">
                          Futures
                        </NavLink>
                      </li> */}
                    </ul>
                  </div>
                </div>

                {/* <Tooltip
                  anchorSelect=".my-anchor-element"
                  place="bottom"
                  clickable
                >
                  <div className="d-flex flex-column tooltip_navlinks">
                    <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                      Spot
                    </NavLink>{" "}
                    <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                      Margin
                    </NavLink>{" "}

                  </div>
                </Tooltip> */}

                <NavLink to="/launchpad" className="text-decoration-none ">
                  Launchpad
                </NavLink>

                <NavLink to="/staking" className="text-decoration-none">
                  Staking
                </NavLink>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                {/* <NavLink to="/copy-trade" className="text-decoration-none">
                  Copy Trade
                </NavLink> */}

                {/* <NavLink to="/currency-conversion" className="text-decoration-none">
                  Swap
                </NavLink> */}

                {/* <div className="hover_tooltip">
                  <NavLink to="/staking" className="text-decoration-none">
                    Staking
                  </NavLink>
                  <div className="hover_tooltip_content">
                    <ul className="hover_tooltip_ul">
                      <div className="hover_tooltip_pointer">

                      </div>

                      <li>
                        <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                          Spot
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                          Margin
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div> */}
                {/* <NavLink  className="text-decoration-none" onClick={userLogout}>
                  Logout
                </NavLink> */}
              </ul>
            </div>
          </div>

          <button
            className="d-lg-none border-0 bg-transparent outline-0"
            onClick={handleCanvaShow}
          >
            <GiHamburgerMenu fontSize={25} />
          </button>

          <div className="head_rightsec d-none d-lg-flex">
            {(isAuthenticated || !isEmpty(token)) ? (
              <div className="button_wrap d-none d-lg-flex align-items-center justify-content-center gap-3 asdfasdfs">
                {/* <button className="border-0 outline-0 bg-transparent show_search_tooltip">
                <img
                  src={Images.searchicon}
                  alt="search"
                  className="img-fluid"
                  style={{ width: "25px" }}
                />
              </button> */}
                <Tooltip
                  anchorSelect=".show_search_tooltip"
                  place="bottom"
                  clickable
                  className="acc_over_tooltip"
                >
                  <div>
                    <div className="acc_ovrview_wrap mt-2 mb-3 d-flex align-items-start justify-content-between gap-2">
                      <div className="row">
                        <div className="col-10">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="heads_search_input"
                          // onChange={handleHeaderSearch}
                          />
                        </div>
                        <div className="col-2 px-0">
                          <button className="border-0 outline-0 bg-transparent ">
                            <img
                              src={Images.searchicongrad}
                              alt="search"
                              className="img-fluid"
                              style={{ width: "15px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* {matchedKeywords && matchedKeywords.length ? (
                    <div className="searched_values_wrap mt-2 mb-3">
                      <div className="">
                        {matchedKeywords.map((value) => (
                          <p className="mb-1 searched_value">{value}</p>
                        ))}
                      </div>
                    </div>
                  ) : null} */}
                  </div>
                </Tooltip>

                <div className="lang_details optionsec">
                  <BsGlobe fontSize={22} />
                </div>
                <Tooltip
                  anchorSelect=".lang_details"
                  place="bottom"
                  clickable
                  className="profile_tooltip lang_tooltip"
                >
                  <div>
                    <div className="mt-2 mb-3 d-flex align-items-center justify-content-between ">
                      <div className="d-flex align-items-center gap-2">
                        <p className="white_text_xxs">Language</p>
                      </div>
                    </div>
                    {/* <div>
                      <div className="row mb-4">
                        <div className="col-10">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="heads_search_input"
                          />
                        </div>
                        <div className="col-2 px-0">
                          <button className="border-0 outline-0 bg-transparent ">
                            <img
                              src={Images.searchicongrad}
                              alt="search"
                              className="img-fluid"
                              style={{ width: "15px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div> */}
                    <ul className="languagelist">
                      <li className="active">English</li>
                      {/* <li>Hindi</li> */}
                    </ul>

                  </div>
                </Tooltip>
                <div className="login_profile_details optionsec">
                  {/* <img
                  src={getUser?.profileImage == ""
                    ? Images.profileImage
                    : getUser?.profileImage}
                  alt="profile"
                  className="img_fit_container "
                /> */}
                  <CgProfile fontSize={24} fill="#fff" />
                </div>
                <Tooltip
                  anchorSelect=".login_profile_details"
                  place="bottom"
                  clickable
                  className="profile_tooltip"
                >
                  <div>
                    <div className="pf_details">
                      <div className="profile_id_dtls d-flex align-items-center gap-2">
                        <div className="header_profile_wraper login_profile_details">
                          <img
                            src={
                              getUser?.profileImage == ""
                                ? Images.profile
                                : getUser?.profileImage
                            }
                            alt="profile"
                            className="img_fit_container"
                          />
                        </div>
                        <div className="pe-4">
                          <p className="white_text_xxs">
                            {getUser ? getUser?.firstName + " " + getUser?.lastName : ""}
                          </p>
                          <p className="lnd_grad_txt_xxs">
                            UID : {getUser?.userId?.substring(0, 10)}....
                          </p>
                        </div>
                      </div>
                      {/* <div className=" d-flex align-items-center  gap-2 mb-3 mt-2">
                        <p className="verf_lab">{
                          getUser?.kycStatus == "notVerified"
                            ? "NOT VERIFIED"
                            : getUser?.kycStatus?.toUpperCase()}</p>
                        
                           verf -- class : greenlab
                        <p className="vip_lab">Regular User</p>
                      </div> */}

                    </div>
                    {(location.pathname.includes('spot-trading') || location.pathname.includes('margin-trading')) &&
                      <div className="spotlay mb-3">
                        <p className="white_text_xxs orange_color">Spot Layout :</p>
                        <div className="layoutsec">
                          <LuLayoutPanelLeft className={layout == "first" && "active"} onClick={() => layoutfn("first")} />
                          <LuLayoutPanelTop className={layout == "second" && "active"} onClick={() => layoutfn("second")} />
                        </div>
                      </div>
                    }
                    <div className="drop_route">
                      <NavLink to="/dashboard" className="text-decoration-none ">
                        <TbLayoutDashboardFilled fill="#fff" />
                        <p className="white_text_xxs">Dashboard</p>
                      </NavLink>
                      <NavLink to="/wallet" className="text-decoration-none ">
                        <CiWallet fill="#fff" />
                        <p className="white_text_xxs">Wallet</p>
                      </NavLink>
                      <NavLink to="/verification" className="text-decoration-none ">
                        <MdOutlineVerified fill="#fff" />
                        <p className="white_text_xxs">Verification</p>
                      </NavLink>
                      {/* <NavLink to="#" className="text-decoration-none ">
                        <RiAccountPinBoxFill fill="#fff" />
                        <p className="white_text_xxs">Accounts</p>
                      </NavLink> */}
                      <NavLink to="/referral" className="text-decoration-none ">
                        <LiaShareAltSolid fill="#fff" />
                        <p className="white_text_xxs">Referral</p>
                      </NavLink>
                      <NavLink to="/security" className="text-decoration-none ">
                        <MdSecurity fill="#fff" />
                        <p className="white_text_xxs">Security</p>
                      </NavLink>
                      <NavLink to="/history" className="text-decoration-none ">
                        <MdHistory fill="#fff" />
                        <p className="white_text_xxs">History</p>
                      </NavLink>
                      {/* <NavLink to="/support" className="text-decoration-none ">
                        <MdContactSupport fill="#fff" />
                        <p className="white_text_xxs">Support</p>
                      </NavLink> */}
                      <NavLink to="https://humb.support" className="text-decoration-none " target="parent">
                        <MdContactSupport fill="#fff" />
                        <p className="white_text_xxs">Support</p>
                      </NavLink>
                      <NavLink to="/settings" className="text-decoration-none ">
                        <MdOutlineSettingsSuggest fill="#fff" />
                        <p className="white_text_xxs">Settings</p>
                      </NavLink>
                    </div>
                  </div>
                  <button
                    className="pt-0 mb-2 d-flex align-items-center gap-2 bg-transparent border-0 outline-0 logout_btn toottip_logout_btn"
                    onClick={userLogout}
                  >
                    <img
                      src={Images.logouticon}
                      alt="logout"
                      className="img-fluid"
                      style={{ width: "18px" }}
                    />
                    <p className="white_text_xxs">Logout</p>
                  </button>
                </Tooltip>
                <button
                  className="border-0 outline-0 bg-transparent"
                  onClick={() => {
                    userSettings({ type: "theme", value: theme === "dark" ? "light" : "dark" })
                    handleThemeChange(theme === "dark" ? "light" : "dark")
                  }}
                >
                  <img
                    src={
                      theme === "dark" ? Images.sunheads : Images.moonheads
                    }
                    alt="theme"
                    className="img-fluid"
                    style={{ width: "20px" }}
                  />
                </button>
              </div>
            ) : (
              <div className="button_wrap d-none d-lg-flex align-items-center justify-content-center gap-4">
                {/* <div className="custom_toggle">
              <label class="switch">
                <input
                  type="checkbox"
                  onChange={() => handleThemeChange()}
                  checked={theme === "dark"}
                />
                <span class="slider round"></span>
              </label>
            </div> */}

                <NavLink
                  to="/login"
                  className={`header_login_button text-decoration-none ${location.pathname === '/register' ? 'inactive' : ""}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="header_register_button text-decoration-none"
                >
                  Register
                </NavLink>

                <button
                  className="border-0 outline-0 bg-transparent"
                  onClick={() => {
                    userSettings({ type: "theme", value: theme === "dark" ? "light" : "dark" })
                    handleThemeChange()
                  }}
                >
                  <img
                    src={
                      theme === "dark" ? Images.sunheads : Images.moonheads
                    }
                    alt="theme"
                    className="img-fluid"
                    style={{ width: "20px" }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end of web */}

      {/* start of mobile */}
      <Offcanvas show={canvasShow} className="custom_canvas d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center justify-content-between w-100">
            <NavLink to="/" className="logo_wrap d-flex align-items-center">
              <img src={Images.logo} alt="logo" className="img-fluid" />
            </NavLink>
            <button
              className="d-lg-none border-0 bg-transparent outline-0"
              onClick={handleCanvaClose}
            >
              <IoMdClose fontSize={25} />
            </button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <div className="mt-4">

            <div className="menus">
              <ul className="d-flex flex-column align-items-start gap-2  mb-0 px-0">
                {/* <NavLink to="/earn" className="text-decoration-none ">
                  Buy
                </NavLink> */}
                {/* <NavLink
                  to="#"
                  className="text-decoration-none my-anchor-element"
                >
                  Trade <RxTriangleDown />
                </NavLink>
                <Tooltip
                  anchorSelect=".my-anchor-element"
                  place="bottom"
                  clickable
                >
                  <div className="d-flex flex-column tooltip_navlinks">
                    <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                      Spot
                    </NavLink>{" "}
                    <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                      Margin
                    </NavLink>{" "}

                  </div>
                </Tooltip> */}
                <div className="hover_tooltip">
                  <a
                    className={`text-decoration-none
                    ${location.pathname.includes('/spot-trading')
                        || location.pathname.includes('/margin-trading')
                        || location.pathname.includes('/derivative-trading')
                        || location.pathname.includes('/futures-trading') ? "active" : ""}`}
                  >
                    Trade <RxTriangleDown className="theme_react_icon" />
                  </a>
                  <div className="hover_tooltip_content">
                    <ul className="hover_tooltip_ul">
                      <div className="hover_tooltip_pointer">

                      </div>

                      <li>
                        <NavLink to="/spot-trading/" className="text-decoration-none mb-2">
                          Spot
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/margin-trading/" className="text-decoration-none mb-2">
                          Margin
                        </NavLink>
                      </li>

                      {/* <li>
                        <NavLink to="/derivative-trading/" className="text-decoration-none mb-2">
                          Derivative
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/futures-trading/" className="text-decoration-none mb-2">
                          Futures
                        </NavLink>
                      </li> */}
                    </ul>
                  </div>
                </div>
                {/* <NavLink to="/staking" className="text-decoration-none ">
                  Earn
                </NavLink> */}
                <NavLink to="/launchpad" className="text-decoration-none ">
                  Launchpad
                </NavLink>
                <NavLink to="/staking" className="text-decoration-none">
                  Staking
                </NavLink>
                <NavLink to="/copy-trade" className="text-decoration-none">
                  Copy Trade
                </NavLink>

                {/* <NavLink to="/currency-conversion" className="text-decoration-none">
                  Swap
                </NavLink> */}

                {/* <NavLink to="/stake" className="text-decoration-none">
                Stake
              </NavLink> */}
                {/* <NavLink  className="text-decoration-none" onClick={userLogout}>
                  Logout
                </NavLink> */}
              </ul>
              {/* <ul className="d-flex flex-column align-items-start gap-4  mb-0 px-0">
                <NavLink
                  to="/launchpad"
                  className="text-decoration-none"
                  onClick={handleCanvaClose}
                >
                  Earn
                </NavLink>
                <NavLink
                  to="/spot-trading/"
                  className="text-decoration-none my-anchor-element2"
                  onClick={handleCanvaClose}
                >
                  Market
                </NavLink>
                <Tooltip
                  anchorSelect=".my-anchor-element2"
                  place="right"
                  clickable
                >
                  <div className="d-flex flex-column tooltip_navlinks">
                    <NavLink
                      to="/spot-trading/"
                      className="text-decoration-none"
                      onClick={handleCanvaClose}
                    >
                      Spot
                    </NavLink>{" "}
                    <NavLink
                      to="/derivative-trading"
                      className="text-decoration-none mt-1"
                      onClick={handleCanvaClose}
                    >
                      Derivative
                    </NavLink>
                  </div>
                </Tooltip>
                <NavLink
                  to="/launchpad"
                  className="text-decoration-none"
                  onClick={handleCanvaClose}
                >
                  Launchpad
                </NavLink>

                <NavLink
                  to="/stake"
                  className="text-decoration-none"
                  onClick={handleCanvaClose}
                >
                  Stake
                </NavLink>
              </ul> */}
            </div>
            <div className="head_rightsec d-flex d-lg-none px-4 pt-3">
              {getUser && getUser ? (
                <div className="button_wrap d-flex d-lg-none align-items-center justify-content-center gap-3 asdfasdfs">
                  {/* <button className="border-0 outline-0 bg-transparent show_search_tooltip">
                <img
                  src={Images.searchicon}
                  alt="search"
                  className="img-fluid"
                  style={{ width: "25px" }}
                />
              </button> */}
                  <Tooltip
                    anchorSelect=".show_search_tooltip"
                    place="bottom"
                    clickable
                    className="acc_over_tooltip"
                  >
                    <div>
                      <div className="acc_ovrview_wrap mt-2 mb-3 d-flex align-items-start justify-content-between gap-2">
                        <div className="row">
                          <div className="col-10">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="heads_search_input"
                            // onChange={handleHeaderSearch}
                            />
                          </div>
                          <div className="col-2 px-0">
                            <button className="border-0 outline-0 bg-transparent ">
                              <img
                                src={Images.searchicongrad}
                                alt="search"
                                className="img-fluid"
                                style={{ width: "15px" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* {matchedKeywords && matchedKeywords.length ? (
                    <div className="searched_values_wrap mt-2 mb-3">
                      <div className="">
                        {matchedKeywords.map((value) => (
                          <p className="mb-1 searched_value">{value}</p>
                        ))}
                      </div>
                    </div>
                  ) : null} */}
                    </div>
                  </Tooltip>

                  <div className="lang_details optionsec">
                    <BsGlobe fontSize={22} />
                  </div>
                  <Tooltip
                    anchorSelect=".lang_details"
                    place="bottom"
                    clickable
                    className="profile_tooltip  lang_tooltip"
                  >
                    <div>
                      <div className="mt-2 mb-3 d-flex align-items-center justify-content-between ">
                        <div className="d-flex align-items-center gap-2">
                          <p className="white_text_xxs">Language</p>
                        </div>
                      </div>
                      <div>
                        <div className="row mb-4">
                          <div className="col-10">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="heads_search_input"
                            />
                          </div>
                          <div className="col-2 px-0">
                            <button className="border-0 outline-0 bg-transparent ">
                              <img
                                src={Images.searchicongrad}
                                alt="search"
                                className="img-fluid"
                                style={{ width: "15px" }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <ul className="languagelist">
                        <li className="active">English</li>
                        {/* <li>Hindi</li> */}
                      </ul>

                    </div>
                  </Tooltip>
                  <div className="login_profile_details optionsec">
                    {/* <img
                  src={getUser?.profileImage == ""
                    ? Images.profileImage
                    : getUser?.profileImage}
                  alt="profile"
                  className="img_fit_container "
                /> */}
                    <CgProfile fontSize={24} fill="#fff" />
                  </div>
                  <Tooltip
                    anchorSelect=".login_profile_details"
                    place="bottom"
                    clickable
                    className="profile_tooltip"
                  >
                    <div>
                      <div className="pf_details">
                        <div className="profile_id_dtls d-flex align-items-center gap-2">
                          <div className="header_profile_wraper login_profile_details">
                            <img
                              src={
                                getUser?.profileImage == ""
                                  ? Images.profile
                                  : getUser?.profileImage
                              }
                              alt="profile"
                              className="img_fit_container"
                            />
                          </div>
                          <div className="pe-4">
                            <p className="white_text_xxs">
                              {getUser?.firstName + " " + getUser?.lastName}
                            </p>
                            <p className="lnd_grad_txt_xxs">
                              UID : {getUser?.userId?.substring(0, 10)}....
                            </p>
                          </div>
                        </div>
                        <div className=" d-flex align-items-center  gap-2 mb-3 mt-2">
                          <p className="verf_lab">UnVerified</p>
                          {/*
                           verf -- class : greenlab */}
                          <p className="vip_lab">Regular User</p>
                        </div>


                      </div>
                      {location.pathname.includes('spot-trading') &&
                        <div className="spotlay mb-3">
                          <p className="white_text_xxs">Spot Layout :</p>
                          <div className="layoutsec">
                            <LuLayoutPanelLeft className={layout == "first" && "active"} onClick={() => layoutfn("first")} />
                            <LuLayoutPanelTop className={layout == "second" && "active"} onClick={() => layoutfn("second")} />
                          </div>
                        </div>
                      }
                      <div className="drop_route">
                        <NavLink to="/dashboard" className="text-decoration-none " onClick={handleCanvaClose}>
                          <TbLayoutDashboardFilled fill="#fff" />
                          <p className="white_text_xxs">Dashboard</p>
                        </NavLink>
                        <NavLink to="/wallet" className="text-decoration-none " onClick={handleCanvaClose}>
                          <CiWallet fill="#fff" />
                          <p className="white_text_xxs">Wallet</p>
                        </NavLink>
                        <NavLink to="/verification" className="text-decoration-none " onClick={handleCanvaClose}>
                          <MdOutlineVerified fill="#fff" />
                          <p className="white_text_xxs">Verification</p>
                        </NavLink>
                        <NavLink to="#" className="text-decoration-none " onClick={handleCanvaClose}>
                          <RiAccountPinBoxFill fill="#fff" />
                          <p className="white_text_xxs">Accounts</p>
                        </NavLink>
                        <NavLink to="/referral" className="text-decoration-none " onClick={handleCanvaClose}>
                          <LiaShareAltSolid fill="#fff" />
                          <p className="white_text_xxs">Referral</p>
                        </NavLink>
                        <NavLink to="/security" className="text-decoration-none " onClick={handleCanvaClose}>
                          <MdSecurity fill="#fff" />
                          <p className="white_text_xxs">Security</p>
                        </NavLink>
                        <NavLink to="/history" className="text-decoration-none " onClick={handleCanvaClose}>
                          <MdHistory fill="#fff" />
                          <p className="white_text_xxs">History</p>
                        </NavLink>
                        <NavLink to="/support" className="text-decoration-none " onClick={handleCanvaClose}>
                          <MdContactSupport fill="#fff" />
                          <p className="white_text_xxs">Support</p>
                        </NavLink>
                        <NavLink to="/settings" className="text-decoration-none " onClick={handleCanvaClose}>
                          <MdOutlineSettingsSuggest fill="#fff" />
                          <p className="white_text_xxs">Settings</p>
                        </NavLink>
                      </div>
                    </div>
                    <button
                      className="pt-0 mb-2 d-flex align-items-center gap-2 bg-transparent border-0 outline-0 logout_btn toottip_logout_btn"
                      onClick={userLogout}
                    >
                      <img
                        src={Images.logouticon}
                        alt="logout"
                        className="img-fluid"
                        style={{ width: "18px" }}
                      />
                      <p className="white_text_xxs">Logout</p>
                    </button>
                  </Tooltip>

                  <button
                    className="border-0 outline-0 bg-transparent"
                    onClick={() => {
                      userSettings({ type: "theme", value: theme === "dark" ? "light" : "dark" })
                      handleThemeChange()
                    }}
                  >
                    <img
                      src={
                        theme === "dark" ? Images.sunheads : Images.moonheads
                      }
                      alt="theme"
                      className="img-fluid"
                      style={{ width: "20px" }}
                    />
                  </button>
                </div>
              ) : (


                <div className="button_wrap d-flex flex-wrap d-lg-none align-items-center justify-content-start gap-4">


                  <NavLink
                    to="/login"
                    className={`header_login_button text-decoration-none ${location.pathname === '/register' ? 'inactive' : ""}`}
                    onClick={handleCanvaClose}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="header_register_button text-decoration-none"
                    onClick={handleCanvaClose}
                  >
                    Register
                  </NavLink>
                  <button
                    className="border-0 outline-0 bg-transparent"
                    onClick={() => {
                      userSettings({ type: "theme", value: theme === "dark" ? "light" : "dark" })
                      handleThemeChange()
                    }}
                  >
                    <img
                      src={
                        theme === "dark" ? Images.sunheads : Images.moonheads
                      }
                      alt="theme"
                      className="img-fluid"
                      style={{ width: "20px" }}
                    />
                  </button>
                </div>
              )}
            </div>


            {/* {getUser && getUser ? (
              <div className="button_wrap d-flex flex-column align-items-start  gap-4 mt-5 ps-4">
                <button className="border-0 outline-0 bg-transparent show_search_tooltip">
                  <img
                    src={Images.searchicon}
                    alt="search"
                    className="img-fluid"
                    style={{ width: "25px" }}
                  />
                </button>
                <Tooltip
                  anchorSelect=".show_search_tooltip"
                  place="bottom"
                  clickable
                  className="acc_over_tooltip"
                >
                  <div className="acc_ovrview_wrap mt-2 mb-3 d-flex align-items-start justify-content-between gap-2">
                    <div className="row">
                      <div className="col-10">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="heads_search_input"
                        />
                      </div>
                      <div className="col-2 px-0">
                        <button className="border-0 outline-0 bg-transparent ">
                          <img
                            src={Images.searchicongrad}
                            alt="search"
                            className="img-fluid"
                            style={{ width: "15px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Tooltip>
                <button className="border-0 outline-0 bg-transparent account_overview">
                  <img
                    src={Images.walleticon}
                    alt="wallet"
                    className="img-fluid"
                    style={{ width: "25px" }}
                  />
                </button>

                <Tooltip
                  anchorSelect=".account_overview"
                  place="bottom"
                  clickable
                  className="acc_over_tooltip"
                >
                  <div>
                    <div className="acc_ovrview_wrap mt-2 mb-3 d-flex align-items-start justify-content-between gap-2">
                      <div className="">
                        <p className="white_text_xxs">Account Overview</p>
                     
                        {userAsset?.totalBalance?.toFixed(6)}{" "}
                        {userAsset?.convertCurrency}
                      </div>
                      <button className="border-0 outline-0 bg-transparent">
                        <FaRegEye fill="#fff" />
                      </button>
                    </div>

                    <div className="fund_button_wraper d-flex align-items-center justify-con"></div>
                  </div>
                </Tooltip>

                <div className="header_profile_wraper login_profile_details">
                  <img
                    src={
                      getUser?.profileImage == ""
                        ? Images.profileImage
                        : getUser?.profileImage
                    }
                    alt="profile"
                    className="img_fit_container "
                  />
                </div>
                <Tooltip
                  anchorSelect=".login_profile_details"
                  place="bottom"
                  clickable
                  className="profile_tooltip"
                >
                  <div>
                    <div className="mt-2 mb-3 d-flex align-items-center justify-content-between ">
                      <div className="d-flex align-items-center gap-2">
                        <BsGlobe fill="#fff" />
                        <p className="white_text_xxs">English</p>
                      </div>
                      <button
                        className="border-0 outline-0 bg-transparent"
                        onClick={() => handleThemeChange()}
                      >
                        <img
                          src={
                            theme === "dark"
                              ? Images.sunheads
                              : Images.moonheads
                          }
                          alt="theme"
                          className="img-fluid"
                          style={{ width: "16px" }}
                        />
                      </button>
                    </div>
                    <div className="profile_id_dtls d-flex align-items-center gap-2">
                      <div className="header_profile_wraper login_profile_details">
                        <img
                          src={
                            getUser?.profileImage == ""
                              ? Images.profileImage
                              : getUser?.profileImage
                          }
                          alt="profile"
                          className="img_fit_container"
                        />
                      </div>
                      <div className="pe-4">
                        <p className="white_text_xxs">
                          {" "}
                          {getUser?.firstName + " " + getUser?.lastName}
                        </p>
                        <p className="lnd_grad_txt_xxs">
                          UID : {getUser?.userId?.substring(0, 10)}....
                        </p>
                      </div>
                    </div>


                    <button
                      className="mt-4 pt-4 mb-2 d-flex align-items-center gap-2 bg-transparent border-0 outline-0"
                      onClick={userLogout}
                    >
                      <img
                        src={Images.logouticon}
                        alt="logout"
                        className="img-fluid"
                        style={{ width: "18px" }}
                      />
                      <p className="white_text_xxs">Logout</p>
                    </button>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <div className="button_wrap d-flex align-items-center  gap-4 mt-5">
                <NavLink
                  to="/login"
                  className="login_button text-decoration-none"
                  onClick={handleCanvaClose}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="register_button text-decoration-none"
                  onClick={handleCanvaClose}
                >
                  Register
                </NavLink>
              </div>
            )} */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* end of mobile */}
    </header>
  );
};

export default Header;
