import React from "react";
import { Images } from "../data/Images";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const LaunchpadFooter = (props) => {
  const currentThemeRedux = useSelector((state) => state.theme.theme);
  return (
    <>
      <div className="container-fluid footer py-3">
        <div className="container container80">
          <div className="row align-items-end">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <img src={Images.logo} className="img-fluid footer__logo mb-4" />
              <p className="footer_hint m-0">@ 2024.HUMB.All Rights Reserved</p>
            </div>

            <div className="col-lg-4 col-sm-6 mb-3 mb-sm-0">
              <div className="footer__links_holder">
                <ul className="d-flex justify-content-start justify-content-lg-center align-items-center gap-2 m-0">
                  <NavLink>
                    <li>Privacy</li>
                  </NavLink>
                  <NavLink>
                    <li>Terms</li>
                  </NavLink>
                  <NavLink>
                    <li>Disclaimer</li>
                  </NavLink>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
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
                <a
                  className="footer_social"
                  href={props?.data?.facebook}
                  target="_blank"
                >
                  <img src={Images.facebook} className="img-fluid" />
                </a>

                <a
                  className="footer_social"
                  href={props?.data?.twitter}
                  target="_blank"
                >
                  <img src={Images.x} className="img-fluid" />
                </a>
                <a
                  className="footer_social"
                  href={props?.data?.youtube}
                  target="_blank"
                >
                  <img src={Images.youtube} className="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchpadFooter;
