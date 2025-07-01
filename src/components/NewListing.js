import React from "react";
import { data } from "../data/data";
import { useSelector } from "react-redux";

const NewListing = (props) => {
  const { records } = props
  const { pairList } = useSelector((state) => state.pairList);
  return (
    <div className="mo_cards">
      <div className="mo_table">
        <div className="mo_table_head d-flex align-items-center justify-content-between">
          <p className="mo_card_title">New Listing</p>
          {/* <button className="more_button">More</button> */}
        </div>
        <div className="mo_table_body">
          {
            records.length > 0 ? records.map((value) => {
              console.log(value, 'NewListing')
              let tikerData = pairList.find((val) => (val.tikerRoot == value.tikerRoot))
              return (
                <div className="row mb-3">
                  <div className="col-4">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={value?.currencyImage}
                        alt={value?.currency}
                        className="mo_coin_img"
                      />
                      <p className="mo_coin_name">{value?.currency}</p>
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-center">
                    <div>
                      <p className="mo_dollarPercent">
                        {tikerData?.last}%
                      </p>
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div>
                      <p
                        className={`${tikerData?.changes > 0 ? "positive" : "negative"
                          } mo_status_value `}
                      >
                        +{tikerData?.changes}%
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
              :
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">No data found</div>
          }
        </div>
      </div>
    </div>
  );
};

export default NewListing;
