import React from "react";
import Select from "react-select";

import { Images } from "../data/Images";
import MyAssetTable from "../Tables/MyAssetTable";
import RecentTransaction from "../Tables/RecentTransaction";
import { Link } from "react-router-dom";

const WalletOld = () => {
  const options = [
    { value: "USD", label: "USD" },
    { value: "ETH", label: "ETH" },
    { value: "CRON", label: "CRON" },
  ];
  return (
    <div className="wallet_section">
      <div className="wallet_profile d-flex flex-column flex-sm-row align-items-center justify-content-between ">
        <div className="wp_left d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="wp_img_wrpr">
            <img
              src={Images.profile}
              alt="profile"
              className="img_fit_container"
            />
          </div>
          <div className="">
            <div className="d-flex align-items-center gap-3 mb-2 ">
              <p className="wp_gmail ">Demo@gmail.com</p>
              <button className="border-0 outline-0 bg-transparent">
                <img
                  src={Images.gmailedit}
                  alt="edit"
                  className="img-fluid wp_gmail_edit"
                />
              </button>
            </div>
            <div className="d-flex align-items-center gap-3  ">
              <p className="lnd_grad_txt">UID : 52124832</p>
              <button className="border-0 outline-0 bg-transparent">
                <img
                  src={Images.copy}
                  alt="edit"
                  className="img-fluid wp_gmail_edit"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="wp_right mt-4 mt-sm-0">
          <Link to="/myprofile">
            <button className="grad_btn3">My Profile</button>
          </Link>
        </div>
      </div>
      <div className="wlt_verification mt_40">
        <div className="row">
          <div className="col-12 col-xxl-6 ">
            <div className="wv_card">
              <h6 className="h6_550">Identity Verification</h6>
              <p className="desc_xs my-3">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita
              </p>
              <button className="grn_grd_btn mt-3">Verify</button>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xxl-3 mt-4 mt-xxl-0 ">
            <div className="wv_card h-100 d-flex flex-column justify-content-between">
              <h6 className="h6_550">Deposit</h6>
              {/* <p className="desc_xs my-3">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita
              </p> */}
              <div>
                <button className="grn_grd_btn mt-3">Buy Crypto</button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xxl-3 mt-4 mt-xxl-0">
            <div className="wv_card h-100 d-flex flex-column justify-content-between">
              <h6 className="h6_550">Trade</h6>
              {/* <p className="desc_xs my-3">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita
              </p> */}
              <div>
                <button className="grn_grd_btn mt-3">Buy Crypto</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wlt_balance mt_40 d-flex flex-column flex-sm-row  align-items-start justify-content-between">
        <div className="wlt_bal_left">
          <div className="d-flex align-items-center gap-3">
            <p>Estimated Balance</p>
            <img
              src={Images.eyeIcon}
              alt="view"
              className="img-fluid wlt_view_icn"
            />
          </div>
          <div className="mt-3 d-flex align-items-end gap-2">
            <h2 className="fw-bold mb-0">0.00</h2>
            <Select
              // menuIsOpen={true}
              options={options}
              isSearchable={false}
              placeholder="USD"
              classNamePrefix="custom_rct_slt2"
            />
          </div>

          <div className="d-flex align-items-center gap-2 mt-3">
            <img src={Images.approx} alt="approx" className="img-fluid" />
            <p className="p_450">0.00</p>
          </div>
        </div>
        <div className="wlt_bal_right d-flex flex-column  mt-4 mt-sm-0">
          <Link
            to="/deposit"
            className="grn_grd_btn text-decoration-none text-center"
          >
            Deposit
          </Link>
          <Link
            to="/withdraw"
            className="gray_btn mt-3 text-decoration-none text-center"
          >
            Withdraw
          </Link>
          <Link className="gray_btn mt-3 text-decoration-none text-center">
            Transfer
          </Link>
        </div>
      </div>

      <div className="wlt_asset_table mt_40">
        <h5 className="h5_text_lg">My Asset</h5>
        <MyAssetTable />
      </div>

      <div className="wlt_asset_table mt_40">
        <h5 className="h5_text_lg">Recent Transaction</h5>
        <RecentTransaction />
      </div>
    </div>
  );
};

export default WalletOld;
