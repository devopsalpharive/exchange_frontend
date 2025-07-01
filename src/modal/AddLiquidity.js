import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Images } from "../data/Images";
import AddLiquidtyGraph from "../Graph/AddLiquidtyGraph";
import Lottie from "lottie-react";
import successJson from "../asset/json/success.json";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { IoMdInformationCircle } from "react-icons/io";

/** Actions */
import { stakingUser } from "../actions/stakingAction";

/**Config */
import { showToastMessage } from "../config/toast";
import { toFixedNumber } from "../config/lib";

const AddLiquidity = (props) => {
  const { userAsset, getUser } = useSelector((state) => state.user);
  const numbers = /^-?(?:\d+(\.\d*)?|\.\d+)$/;

  const { addLiquidityShow, } = props
  const [depositAmount, setDepositAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [stakeTokenAsset, setStakeTokenAsset] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [interest, setInterest] = useState(0);
  const [check, setCheck] = useState(false);

  const close = () => {
    setDepositAmount(0);
    setError({}); setIsLoading(false);
    setInterest(0)
    props.getPools();
    props.handleAddLiquidityClose();
  }
  const userStakeCoinAsset = () => {
    try {
      console.log("userStakeCoinAsset_dta", userAsset);
      if (!isEmpty(userAsset)) {
        const data =
          userAsset &&
          userAsset.assets.filter(
            (el) => el.currencyId == props?.data?.currencyId
          );
        setStakeTokenAsset(data[0]);
      }
    } catch (e) {
      console.log("userStakeCoinAsset_err", e);
    }
  };

  const stake = async () => {
    try {
      if (check == false) {
        setError({ check: "Terms and condition is required." });
        return;
      }
      if (stakeTokenAsset?.balance >= depositAmount) {
        setIsLoading(true);
        const data = await stakingUser({
          userId: getUser.userId,
          currency: props?.data?.currencyId,
          poolId: props?.data?._id,
          amount: depositAmount,
          // rewardToken: selectedCurrency._id,
        }, getUser.secretKey);
        console.log("stake_data", data);
        if (data.status) {
          // const updateBalance = { ...stakeTokenAsset, ...{ balance: parseFloat(stakeTokenAsset.balance) - parseFloat(depositAmount) } }
          // setStakeTokenAsset(updateBalance);
          // console.log("checking_update_balance", updateBalance.balance,);
          close()
          showToastMessage(data.message, "success");
        } else {
          setIsLoading(false);
          setError(data.errors);
        }
      } else {
        setError({ amount: "* Your Balance is too low." });
      }
    } catch (e) {
      console.log("stake_err", e);
    }
  };

  const calculateInterest = async (data) => {
    try {
      let apyPercengate = props?.data?.apr / 365;
      apyPercengate = props?.data?.duration * apyPercengate
      let calculate = (data * apyPercengate / 100);
      console.log("calculate", (calculate * props?.data?.prePrice), props?.data ,calculate);
      calculate = calculate * props?.data?.prePrice
      calculate = toFixedNumber(calculate)
      setInterest(calculate);
      setDepositAmount(data)
    } catch (e) {
      console.log("calculateInterest_err", e);
    }
  };

  useEffect(() => {
    // getCurrency()
    userStakeCoinAsset();
  }, [userAsset, addLiquidityShow]);

  // useEffect(() => {
  // setCurrencies(stakingCurrencies);
  // setSelectedCurrency(stakingCurrencies[0]);
  // }, [stakingCurrencies]);



  return (
    <div>
      <Modal
        centered
        // size={success ? "md" : "lg"}
        size="lg"
        backdrop="static"
        show={addLiquidityShow}
        onHide={close}
        className="custom_modal custom_modal_xl"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => {
            close()
          }}
        >
          <IoClose />
        </button>
        {!success && (
          <Modal.Header closeButton>
            <h5 className="mb-0">Stake {props?.data?.currencySymbol}</h5>
          </Modal.Header>
        )}

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
                      <p>{props?.data?.duration} Days</p>
                    </div>
                    {/* <div className="green_border_wrapper wrap_space_between  mt-2">
                      <input placeholder="Enter Days" />
                    </div> */}
                  </div>
                </div>


                <div className="row mt-4">
                  <div className="col-6">
                    <label className="light_white_label">Wallet Balance</label>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <p className="mdl_gray_p">
                      {stakeTokenAsset?.balance} {props?.data?.currencySymbol}
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label className="light_white_label">
                      Amount to be Staked
                    </label>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <p className="mdl_green_p" style={{ cursor: "pointer" }} onClick={() => {
                      setDepositAmount(stakeTokenAsset?.balance);
                      calculateInterest(stakeTokenAsset?.balance);
                    }}>Max</p>
                  </div>
                </div>
                <div className="row mx-auto mt-3 gray_input_box">
                  <div className="col-7">
                    <input
                      placeholder="Please enter amount"
                      value={depositAmount}
                      onChange={(e) => {
                        if (numbers.test(e.target.value) || e.target.value == "") {
                          calculateInterest(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end">
                    <p className="mdl_gray_p bold">
                      {props?.data?.currencySymbol}
                    </p>
                  </div>
                </div>
                <p className=" error_text mt-2">{error?.amount}</p>
                <label className="light_white_label mt-3">
                  Staking Amount Requirement / Limitation
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
                    onClick={() => {
                      setDepositAmount(0);
                      setError({});
                      props.handleAddLiquidityClose();
                    }}
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
                  <div className="row mt-3 mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Staking Start Date</p>
                    </div>
                    <div className="col-7 pe-0">
                      <p className="mdl_gray_p text-end">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.stakeDate).toUTCString()
                          : new Date().toUTCString()}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3 mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Withdrawal Date</p>
                    </div>
                    <div className="col-7 pe-0">
                      <p className="mdl_gray_p text-end">
                        {props?.data?.stakeEndDate
                          ? new Date(props?.data?.stakeEndDate).toUTCString()
                          : new Date(new Date().setDate(new Date().getDate() + props?.data?.duration)).toUTCString()}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3 mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Reward Token</p>
                    </div>
                    <div className="col-7 pe-0">
                      <p className="mdl_gray_p text-end">
                        {" "}
                        {props?.data?.rewardTokenSymbol}
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3 mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Claim Period</p>
                    </div>
                    <div className="col-7 pe-0">
                      <p className="mdl_gray_p text-end">
                        {props?.data?.redemptionPeriod} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="row mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Est.APY</p>
                    </div>
                    <div className="col-7 pe-0 d-flex justify-content-end">
                      <p className="mdl_gray_p text-end">{props?.data?.apr} %</p>
                    </div>
                  </div>
                  <div className="row mt-3 mx-auto">
                    <div className="col-5 px-0">
                      <p className="light_white_label">Est.Interest</p>
                    </div>
                    <div className="col-7 pe-0 d-flex justify-content-end">
                      <p className="mdl_gray_p text-end" style={{ wordBreak: "break-all" }}>
                        {interest} {props?.data?.rewardTokenSymbol}
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
                          stake();
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

export default AddLiquidity;
