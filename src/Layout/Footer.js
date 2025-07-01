import React, { useState, useEffect } from "react";
import { Images } from "../data/Images";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getsiteSettings } from "../actions/userAction";

const Footer = (props) => {
  const currentThemeRedux = useSelector((state) => state.theme.theme);
  const [settings, setSettings] = useState({});


  const getSettings = async () => {
    try {
      const getData = await getsiteSettings();
      setSettings(getData.data)
    } catch (e) {
      console.log("getSettings_err", e);
    }
  }

  useEffect(() => {
    getSettings()
  }, [])
  // console.log("settingssettingssettingssettings", settings);
  return (
    <>
      <div className="container-fluid footer py-3">
        <div className="container container100 px-3">
          <div className="row align-items-end">
            <div className="col-xl-3 col-lg-4 mb-3 mb-lg-0">
              <img src={Images.logo} className="img-fluid footer__logo mb-2" />
              <p className="footer_hint m-0">@ 2024.HUMB.All Rights Reserved</p>
              <p className="footer_hint mt-1 powerby_link">
                Charts Powered by{" "}
                <a
                  href="https://www.tradingview.com/"
                  className=" text-decoration-none"
                >
                  Tradingview
                </a>
              </p>
            </div>

            <div className="col-xl-6 col-lg-4 col-sm-6 mb-3 mb-sm-0">
              <div className="footer__links_holder">
                <ul className="d-flex flex-wrap justify-content-start justify-content-lg-center align-items-center gap-2 m-0">
                  <li>
                    <Link to="/privacy-policy">Privacy</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service">Terms</Link>
                  </li>
                  {/* <button className="border_less_button">
                  Support
                </button> */}
                  <li>
                    <Link to="https://humb.support" target="parent">Support</Link>
                    {/* <Link to="/support">Support</Link> */}
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/disclaimer">Disclaimer</Link>
                  </li>
                  <li >
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                  <li >
                    <Link to="/">About Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6 ">

              {/* <div className="footer__socialLinksHolder d-flex justify-content-start justify-content-sm-end align-items-center gap-3">
                <NavLink className="footer_social">
                  <img src={Images.facebook} className="img-fluid" />
                </NavLink>
                <NavLink className="footer_social">
                  <img src={Images.linkedin} className="img-fluid" />
                </NavLink>
                <NavLink className="footer_social">
                  <img src={Images.x} className="img-fluid" />
                </NavLink>
              </div> */}
              <div className="footer__socialLinksHolder d-flex justify-content-start justify-content-sm-end align-items-center gap-3">
                {/* <a
                  className="footer_social"
                  href={props?.data?.facebook}
                  target="_blank"
                > */}
                <a
                  className="footer_social"
                  href={settings?.facebook}
                  target="_blank"
                >
                  <img src={Images.facebook} className="img-fluid" />
                </a>

                {/* <a
                  className="footer_social"
                  href={props?.data?.twitter}
                  target="_blank"
                > */}
                <a
                  className="footer_social"
                  href={settings?.twitter}
                  target="_blank"
                >
                  <img src={Images.x} className="img-fluid" />
                </a>
                {/* <a
                  className="footer_social"
                  href={props?.data?.youtube}
                  target="_blank"
                > */}
                <a
                  className="footer_social"
                  href={settings?.linkedIn}
                  target="_blank"
                >
                  <img src={Images.insta} className="img-fluid" />
                </a>
                <a
                  className="footer_social"
                  href={settings?.linkedIn}
                  target="_blank"
                >
                  <img src={Images.linkedin} className="img-fluid" />
                </a>
                <a
                  className="footer_social"
                  href={settings?.linkedIn}
                  target="_blank"
                >
                  <img src={Images.telegram} className="img-fluid" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
