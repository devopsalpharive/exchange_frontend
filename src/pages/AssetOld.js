import React from "react";
import Select from "react-select";

import { Images } from "../data/Images";
import MyAssetTable from "../Tables/MyAssetTable";
import RecentTransaction from "../Tables/RecentTransaction";
import { Link } from "react-router-dom";

const AssetOld = () => {
  const options = [
    { value: "USD", label: "USD" },
    { value: "ETH", label: "ETH" },
    { value: "CRON", label: "CRON" },
  ];
  return (
    <div className="wallet_section">
      <div className="wlt_balance ast_balance  d-flex flex-column flex-sm-row  align-items-start justify-content-between">
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

export default AssetOld;
