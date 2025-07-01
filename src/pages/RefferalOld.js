import React from "react";
import { Images } from "../data/Images";
import { data } from "../data/data";
import ReferralHistory from "../Tables/ReferralHistory";
import Datepicker from "../components/Datepicker";

const ReferralOld = () => {
  return (
    <div>
      <div className="wallet_profile">
        <div className="row align-items-md-center">
          <div className="col-12 col-md-6 pe-md-3 pe-xl-5">
            <div>
              <h5 className="h5_text_lg">
                Refer Your Friends They Trade, You Win
              </h5>
              <p className="desc_xs my-3">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </p>
              <button className="grn_grd_btn mt_40">Invite Now</button>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-5 mt-md-0 ">
            <div className="wv_card d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <p>Referral Link </p>

              <div className="d-flex align-items-center gap-2 mt-3 mt-sm-0">
                <p className="fw-bold">https://humb.com</p>

                <img
                  src={Images.greencopy}
                  alt="copy"
                  className="img-fluid green_copy_img"
                />
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
                <h6 className="h5_text_lg my-4">Invite Friends to Register</h6>
                <p className="desc sub_desc text-center ">
                Invite your friends to Register with HUMB. Share your Referral Code with them.
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
                <h6 className="h5_text_lg my-4">Invite Friends to Trade</h6>
                <p className="desc sub_desc text-center ">
                Invite your Friends to Trade on HUMB. Share different Insights from HUMB with your friends.
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
                <h6 className="h5_text_lg my-4">Trade More, Earn More</h6>
                <p className="desc sub_desc text-center ">
                The More your Friends Trade, the More you Earn…
You will keep on Earning portion of their Trading Fees for lifetime.


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
              {data.earingDashboard.map((value) => (
                <div className="col-12 col-md-6 col-xxxl-3 mb-4">
                  <div className="earing_card">
                    <div className="row mx-auto align-items-center">
                      <div className="col-4 col-sm-3 col-md-4 ">
                        <div>
                          <img
                            src={value.img}
                            alt="earning"
                            className="img-fluid earning_card_img"
                          />
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-8 px-xxl-0">
                        <div>
                          <p className="earn_heads">{value.heading}</p>
                          <p className="mt-2 earn_count">{value.count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="d-flex flex-wrap justify-content-between  align-items-center ">
              {data.earingDashboard.map((value) => (
                <div className="earing_card">
                  <div className="row mx-auto align-items-center">
                    <div className="col-4 col-sm-3 col-md-4 ">
                      <div>
                        <img
                          src={value.img}
                          alt="earning"
                          className="img-fluid earning_card_img"
                        />
                      </div>
                    </div>
                    <div className="col-8 col-sm-9 col-md-8">
                      <div>
                        <p className="earn_heads">{value.heading}</p>
                        <p className="mt-2 earn_count">{value.count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <div className="wallet_profile mt_40">
        <div>
          <h5 className="h5_text_lg mb-0">Referral History</h5>
          <div className="mt_40">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-5 col-xxl-4 col-xxxl-3">
                <Datepicker placeholder="Start Date" />
              </div>
              <div className="col-12 col-sm-6 mt-4 col-md-5 col-xxl-4 col-xxxl-3 mt-sm-0">
                <Datepicker placeholder="End Date" />
              </div>
            </div>
            <ReferralHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralOld;
