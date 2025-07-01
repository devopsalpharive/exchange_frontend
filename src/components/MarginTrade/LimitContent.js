import React from "react";
import LimitCards from "./card/LimitCards";

const LimitContent = ({ orderType }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6  limit_card_divider position-relative">
        <LimitCards orderType={orderType} buyorsell="buy" />
      </div>
      <div className="col-12 col-md-6 mt-5 mt-md-0">
        {" "}
        <LimitCards orderType={orderType} buyorsell="sell" />
      </div>
    </div>
  );
};

export default LimitContent;
