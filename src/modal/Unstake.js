import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Images } from "../data/Images";
import Lottie from "lottie-react";
import successJson from "../asset/json/success.json";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { IoMdInformationCircle } from "react-icons/io";

/** Actions */
import { unStakingUser } from "../actions/stakingAction";

/**Config */
import { showToastMessage } from "../config/toast";
import { toFixedNumber } from "../config/lib";

const Unstake = (props) => {
  const { userAsset, getUser } = useSelector((state) => state.user);
  const { stakingCurrencies } = useSelector((state) => state.staking);

  const numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  const [depositAmount, setDepositAmount] = useState(0);
  const [claimbAmount, setClaimbamount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [stakeTokenAsset, setStakeTokenAsset] = useState({});
  const [error, setError] = useState({});
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const close = () => {
    setCheck(false);
    setError({});
    setDepositAmount(0);
    props.handleAddLiquidityClose()
  }

  const userStakeCoinAsset = () => {
    try {
      if (!isEmpty(userAsset)) {
        const data =
          userAsset &&
          userAsset.assets.filter(
            (el) => el.currencyId == props?.data?.currencyId
          );
        setStakeTokenAsset(data[0]);
      }


      /** Calculate Reward */
      const dataDiffer = (Date.now() - props?.data?.claimbDate) / (1000 * 60 * 60 * 24);
      let apyPercengate = props?.data?.apr / 365;
      apyPercengate = props?.data?.duration * apyPercengate
      let calculatePercentage = ((parseFloat(props.data.userPartispantAmount) * parseFloat(apyPercengate)) / 100 * parseFloat(props?.data?.prePrice));
      // console.log("calculatePercentagecalculatePercentagecalculatePercentage", dataDiffer, props?.data?.claimbDate);

      calculatePercentage = toFixedNumber(calculatePercentage * dataDiffer)
      if (props?.data?.claimbDate > 0 && dataDiffer > 1) {
        setClaimbamount(calculatePercentage);
      }
    } catch (e) {
      console.log("userStakeCoinAsset_err", e);
    }
  };

  const unStake = async () => {
    try {
      if (check == false) {
        setError({ check: "Terms and condition is required." });
        return;
      }
      setIsLoading(true)
      const data = await unStakingUser({ userId: getUser.userId, poolId: props?.data?._id }, getUser.secretKey);
      console.log("stake_data", data)
      if (data.status) {
        setError({})
        setIsLoading(false)
        props.getPools(0)
        close();
        showToastMessage(data.message, "success");
      } else {
        showToastMessage(data?.message, "error");
        setIsLoading(false)
        setError(data.errors);
      }
    } catch (e) {
      console.log("stake_err", e);
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
        show={props.addLiquidityShow}
        onHide={close}
        className="custom_modal "
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={close}
        >
          <IoClose />
        </button>
        {!success && (
          <Modal.Header closeButton>
            <h5 className="mb-0">UnStake</h5>
          </Modal.Header>
        )}

        <Modal.Body>
          <div>

            <div>
              {" "}
              {/* <div className="stake_card_header d-flex align-items-center gap-3 mt-2 border-0">
                  <div className="stake_card_prfl_wrapper">
                    <img
                      src={Images.stakeCoin2}
                      alt=""
                      className="img_fit_container"
                    />
                  </div>
                  <p className="stake_title">Stake Coin</p>
                </div> */}

              {/* <div className="row">
                  <div className="col-12 ">
                    <div
                      className="
          "
                    >
                      <div className="mt-4 d-flex flex-column ">
                        <label>
                          Deposit Amount <span className="text-danger">*</span>
                        </label>
                        <ModalInput
                          placeholder="0.00"
                          type="text"
                          value={depositAmount}
                          onChange={(e) => {
                            numbers.test(e.target.value) == true &&
                              setDepositAmount(parseFloat(e.target.value));
                          }}
                        />
                        <p className=" error_text mt-2">{error?.amount}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3 mb-4">
                        <div className="d-flex align-items-center gap-2 ">
                          <img
                            src={Images.stakeCoin8}
                            alt="coin"
                            className="img-fluid al_eth_coin"
                          />
                          <p>{stakeTokenAsset?.currencySymbol}</p>
                        </div>
                        <div>
                          <p className="balance_grad">
                            Balance : {props?.data?.userPartispantAmount}
                          </p>
                        </div>
                      </div>

                      <button
                        className="grad_btn grad_btn2 mt-5 w-100"
                        onClick={() => {
                          unStake();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div> */}

            </div>
          </div>


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
                      <p>{props?.data?.duration} Days</p>
                    </div>
                  </div>
                </div>


                <div className="row mt-4">
                  <div className="col-12 col-sm-6 ">
                    <label className="light_white_label">Wallet Balance</label>
                  </div>
                  <div className="col-12 col-sm-6 mt-2 mt-sm-0 d-flex justify-content-sm-end">
                    <p className="mdl_gray_p">
                      {stakeTokenAsset?.balance} {props?.data?.currencySymbol}
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label className="light_white_label">
                      Stake amount
                    </label>
                  </div>
                  {/* <div className="col-6 d-flex justify-content-end">
                    <p className="mdl_green_p">Max</p>
                  </div> */}
                </div>
                <div className="row mx-auto mt-3 gray_input_box">
                  <div className="col-7">
                    <input
                      placeholder="Please enter amount"
                      value={props?.data?.userPartispantAmount}
                    // onChange={(e) => {
                    //   calculateInterest(e.target.value);
                    // }}
                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end">
                    <p className="mdl_gray_p bold">
                      {stakeTokenAsset?.currencySymbol}
                    </p>
                  </div>
                </div>
                {/* <p className=" error_text mt-2">{error.amount}</p> */}
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
                    <div className="col-12 col-sm-6">
                      <p className="light_white_label">Stake Date</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                      <p className="mdl_gray_p">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.stakeDate).toUTCString()
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                      <p className="light_white_label">End Date</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                      <p className="mdl_gray_p">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.stakeEndDate).toUTCString()
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                      <p className="light_white_label">Reward Token</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                      <p className="mdl_gray_p">
                        {" "}
                        {props?.data?.rewardTokenSymbol}
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-6">
                      <p className="light_white_label">Claim Period</p>
                    </div>
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                      <p className="mdl_gray_p">
                        {props?.data?.redemptionPeriod} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <p className="light_white_label">Est.APY</p>
                    </div>
                    <div className="col-12 col-sm-8 mt-2 mt-sm-0 d-flex justify-content-sm-end">
                      <p className="mdl_gray_p">{props?.data?.apr} %</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column  flex-sm-row align-items-sm-center justify-content-sm-between py-3 gap-2 gap-sm-0">
                    <p className="light_white_label">Est.Interest</p>
                    <p className="mdl_gray_p text-sm-end">
                      {claimbAmount} {props?.data?.rewardTokenSymbol}
                    </p>
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
                          unStake();
                        }}
                      >
                        <p>Confirm</p>
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

export default Unstake;
