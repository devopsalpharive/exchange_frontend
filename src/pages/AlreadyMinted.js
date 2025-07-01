import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import react icons

import { LiaGreaterThanSolid } from "react-icons/lia";

// import local files

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const AlreadyMinted = (props) => {
  const navigate = useNavigate();
  console.log("propss");
  const currentThemeRedux = useSelector((state) => state.theme);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleALreadyMintedNext = () => {
    navigate("/already-minted-next");
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
              <Link to="/asset">Create Launchpad</Link>
            </div>
            <Link to="/request-token-types">Back</Link>
          </div>

          <div className="mt-4">
            <h4 className="lnd_headings">New Tokens but already Minted</h4>
            <h5 className="green_title mt-4">New Tokens to be Minted :</h5>
            <p className="desc sub_desc w-75">
              a) For the New Tokens that have already been minted by the
              Projects Tech Team, we willneed the Technical Details about the
              Token so that we can integrate it within the Launchpad.
            </p>
            <p className="desc sub_desc w-75">
              b) We will also need the Project Team to send the Tokens to their
              HUMB Exchange Wallet, so that the Sale can be conducted.
            </p>
            {/* <p className="desc sub_desc w-75 mt-4">
              Data that needs to be collected through the form:
            </p> */}
            <div>
              <h5 className="green_title mt-4">Project Information :</h5>

              <div className="d-flex flex-column mt-4 ">
                <label>Project Name : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Project Name"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Project Website : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Project Website"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>WhitePaper Link : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="WhitePaper Link"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Brief Description of the Project:</label>
                <textarea
                  className="frm_inpt frm_txtarea mt-3"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title mt-4">Token Details :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Token Name :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Name"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Token Symbol : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Symbol"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>
                  Token Type : (e.g., utility, security, governance){" "}
                </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Type"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Total Token Supply</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Total Token Supply"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Circulating Supply :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Circulating Supply"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Token Contract Address :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Contract Address"
                />
              </div>
            </div>
            <div>
              <h5 className="green_title mt-5">Project Team :</h5>

              <div className="d-flex flex-column mt-4 ">
                <label>Names and Roles of Core Team Members :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Names and Roles of Core Team Members"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>LinkedIn Profiles : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="LinkedIn Profiles"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>
                  Relevant Experience in Blockchain/Cryptocurrency Industry :{" "}
                </label>
                <textarea
                  className="frm_inpt frm_txtarea mt-3"
                  placeholder="Experience"
                />
              </div>
            </div>
            <div>
              <h5 className="green_title mt-5">
                Company / Legal Entity Details :
              </h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Company Common Name / Business Name :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Company Common Name / Business Name"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Company / Legal Entity Name :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Company / Legal Entity Name"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Company / Legal Entity Type :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Company / Legal Entity Type"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Country of Registration : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Country of Registration"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Registered Office Address : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Registered Office Address"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>
                  Communication Office Address (if different than Registered
                  Office) :{" "}
                </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Communication Office Address"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Registered Office Phone Number (if available) : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Registered Office Phone Number"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Official Representative Name : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Official Representative Name"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Official Representative Phone Number : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Official Representative Phone Number"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Official Representative Email :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Official Representative Email"
                />
              </div>
            </div>
            <div className="my-5 d-flex justify-content-center">
              <button className="grn_grd_btn" onClick={handleALreadyMintedNext}>
                {" "}
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AlreadyMinted;
