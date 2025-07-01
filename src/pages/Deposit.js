import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SelectWithImage from "../components/SelectWithImage";
import SelectWithContent from "../components/SelectWithContent";
import BankTransfer from "../modal/BankTransfer";
import CryptoTransfer from "../modal/CryptoTransfer";
import PaymentProcess from "../modal/PaymentProcess";
import { Images } from "../data/Images";
import Layout from "../Layout/Layout";
import BalanceLayout from "../Layout/BalanceLayout";
import { useSelector } from "react-redux";
import Select from "react-select";
import isEmpty from "is-empty";
import QRCode from "react-qr-code";
import { FaCopy } from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";
import { showToastMessage } from "../config/toast";
import { createVirtualAccount } from "../actions/depositAction";

const paymentOptions = [
  { value: "bankTransfer", label: "Bank Transfer" },
  { value: "paymentGateway", label: "Payment Gateway" },
];
const walletTransfer = [
  {
    value: "walletTransfer",
    label: "Wallet Transfer",
  },
];

const Deposit = (props) => {
  const { getUser, userAsset } = useSelector((state) => state.user);

  const [paymentMode, setPaymentMode] = useState({});
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cryptoTransfer, setCryptoTransfer] = useState(false);
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [error, setError] = useState("");
  const [networkOption, setnetwotkOption] = useState({});
  const [DepositData, setDepositData] = useState("");
  const [selectedNetwork, setselectedNetwork] = useState({});
  console.log(selectedCurrency, "DepositDepositDepositDepositnetworkOption", DepositData);
  const handleBankTransferClose = () => {
    setBankTransfer(false);
  };

  const handleCryptoTransferClose = () => {
    setCryptoTransfer(false);
  };

  const handlePaymentProcessClose = () => {
    setShowPaymentProcess(false);
  };

  const handleDeposit = async () => {
    try {
      let error = {}
      if (isEmpty(selectedCurrency)) {
        error['currency'] = 'please select currency'
        setError(error);
        return false
      }
      if (selectedCurrency.type == 'token') {
        if (isEmpty(selectedNetwork)) {
          error['network'] = "Select network"
          setError(error);
        } else {
          setCryptoTransfer(true);
        }
      }
      else if (selectedCurrency.type == 'crypto') {
        setCryptoTransfer(true);
      } else if (selectedCurrency.type == 'fiat') {
        console.log("selectedCurrencyselectedCurrency",selectedCurrency, selectedCurrency.virtualAccoutId == undefined || selectedCurrency.virtualAccoutId == "");
        if (selectedCurrency.virtualAccoutId == undefined || selectedCurrency.virtualAccoutId == "") {
          const createAccount = await createVirtualAccount(selectedCurrency.currencySymbol);
          console.log("createAccountcreateAccount",createAccount);
          if (createAccount.status) {
            setSelectedCurrency({...selectedCurrency, ...{
                virtualAccoutId: createAccount.data.id,
                bankDetails: createAccount.data.bankDetails,
                businessId: createAccount.data.businessId
              }
            })
            setBankTransfer(true)
          }
        } else {
          setBankTransfer(true)
        }
      }
    } catch (err) {
      console.log(err, 'handleDeposit___err')
    }
    // if (
    //   selectedCurrency.type == "fiat" &&
    //   (paymentMode?.value === "bankTransfer" ||
    //     paymentMode?.value === "paymentGateway")
    // ) {
    //   setBankTransfer(true);
    // } else if (
    //   (selectedCurrency.type == "token" || selectedCurrency.type == "crypto") &&
    //   paymentMode?.value === "walletTransfer"
    // ) {
    //   setCryptoTransfer(true);
    // } else {
    //   setError("* Select payment type");
    // }
  };

  // useEffect(() => {
  //   setSelectedCurrency(userAsset?.assets?.length > 0 && userAsset?.assets[0]);
  // }, [userAsset]);

  useEffect(() => {
    setError({})
    if (selectedCurrency.type == 'token') {
      let option = []
      selectedCurrency.networkData.map((val) => {
        console.log(val, 'selectedCurrency')
        if (val.depositStatus) {
          let obj = {
            value: val.chainId,
            label: val.chainName
          }
          option.push(obj)
        }
      })
      setnetwotkOption(option)
      setDepositData({})
    } else if (selectedCurrency.type == 'crypto') {
      setDepositData(selectedCurrency.networkData[0])
    } else if (selectedCurrency.type == 'fiat') {
      setDepositData(selectedCurrency.networkData[0])
    }
  }, [selectedCurrency]);

  const handleSelectNetWork = (e) => {
    try {
      console.log(e, 'handleSelectNetWork')
      setselectedNetwork(e)
      let DepositData = selectedCurrency.networkData.find((val) => (val.chainId == e.value))
      setDepositData(DepositData)
    } catch (err) {
      console.log(err, 'handleSelectNetWork__err')
    }
  }
  const customCurrencyRenderer = ({ label, data, value }) => (

    <div
      className="market_select_component netselectstyle px-2"
      onClick={() => {
        handleSelectNetWork(data);
      }}
    >
      <p className="networkname">{label}</p>
      <p className="networkname1">Tron(TRC20)</p>
    </div>
  );
  return (
    <BalanceLayout props={props} tokentype={selectedCurrency} DepositData={DepositData} statustype={"Deposit"} >
      {/*start of  modal */}

      <BankTransfer
        bankTransfer={bankTransfer}
        setShowPaymentProcess={setShowPaymentProcess}
        handleBankTransferClose={handleBankTransferClose}
        data={selectedCurrency}
      />
      <CryptoTransfer
        transferName="Deposit"
        cryptoTransfer={cryptoTransfer}
        handleCryptoTransferClose={handleCryptoTransferClose}
        data={DepositData}
      />
      <PaymentProcess
        showPaymentProcess={showPaymentProcess}
        handlePaymentProcessClose={handlePaymentProcessClose}
      />

      {/*end of  modal */}

      <div className="h-100 d-flex flex-column justify-content-between">
        <div>
          <div>
            <label className="label_txt_sm">Select Currency</label>
            <SelectWithImage
              setSelectedCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
              assetList={userAsset && userAsset?.assets}
            />
          </div>{" "}
          <p className="text-danger mt-2">{error?.currency}</p>
          {selectedCurrency?.type == 'token' ?
            <div className="mt-4">
              <label className="label_txt_sm">Select Network</label>
              <div className="select_lg">
                <Select
                  options={networkOption}
                  className="mt-2"
                  classNamePrefix="custom_rct_slt"
                  placeholder={props.placeholder}
                  isSearchable={true}
                  // components={{ Option: customCurrencyRenderer }}
                  // menuIsOpen={true}
                  // value={
                  //   !props?.paymentMode?.value
                  //     ? { label: "Select", value: "" }
                  //     : props?.paymentMode
                  // }
                  onChange={(e) => handleSelectNetWork(e)}
                />
              </div>
              <p className="text-danger mt-2">{error?.network}</p>
            </div> : ""}
          {selectedCurrency?.type !== 'fiat' &&
            <div>
              <div className="d-flex flex-column mt-2  gap-3">
                <p className="fw-bold"></p>
                {DepositData?.address &&
                  <div className="">
                    <div className="qr_code_wraper w-100 mx-auto my-4">
                      <QRCode
                        size={160}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={DepositData?.address}
                        viewBox={`0 0 160 160`}
                      />
                    </div>

                    <div className="d-flex flex-column w-100 dw_card p-3">
                      <label className="fw-bold">Wallet Address</label>
                      {/* <input
                        type="text"
                        placeholder={DepositData?.address}
                        className="cred_input mt-3"
                        value={DepositData?.address}
                      /> */}
                      <div class="input-group walletcopyinput mb-3">
                        <input
                          type="text"
                          placeholder={DepositData?.address}
                          className="cred_input"
                          value={DepositData?.address}
                        />
                        <CopyToClipboard
                          text={DepositData?.address}
                          onCopy={() => showToastMessage("Wallet address copied !", "success")}
                        >
                          <span class="input-group-text" id="basic-addon2"><FaCopy /></span>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>

                }

              </div>
            </div>
          }
        </div>
        {selectedCurrency.type == 'fiat' &&
          <div className="mt-5 mb-4">
            <button className="grad_btn w-100" onClick={handleDeposit}>
              Continue
            </button>
          </div>
        }
      </div>
    </BalanceLayout>
  );
};

export default Deposit;
