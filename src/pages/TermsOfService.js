import React, { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import ReactHtmlParser from 'react-html-parser';
import LaunchpadFooter from "../Layout/LaunchpadFooter";
import { getCms } from "../actions/cmsAction";

const TermsOfService = (props) => {
  const [cmsData, setCmsData] = useState("");

  const getCmsData = async () => {
    try {
      const getData = await getCms({ page: "termsAndCondition" });
      if (getData.status) {
        setCmsData(getData.data.data)
      }
    } catch (e) {
      console.log("getCmsData_err", e);
    }
  }

  useEffect(() => {
    getCmsData()
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Header props={props} />
      <section className="min_ht_section ">
        <div className="container container80 min_pads">
          <h4 className="lnd_headings lnd_gradient">Terms of Service</h4>
          <div className="cms_content_div">
            <p>
              {
                cmsData && cmsData.ck &&
                ReactHtmlParser(
                  cmsData.ck
                )
              }
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsOfService;
