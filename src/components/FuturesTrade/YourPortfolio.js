import React from "react";
import { data } from "../../data/data";
import { useSelector } from "react-redux";

const YourPortfolio = () => {
  const { userAsset } = useSelector((state) => (state.user))
  return (
    <div className="trade_card">
      <div className="trade_title">Your Portfolio</div>
      <div className="pflo_body d-flex flex-column align-items-center">
        <h3 className="h3_green_lg fw-bold">{userAsset?.totalBalance} {userAsset.convertCurrency}</h3>
        <p className="fw_500 mt-2">Total Balance</p>
      </div>
      {/* <div className="trade_table mt-3">
        <div className="trade_table_head ob_table_head">
          <div className="row mx-auto">
            <div className="col-4 px-0">
              <p className="text-start">Type</p>
            </div>
            <div className="col-4 px-0">
              <p className="text-center">Size</p>
            </div>
            <div className="col-4 px-0">
              <p className="text-end">USD</p>
            </div>
          </div>
        </div>
        <div className="trade_table_body">
          <div>
            {data.yourPortfolio.map((val) => (
              <div className="row cp_dtls_body_bottom">
                <div className="col-4 px-0">
                  <p className="text-start">{val.type}</p>
                </div>
                <div className="col-4 px-0">
                  <p className="text-center">{val.size}</p>
                </div>{" "}
                <div className="col-4 px-0">
                  <p className="text-end">{val.usd}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default YourPortfolio;
