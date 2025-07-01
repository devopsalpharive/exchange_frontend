import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import react icons

import { LiaGreaterThanSolid } from "react-icons/lia";

// import local files

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const RequestTokenSelect = (props) => {
  const navigate = useNavigate();
  console.log("propss");
  const currentThemeRedux = useSelector((state) => state.theme);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleExistingToken = () => {
    navigate("/launchTokens/existing-token");
  };
  const handleNewToken = () => {
    navigate("/launchTokens/new-token");
  };
  const handleAlreadyMinted = () => {
    navigate("/launchTokens/already-minted");
  };

  return (
    <div>
      <Header props={props} />

      <section className="custom_section">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-2">
              <Link to="/" className="d-flex align-items-center ">
                Home Page
              </Link>
              <LiaGreaterThanSolid />
              <Link to="/launchpad">Launchpad</Link>
              <LiaGreaterThanSolid />
              <Link to="/request-token-types">Request token types</Link>
            </div>
            <Link to="/launchpad">Back</Link>
          </div>

          <div className="mt-4">
            <h4 className="lnd_headings">Request token Launchpad</h4>

            <p className="desc sub_desc">
              {" "}
              Steps involved in the Listing of a Token on HUMB Launchpad:
            </p>

            <div className="mt-4">
              <div className="mindmap_card lp_token_card">
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                  <div className="cont_max_wd">
                    <h5>Existing Tokens</h5>
                    <p className="mt-1 mt-sm-2 mt-lg-3">
                      For the Projects that are listed on other Exchanges we
                      need to collect the Details about where they are listed
                      and what was their Trading Volume for the Last 6 Months /
                      1 Year.
                    </p>
                  </div>
                  <div>
                    <button
                      className="grn_grd_btn"
                      onClick={handleExistingToken}
                    >
                      Existing Tokens
                    </button>
                  </div>
                </div>
              </div>
              <div className="mindmap_card lp_token_card mt-4">
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                  <div className="cont_max_wd">
                    <h5>New Tokens</h5>
                    <p className="mt-1 mt-sm-2 mt-lg-3">
                      For the Projects that are listed on other Exchanges we
                      need to collect the Details about where they are listed
                      and what was their Trading Volume for the Last 6 Months /
                      1 Year.
                    </p>
                  </div>
                  <div>
                    <button className="grn_grd_btn" onClick={handleNewToken}>
                      New Tokens
                    </button>
                  </div>
                </div>
              </div>
              <div className="mindmap_card lp_token_card mt-4">
                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between">
                  <div className="cont_max_wd">
                    <h5>New Tokens but already Minted</h5>
                    <p className="mt-1 mt-sm-2 mt-lg-3">
                      For the Projects that are listed on other Exchanges we
                      need to collect the Details about where they are listed
                      and what was their Trading Volume for the Last 6 Months /
                      1 Year.
                    </p>
                  </div>
                  <div>
                    <button
                      className="grn_grd_btn"
                      onClick={handleAlreadyMinted}
                    >
                      New Tokens but already Minted
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RequestTokenSelect;
