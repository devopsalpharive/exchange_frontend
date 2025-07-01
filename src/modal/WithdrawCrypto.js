import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import Lottie from "lottie-react";
import paymentProcess from "../asset/json/paymentprocess.json";
import { useSelector } from "react-redux";
import { resendWithdraw2faCode, userWithdrawal } from "../actions/withdrawAction";
import { showToastMessage } from "../config/toast";
import { encryptObject } from "../lib/CryptoJs";
import { userLogout } from "../actions/userAction";

/** Actions */

const WithdrawCrypto = (props) => {
  const numbersRegex = /^-?(?:\d+(\.\d*)?|\.\d+)$/;
  const numbers = /^\d+$/;
  const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag

  const { getUser } = useSelector((state) => state.user);
  const { show, handleClose, data, handleShowAcknowledgement, isSubmit } = props;
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountAfterFee, setAmountAfterFee] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState({});
  console.log("selectedCurrency_selectedCurrency", data);
  useEffect(() => {
    if (isSubmit) {
      userWithdraw();
    }
  }, [isSubmit]);

  const close = () => {
    setWalletAddress("");
    setAmount("");
    setAmountAfterFee(0);
    setIsLoading(false);
    setShowCode(false);
    setCode("")
    setError({})
    handleClose();
  }
  const userWithdraw = async () => {
    try {
      setIsLoading(true)
      const payload = {
        code: code,
        type: data?.type,
        userId: getUser?.userId,
        currency: data?.currencyId,
        coin: data?.currencySymbol,
        amount: amount,
        amountWithfee: amountAfterFee,
        address: walletAddress,
      }
      console.log(payload, 'userWithdraw')
      // let token = encryptObject(payload, getUser.secretKey)
      // let reqData = { token: token }
      // const withdraw = await userWithdrawal(payload);
      const withdraw = await userWithdrawal(payload, getUser.secretKey)
      console.log("withdraw_userWithdraw", withdraw);
      if (withdraw.success) {

        if (withdraw?.status == "OTP") {
          showToastMessage(withdraw.message, 'success')
          setIsLoading(false);
          setShowCode("OTP")
          return
        }
        showToastMessage(withdraw.message, 'success')
        setIsLoading(false)
        close()

      } else {
        if (withdraw?.status == "CELEBRITY") {
          showToastMessage(withdraw.message, 'error')
          userLogout()
        }
        if (withdraw?.errors?.otp == "OTP is Expired") {
          setIsLoading(false);
          setError(withdraw?.errors)
          setShowCode("RESEND");
          return
        }
        setIsLoading(false)
        setError(withdraw?.errors)
        withdraw?.message && showToastMessage(withdraw?.message, 'error')
      }
    } catch (e) {
      console.log("userWithdraw_err", e);
    }
  }

  const resendCode = async () => {
    try {
      const resend = await resendWithdraw2faCode();
      if (resend.status) {
        setShowCode("OTP");
        showToastMessage(resend.data.message, 'success')
      } else {
        resend?.error?.message && showToastMessage(resend.error.message, 'error')
      }
    } catch (e) {
      console.log("resendCode_err", e);
    }
  }

  const withdrawFeeReducer = async (value) => {
    try {
      if (value > 0) {
        // const fee = parseFloat(value) * parseFloat(data?.withdrawalFee) / 100;
        const fee = data?.withdrawalFee

        console.log("feefeefee", fee, data.withdrawalFee);
        setAmountAfterFee(parseFloat(value) + parseFloat(fee))
      } else {
        setAmountAfterFee("")
      }
    } catch (e) {
      console.log("withdrawFeeReducer_err", e);
    }
  }

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={show}
        onHide={() => { close() }}
        className="custom_modal withdrawmodal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => { close() }}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Withdraw Crypto {data?.currencySymbol} ({data?.chainName})</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column">
                  <label className="label_orange">Amount</label>
                  <div className="input_label_wraper mt-2">
                    <div className="row mx-auto h-100">
                      <div className="col-9  d-flex align-items-center">
                        <input type="text" className="w-100" value={amount} placeholder="Enter amount" onChange={(e) => {
                          setError({})
                          if (numbersRegex.test(e.target.value) || e.target.value == "") {
                            setAmount(e.target.value);
                            withdrawFeeReducer(e.target.value)
                          }
                        }} />
                      </div>
                      <div className="col-3 px-0 d-flex justify-content-center align-items-center label_orange_wraper">
                        <p className="">{data?.currencySymbol}</p>
                      </div>
                    </div>

                  </div>
                  <span className='text-danger'>{error?.amount}</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                <div className="d-flex flex-column">
                  <label className="label_orange">Withdraw Address</label>
                  <div className="input_label_wraper mt-2">
                    <input
                      type="text"
                      className="h-100 w-100 px-2"
                      placeholder="Enter wallet address"
                      value={walletAddress}
                      onChange={(e) => {
                        if (!htmlTagPattern.test(e.target.value)) {
                          setError({})
                          setWalletAddress(e.target.value)
                        }
                      }}
                    />
                  </div>
                  <span className='text-danger'>{error?.address}</span>
                </div>

              </div>
            </div>

            <div className="wallet_balance_wrap mt-4 d-flex align-items-center justify-content-center">
              <p>
                Wallet Balance : <span>{data?.balance} {data?.currencySymbol}</span>
              </p>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-sm-6">
                <div className="d-flex flex-column">
                  <label className="label_orange">
                    Withdraw Amount With Fee
                  </label>
                  <div className="input_label_wraper mt-2">
                    <div className="row mx-auto h-100">
                      <div className="col-9  d-flex align-items-center">
                        <input type="text" className="w-100" value={amountAfterFee} />
                      </div>
                      <div className="col-3 px-0 d-flex justify-content-center align-items-center label_orange_wraper">
                        <p className="">{data?.currencySymbol}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {
                (showCode == "OTP" || showCode == "RESEND") &&
                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-column">
                    <label className="label_orange">
                      OTP
                    </label>
                    <div className="input_label_wraper mt-2">
                      <div className="row mx-auto h-100">
                        <div className="col-9  d-flex align-items-center">
                          <input type="text" className="w-100" value={code}
                            onChange={(e) => {
                              if (numbers.test(e.target.value) || e.target.value == "") {
                                setCode(e.target.value);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-danger f-12 d-block text-left mt-2">
                      {error?.otp}
                    </span>
                  </div>
                </div>
              }


            </div>

            <div className="mt-4 ">
              {isLoading ?
                <button className="grad_btn w-100">Loading...</button>
                :
                showCode == "RESEND" ?
                  <button className="grad_btn w-100" onClick={() => { resendCode() }}>Resend Code</button>
                  : <button
                    className="grad_btn w-100"
                    disabled={amount == "" || walletAddress == ""}
                    onClick={() => {
                      if (isSubmit) {
                        userWithdraw()
                      } else if (!isSubmit) {
                        handleShowAcknowledgement({
                          amount: amount,
                          amountWithfee: amountAfterFee,
                          address: walletAddress
                        });
                      }
                      // userWithdraw()
                    }}>
                    Withdraw
                  </button>
              }
            </div>
            <div className="mt-4">
              <p className="label_orange">Notes</p>
              <div className="notes_p mt-2">
                <p>1. Maximum withdrawal limit {data?.maximumWithdrawal} {data?.currencySymbol}</p>
                <p>2. Minimum withdrawal limit {data?.minimumWithdrawal} {data?.currencySymbol}</p>
                <p>
                  {/* 3. Submit your withdraw your received mail can approve (or)
                  cancel */}
                  3. On submit of withdrawal check mail sent to registered email id for OTP

                </p>
                <p>4. Your withdrawal is pending means after approved by admin only collect the amount.</p>
                {/* <p>
                  4. After 2 minutes your withdraw not completed automatically
                  cancelled and then amount will be updated
                </p> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WithdrawCrypto;
