import React, { useEffect, useState } from "react";
import { Images } from "../data/Images";
import ReferralHistory from "../Tables/ReferralHistory";
import Layout from "../Layout/Layout";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

/** Config */
import config from "../config/env";
import { showToastMessage } from "../config/toast";
import { refferalDetails } from "../actions/userAction";

const Referral = (props) => {
  const { getUser } = useSelector((state) => state.user);
  const [record, setRecord] = useState({});



  const getReferral = async () => {
    try {
      const data = await refferalDetails(getUser.secretKey);
      console.log("getReferral_datadatadatadatadatadata", data.data[0]);
      if (data.status) {
        setRecord(data.data[0])
      }
    } catch (e) {
      console.log("getReferral_err", e);
    }
  }


  useEffect(() => {
    getReferral()
  }, [])

  return (
    <Layout props={props}>
      <div className="referral_page">
        <div className="wallet_profile">
          <div className="row align-items-md-center">
            <div className="col-12 col-md-7 pe-md-3 pe-xl-5">
              <div>
                <h5 className="h5_text_lg">
                  Refer Your Friends & get Rewarded…
                </h5>
                {/* <p className="desc_xs mt-3">Every time they Trade, you Win!</p> */}
                <p className="desc_xs mt-3">Every time they Trade, you get Rewarded!</p>
                <p className="desc_xs mt-2">HUMB has a great Referral Plan.</p>
                <p className="desc_xs mt-2">
                  Invite your Friends with your Referral code, so your Friends /
                  Community start Trading on HUMB & Get portion of their Trading
                  Fees for Lifetime.
                  {/* Invite your Friends to Trade on HUMB. Share different Insights from HUMB with your friends. ----{">"} Ensure Friends start trading on HUMB. Share different Insights from HUMB with your friends. */}
                </p>
                {/* <p className="desc_xs mt-2">Trade More, You Earn More ----{">"} Friends Trade More, You Earn More</p> */}

                <button className="grn_grd_btn mt_40">
                  <CopyToClipboard
                    text={`${config.FRONT_URL}/register/${getUser?.referralCode}`}
                    onCopy={() => showToastMessage("Link copied !", "success")}
                  >
                    <p style={{ color: "#fff" }}>Invite Now</p>
                  </CopyToClipboard>
                </button>
              </div>
            </div>
            <div className="col-12  mt-5 ">
              <div className="wv_card d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <p>Referral Link </p>

                <div className="d-flex align-items-center gap-2 mt-3 mt-sm-0">
                  <p className="fw-bold">
                    {getUser &&
                      `${config.FRONT_URL}/register/${getUser?.referralCode}`}
                  </p>
                  <CopyToClipboard
                    text={`${config.FRONT_URL}/register/${getUser?.referralCode}`}
                    onCopy={() => showToastMessage("Link copied !", "success")}
                  >
                    <img
                      src={Images.greencopy}
                      alt="copy"
                      className="img-fluid green_copy_img"
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="wallet_profile mt_40">
          <div>
            <h5 className="h5_text_lg">Refer Friends & Earn Rewards</h5>
            <div className="row">
              <div className="col-12 col-md-4 position-relative">
                <img
                  src={Images.horizontalarrow}
                  alt="arrow"
                  className="position-absolute horizontal_arrow d-none d-md-block"
                />{" "}
                <img
                  src={Images.verticalarrow}
                  alt="arrow"
                  className="position-absolute vertical_arrow d-md-none"
                />
                <div className="d-flex flex-column align-items-center mt_40">
                  <img
                    src={Images.referfriends1}
                    alt="refer"
                    className="img-fluid"
                  />
                  <h6 className="h5_text_lg my-4">
                    Invite friends to register
                  </h6>
                  <p className="desc sub_desc text-center ">
                    Invite your friends to Register with HUMB. Share your
                    Referral Code with them.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 position-relative mt_100px">
                <img
                  src={Images.horizontalarrow}
                  alt="arrow"
                  className="position-absolute horizontal_arrow d-none d-md-block"
                />{" "}
                <img
                  src={Images.verticalarrow}
                  alt="arrow"
                  className="position-absolute vertical_arrow d-md-none"
                />
                <div className="d-flex flex-column align-items-center mt_40">
                  <img
                    src={Images.referfriends1}
                    alt="refer"
                    className="img-fluid"
                  />
                  <h6 className="h5_text_lg my-4">Invite friends to trade</h6>
                  <p className="desc sub_desc text-center ">
                    {/* Invite your Friends to Trade on HUMB. Share different
                    Insights from HUMB with your friends. */}
                    Ensure Friends start trading on HUMB. Share different Insights from HUMB with your friends
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4 position-relative mt_100px">
                <div className="d-flex flex-column align-items-center mt_40">
                  <img
                    src={Images.referfriends1}
                    alt="refer"
                    className="img-fluid"
                  />
                  {/* <h6 className="h5_text_lg my-4">Trade More, You Earn More</h6> */}
                  <h6 className="h5_text_lg my-4">Friends Trade More, You Earn More</h6>
                  <p className="desc sub_desc text-center ">
                    The More your Friends Trade, the More you Earn… You will
                    keep on Earning portion of their Trading Fees for lifetime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wallet_profile mt_40">
          <div>
            <h5 className="h5_text_lg mb-0">My Earnings Dashboard</h5>
            <div className="mt_40">
              <div className="row">

                <div className="col-12 col-md-6 col-xxxl-3 mb-4">
                  <div className="earing_card">
                    <div className="row mx-auto align-items-center">
                      <div className="col-4 col-sm-3 col-md-4 ">
                        <div>
                          <img
                            src={Images.earning1}
                            alt="earning"
                            className="img-fluid earning_card_img"
                          />
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-8 px-xxl-0">
                        <div>
                          <p className="earn_heads">UnQualified referees</p>

                          <p className="mt-2 earn_count">{record?.refferUnQualifiedCount ? record?.refferUnQualifiedCount : 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xxxl-3 mb-4">
                  <div className="earing_card">
                    <div className="row mx-auto align-items-center">
                      <div className="col-4 col-sm-3 col-md-4 ">
                        <div>
                          <img
                            src={Images.earning1}
                            alt="earning"
                            className="img-fluid earning_card_img"
                          />
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-8 px-xxl-0">
                        <div>
                          <p className="earn_heads">Qualified referees</p>
                          <p className="mt-2 earn_count">{record?.refferQualifiedCount ? record?.refferQualifiedCount : 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xxxl-3 mb-4">
                  <div className="earing_card">
                    <div className="row mx-auto align-items-center">
                      <div className="col-4 col-sm-3 col-md-4 ">
                        <div>
                          <img
                            src={Images.earning2}
                            alt="earning"
                            className="img-fluid earning_card_img"
                          />
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-8 px-xxl-0">
                        <div>
                          <p className="earn_heads">Referral count</p>
                          <p className="mt-2 earn_count">{record?.refferCount ? record?.refferCount : 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-xxxl-3 mb-4">
                  <div className="earing_card">
                    <div className="row mx-auto align-items-center">
                      <div className="col-4 col-sm-3 col-md-4 ">
                        <div>
                          <img
                            src={Images.earning3}
                            alt="earning"
                            className="img-fluid earning_card_img"
                          />
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-8 px-xxl-0">
                        <div>
                          <p className="earn_heads">Total rewards</p>
                          <p className="mt-2 earn_count">{record?.amount ? record?.amount : 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="wallet_profile mt_40">
          <div>
            <h5 className="h5_text_lg mb-0">Referral History</h5>
            <div className="mt_40">

              <ReferralHistory />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Referral;
