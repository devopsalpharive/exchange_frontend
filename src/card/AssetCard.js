import React from "react";

const AssetCard = (props) => {
  return (
    <div className="exchange_card asset_card">
      <div className="row mx-auto">
        <div className="col-2 px-0 d-flex align-items-center">
          <div>
            <img
              src={props.val.img}
              alt={props.val.type}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-8 pe-0 d-flex align-items-center ps-md-4">
          <div>
            <p className="text_bold_sm as_text_bold_sm">{props.val.coinType}</p>
            <p className="text_light_xs as_text_light_xs">{props.val.short}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
