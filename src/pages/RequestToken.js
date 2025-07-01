import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import react icons

import { LiaGreaterThanSolid } from "react-icons/lia";

// import local files

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const RequestToken = (props) => {
  const navigate = useNavigate();
  console.log("propss");
  const currentThemeRedux = useSelector((state) => state.theme);

  const [check, setCheck] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleLaunchpadToken = () => {
    if (check) {
      navigate("/request-token-types");
    } else {
      seterror("please accept the trems and condition");
    }
  };
  return (
    <div>
      <Header props={props} />

      <section className="custom_section">
        <div className="container container80 py-5">
          <div className="bread_crumbs d-flex align-items-center gap-2">
            <Link to="/" className="d-flex align-items-center ">
              Home Page
            </Link>
            <LiaGreaterThanSolid />
            <Link to="/launchpad">Launchpad</Link>
            <LiaGreaterThanSolid />
            <Link to="/request-token">Request token Launchpad</Link>
          </div>

          <div className="mt-4">
            <h4 className="lnd_headings">Humb Request token Launchpad</h4>
            <div>
              <p className="desc sub_desc">
                {" "}
                Steps involved in the Listing of a Token on HUMB Launchpad:
              </p>
              <h5 className="green_title mt-4">1) Application Submission :</h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) We need to create a dedicated page or section on HUMB
                Exchange's Website for Healthcare Token Projects to apply for
                Listing on HUMB Launchpad for conducting their Presale and/or
                IEO. (Initial Exchange Offering)
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Provide a Submission Form where Projects can enter their
                Project Details, Company Details, Team, Tokenomics, Roadmap &
                other relevant information.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">2) Initial Screening :</h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) Review the Submitted Applications to assess the Eligibility &
                Suitability of Projects for Presale & IEO.
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Evaluate factors such as the Project's Viability, Team
                Credibility, Market Demand & Compliance with HUMB Exchange
                Policies.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                3) Due Diligence & Legal Compliance :
              </h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) Request additional documentation from shortlisted projects,
                including Whitepaper, Company Details, Legal Opinions, Team
                Backgrounds & Regulatory Compliance Materials.
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Conduct thorough Due Diligence to Verify the Authenticity &
                Legality of the Project, including Background Checks on Team
                Members & Legal Compliance Assessments.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                4) Technical Integration Guidance :
              </h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) Provide Guidance & Support to Projects Teams on the Technical
                Integration Process, including token standards, blockchain
                protocols, and smart contract development.
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Assist Projects in preparing for the technical requirements
                of conducting a presale and IEO on HUMB Exchange platform.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                5) Listing Agreement & Terms Negotiation :
              </h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) Initiate negotiations with the Selected Projects Teams
                regarding the Terms of the Presale & IEO (Initial Exchange
                Offering) Listing Agreement.
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Define terms such as Token Allocation, Token Sale Duration,
                Fundraising Goals, Listing Fees & Trading Arrangements
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                6) Announcement & Marketing Preparation :
              </h5>
              <p className="desc sub_desc mt-3">
                {" "}
                a) Prepare a Formal Announcement for the Upcoming Presale & IEO
                Events, including details such as Project Name, Token Symbol,
                Fundraising Goals & Sale Duration.
              </p>
              <p className="desc sub_desc mt-2">
                {" "}
                b) Coordinate with the Project Team on Marketing Strategies &
                Promotional Activities to generate Interest & Attract
                Participants.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">7) Website Updates :</h5>
              <p className="desc sub_desc mt-3">
                a) Update HUMB Exchange's Website to feature the Upcoming
                Presale & IEO Events prominently in the HUMB Launchpad Section.
              </p>
              <p className="desc sub_desc mt-2">
                b) Provide comprehensive Information about the participating
                Projects, including Project Details, Team, Tokenomics,
                Fundraising Goals & Sale Terms.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">8) Presale & IEO Events :</h5>
              <p className="desc sub_desc mt-3">
                a) Launch the Presale & IEO Events on the Scheduled Dates,
                allowing Participants to Purchase Tokens directly through HUMB
                Exchange platform.
              </p>
              <p className="desc sub_desc mt-2">
                b) Monitor the progress of the Fundraising Campaigns, including
                Token Sale Volumes, Contribution Amounts & Participant
                Engagement.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">9) Post-Event Support :</h5>
              <p className="desc sub_desc mt-3">
                a) Provide ongoing Support to Projects & Participants during and
                after the Presale & IEO Events
              </p>
              <p className="desc sub_desc mt-2">
                b) Assist Projects in Distributing Tokens to Participants &
                ensuring a smooth transition to Trading on the HUMB Exchange.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                10) Compliance Monitoring & Reporting :
              </h5>
              <p className="desc sub_desc mt-3">
                a) Ensure Compliance with Regulatory Requirements & HUMB
                Exchange Policies throughout the Presale & IEO process.
              </p>
              <p className="desc sub_desc mt-2">
                b) Maintain records of Fundraising Activities, Participant
                Information & Transaction Data for Compliance Reporting &
                Auditing purposes.
              </p>
            </div>
            <div className="mt-5">
              <h5 className="green_title">
                11) Feedback Collection & Improvement :
              </h5>
              <p className="desc sub_desc mt-3">
                a) Gather feedback from Projects, Participants & other
                Stakeholders regarding the Presale & IEO experience.
              </p>
              <p className="desc sub_desc mt-2">
                b) Use Feedback to identify areas for Improvement & Implement
                necessary Changes to enhance future Launchpad Events & the
                overall HUMB Exchange experience.
              </p>
            </div>
            <div className="d-flex align-items-center gap-3 mt-5">
              <label class="checkbox_container">
                <input
                  type="checkbox"
                  checked={check}
                  onChange={(e) => {
                    seterror();
                    setCheck(e.target.checked);
                  }}
                />
                <span class="checkbox_checkmark"></span>
              </label>
              <p className="">I agreed the terms and conditions</p>
            </div>{" "}
            <span className="text-danger f-12 d-block text-left mt-2">
              {error}
            </span>
            <div className="my-5 d-flex justify-content-center">
              <button className="grn_grd_btn" onClick={handleLaunchpadToken}>
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

export default RequestToken;
