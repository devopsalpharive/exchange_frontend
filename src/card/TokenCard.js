import React from "react";
import { Link } from "react-router-dom";

const TokenCard = (props) => {
  return (
    <div className="token_card">
      <div className="row">
        <div className="col-12 col-sm-4 col-xl-2 col-xxl-3 d-flex justify-content-center align-items-center">
          <div className="tk_card_img_wrp">
            <img
              src={props.val.logoUrl}
              alt={props.val.title}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-12 col-sm-8 col-xl-8 col-xxl-7 tk_card_cnt_col mt-5 mt-sm-0 d-flex align-items-center">
          <div>
            <h5 className="tk_title">{props.val.tokenName}</h5>
            <p className="tk_desc mt-3">
              {props?.val.description?.length > 0 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: props?.val.description }}
                ></div>
              ) : (
                ""
              )}
              {/* {props.val.description} */}
            </p>
            <div className="row mt-4 mx-auto">
              {/* <div className="col-6 mb-2 ps-0">
                <p className="tk_label">Total Allocation</p>
              </div> */}
              {/* <div className="col-6 mb-2">
                <p className="tk_value">17987878 {props.val.tokenSymbol}</p>
              </div> */}
              <div className="col-6 mb-2 ps-0">
                <p className="tk_label">Price</p>
              </div>
              <div className="col-6 mb-2">
                <p className="tk_value">
                  1 {props.val.currency} = {props.val.presaleRate}{" "}
                  {props.val.tokenSymbol}
                </p>
              </div>
              <div className="col-6 mb-2 ps-0">
                <p className="tk_label">Start</p>
              </div>
              <div className="col-6 mb-2">
                <p className="tk_value">
                  {new Date(props.val.startTime).toString()}
                </p>
              </div>
              <div className="col-6 mb-2 ps-0">
                <p className="tk_label  ">End</p>
              </div>
              <div className="col-6 mb-2">
                <p className="tk_value">
                  {new Date(props.val.endTime).toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-2 col-xxl-2 d-flex align-items-center justify-content-center mt-4 mt-md-5">
          {props.val.theme == '1' ?
            <Link
              to={`/launchPadDetail/rubby/${props.val.tokenSymbol}/${props.val._id}`}
              // to="/launchPadDetails"
              className="grad_btn text-decoration-none"
              state={props.val}
            >
              Details
            </Link> :
            props.val.theme == '2' ?
              <Link
                to={`/launchPadDetail/emerald/${props.val.tokenSymbol}/${props.val._id}`}
                // to="/launchPadDetails"
                className="grad_btn text-decoration-none"
                state={props.val}
              >
                Details
              </Link> :
              props.val.theme == '3' ?
                <Link
                  to={`/launchPadDetail/sapphire/${props.val.tokenSymbol}/${props.val._id}`}
                  // to="/launchPadDetails"
                  className="grad_btn text-decoration-none"
                  state={props.val}
                >
                  Details
                </Link> : ""
          }
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
