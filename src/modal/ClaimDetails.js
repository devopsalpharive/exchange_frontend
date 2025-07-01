import isEmpty from "is-empty";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoMdInformationCircle } from "react-icons/io";

/** Actions */
import { stakingClaimb } from "../actions/stakingAction";
import { showToastMessage } from "../config/toast";
import { Images } from "../data/Images";
import { toFixedNumber } from "../config/lib";

const ClaimDetails = (props) => {
  const { userAsset, getUser } = useSelector((state) => state.user);
  const [stakeTokenAsset, setStakeTokenAsset] = useState({});
  const [claimbAmount, setClaimbamount] = useState(0);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);


  const close = () => {
    setCheck(false);
    setError({});
    props.handleClaimClose()
  }

  const userStakeCoinAsset = () => {
    try {
      if (!isEmpty(userAsset)) {
        const data =
          userAsset &&
          userAsset.assets.filter((el) =>
          // props?.data?.userRewardToken.includes(el.currencyId)
          { return props?.data?.rewardTokenId == el.currencyId }
          );
        // console.log("isEmptysetStakeTokenAsset",props.data);
        setStakeTokenAsset(data[0]);

        /** Calculate Reward */
        const dataDiffer = (Date.now() - props?.data?.claimbDate) / (1000 * 60 * 60 * 24);
        let apyPercengate = props?.data?.apr / 365;
        apyPercengate = props?.data?.duration * apyPercengate
        let calculatePercentage = ((parseFloat(props.data.userPartispantAmount) * parseFloat(apyPercengate)) / 100 * parseFloat(props?.data?.prePrice));
        // calculatePercentage = toFixedNumber(calculatePercentage * dataDiffer)
        setClaimbamount(calculatePercentage);
      }
    } catch (e) {
      console.log("userStakeCoinAsset_err", e);
    }
  };

  const claimb = async () => {
    try {
      if (check == false) {
        setError({ check: "Terms and condition is required." });
        return;
      }
      let payload = {
        userId: getUser?.userId,
        poolId: props?.data?._id,
        amount: claimbAmount,
      };
      setIsLoading(true)
      const userClaimb = await stakingClaimb(payload, getUser?.secretKey);
      if (userClaimb.status) {
        setIsLoading(false)
        showToastMessage(userClaimb.message, "success");
        props.getPools();
        close();
      } else {
        setIsLoading(false)
        showToastMessage(userClaimb.message, "error");
        close();
      }
    } catch (e) {
      console.log("claimb_err", e);
    }
  };

  useEffect(() => {
    userStakeCoinAsset();
  }, [userAsset, props]);

  return (
    <div>
      <Modal
        centered
        size="lg"
        backdrop="static"
        show={props.showClaim}
        onHide={close}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={close}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Claim {props?.data?.rewardTokenSymbol}</h5>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
            <div className="col-12 col-lg-7 pe-3 gray_border_right">
              <div>
                <div className="row">
                  <div className="col-12 col-sm-7">
                    <label className="gray_label">Type</label>
                    <div className="green_border_wrapper mt-2">
                      <p>Locked</p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-5 mt-3 mt-sm-0">
                    <label className="gray_label">Duration (Days)</label>

                    <div className="green_border_wrapper mt-2">
                      <p>{props?.data?.duration} Dayz</p>
                    </div>
                  </div>
                </div>


                <div className="row mt-4">
                  <div className="col-6">
                    <label className="light_white_label">Reward Token Balance</label>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <p className="mdl_gray_p">
                      {stakeTokenAsset?.balance} {stakeTokenAsset?.currencySymbol}
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label className="light_white_label">
                      Stake amount
                    </label>
                  </div>

                </div>
                <div className="row mx-auto mt-3 gray_input_box">
                  <div className="col-7">
                    <input
                      placeholder="Please enter amount"
                      value={props?.data?.userPartispantAmount}

                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end">
                    <p className="mdl_gray_p bold">
                      {props?.data?.currencySymbol}
                    </p>
                  </div>
                </div>
                <label className="light_white_label mt-3">
                  Locked amount limitation
                </label>
                <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                  <p className="mdl_gray_p">
                    Minimum :{" "}
                    <span>
                      {props?.data?.minimumStake} {props?.data?.currencySymbol}
                    </span>
                  </p>
                  <p className="mdl_gray_p">
                    Maximum :{" "}
                    <span>
                      {props?.data?.maximumStake} {props?.data?.currencySymbol}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <label class="checkbox_container">
                    <input
                      type="checkbox"
                      checked={check}
                      onChange={(e) => {
                        setCheck(e.target.checked);
                      }}
                    />
                    <span
                      class="checkbox_checkmark"
                      style={{ marginTop: "2px" }}
                    ></span>
                  </label>
                  <p className="ms-4 terms_theme_p">
                    I have read and I agree to the <span>Staking Terms</span>
                  </p>
                  <p className=" error_text mt-2">{error?.check}</p>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-4">
                  <button
                    className="gray_border_button"
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 ps-3 mt-5 mt-lg-0">
              <div>
                <h5 className="theme_text_p fw-bold">Summary</h5>

                <div className="summary_wrapper pb-4">
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="light_white_label">Stake Date</p>
                    </div>
                    <div className="col-6">
                      <p className="mdl_gray_p">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.stakeDate).toUTCString()
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="light_white_label">Next Claim Date</p>
                    </div>
                    <div className="col-6">
                      <p className="mdl_gray_p">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.nextClaimbDate).toUTCString()
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="light_white_label">Reward Token</p>
                    </div>
                    <div className="col-6">
                      <p className="mdl_gray_p">
                        {" "}
                        {props?.data?.rewardTokenSymbol}
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="light_white_label">Claim Period</p>
                    </div>
                    <div className="col-6">
                      <p className="mdl_gray_p">
                        {props?.data?.redemptionPeriod} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="row">
                    <div className="col-6">
                      <p className="light_white_label">Est.APY</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <p className="mdl_gray_p">{props?.data?.apr} %</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="light_white_label">Est.Interest</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <p className="mdl_gray_p">
                        {claimbAmount} {props?.data?.rewardTokenSymbol}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2 mt-3 summary_info">
                    <IoMdInformationCircle fill="#22b87b" />
                    <p className="mdl_gray_p">
                      The APY is adjusted daily based on the on-chain staking
                      rewards, and the specific APY is subject to the page
                    </p>
                  </div>
                  <div className="mt-4">
                    {isLoading ? (
                      <button className="mdl_green_btn">
                        <p>Loading...</p>
                      </button>
                    ) : (
                      <button
                        className="mdl_green_btn"
                        onClick={() => {
                          claimb();
                        }}
                      >
                        <p>Claim</p>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClaimDetails;
