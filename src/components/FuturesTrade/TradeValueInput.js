import React from "react";
import Select from "react-select";

const TradeValueInput = ({ options, placeholder, selectPlaceholder }) => {
  return (
    <div className="trade_value_input_wrap">
      <div className="row h-100 mx-auto">
        <div className="col-8 col-sm-10 col-md-9 col-lg-10 col-xl-8 col-xxl-9 col-xxxl-10 ps-0">
          <div className="h-100">
            <input
              type="text"
              className="trade_value_input w-100"
              placeholder={placeholder}
            />
          </div>
        </div>
        <div className="col-4 col-sm-2 col-md-3 col-lg-2 col-xl-4 col-xxl-3 col-xxxl-2 px-0">
          <div className="coin_select">
            <Select
              options={options}
              isSearchable={false}
              placeholder={selectPlaceholder}
              classNamePrefix="trade_coin_select"
              // menuIsOpen={true}
              // classNamePrefix="custom_rct_slt"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeValueInput;
