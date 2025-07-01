import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import react icons

import { LiaGreaterThanSolid } from "react-icons/lia";

// import local files

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const NewTokenNext = (props) => {
  const navigate = useNavigate();
  console.log("propss");
  const currentThemeRedux = useSelector((state) => state.theme);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleNewTokenSubmit = () => {
    navigate("/request-token-types");
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
            <h4 className="lnd_headings">New Tokens</h4>
            <h5 className="green_title mt-4">New Tokens to be Minted :</h5>
            <p className="desc sub_desc w-75">
              a) For the New Tokens to be Minted we need the Details about the
              Project.
            </p>{" "}
            <p className="desc sub_desc w-75">
              b) We also need to collect the Details about the Team’s Plan about
              the Token so that wecan use the Details to mint the Token.
            </p>
            {/* <p className="desc sub_desc w-75 mt-4">
              Data that needs to be collected through the form:
            </p> */}
            <div>
              <h5 className="green_title mt-4">Tokenomics :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Initial Token Distribution : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Initial Token Distribution"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Token Distribution Plan :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Distribution Plan"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Token Release Schedule (if applicable) : </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Token Release Schedule (if applicable)"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title">Use Case & Utility :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Target Market/Industry :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Target Market/Industry"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Competitors (if any ) :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Competitors (if any )"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>What sets your project apart from competitors? :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="What sets your project apart from competitors"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title">Regulatory Compliance :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>
                  Have legal opinions been obtained regarding the token's
                  regulatory status? :
                </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Have legal opinions been obtained regarding the token's regulatory status"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Any regulatory compliance measures taken? :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Any regulatory compliance measures taken"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title">Partnerships & Collaborations :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>
                  List any strategic partnerships or collaborations (if
                  applicable) :
                </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="List any strategic partnerships or collaborations (if applicable)"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Any regulatory compliance measures taken? :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Any regulatory compliance measures taken"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title">Roadmap & Milestones :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Current Development Stage :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Current Development Stage"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Roadmap for the next 6-12 months :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Roadmap for the next 6-12 months"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title ">Community Engagement :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Size & Activity of Community :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Size & Activity of Community"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Community Support/Engagement Strategy :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Community Support/Engagement Strategy"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title ">Additional Information :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>
                  Any other relevant information you'd like to share :
                </label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Any other relevant information you'd like to share"
                />
              </div>
            </div>
            <div className="mt-5">
              <h5 className="green_title ">Contact Information :</h5>
              <div className="d-flex flex-column mt-4 ">
                <label>Name of Contact Person :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Name of Contact Person"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Role :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Role :"
                />
              </div>{" "}
              <div className="d-flex flex-column mt-4 ">
                <label>Email :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Email"
                />
              </div>
              <div className="d-flex flex-column mt-4 ">
                <label>Phone Number :</label>
                <input
                  type="text"
                  className="frm_inpt mt-3"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="my-5 d-flex justify-content-center">
              <button className="grn_grd_btn" onClick={handleNewTokenSubmit}>
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewTokenNext;
