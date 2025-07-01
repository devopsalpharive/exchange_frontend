import React, { useEffect, useState } from "react";
import SelectWithImage from "../components/SelectWithImage";
import SelectWithContent from "../components/SelectWithContent";
import BankTransfer from "../modal/BankTransfer";
import CryptoTransfer from "../modal/CryptoTransfer";
import PaymentProcess from "../modal/PaymentProcess";
import ConfirmBankDetails from "../modal/ConfirmBankDetails";
import SuccessTransfer from "../modal/SuccessTransfer";
import { Images } from "../data/Images";
import BalanceLayout from "../Layout/BalanceLayout";
import { useSelector } from "react-redux";
import Select from "react-select";
import WithdrawCrypto from "../modal/WithdrawCrypto";
import WithdrawFiat from "../modal/WithdrawFiat";
import { isEmpty } from "../lib/isEmpty";
import Acknowledgement from "../modal/Acknowledgement";


const Withdraw = (props) => {
  const { getUser, userAsset } = useSelector((state) => state.user);

  const [selectCurrencyType, setSelectCurrencyType] = useState("");
  const [paymentMode, setPaymentMode] = useState({});
  const [confirmBank, setConfirmBank] = useState(false);
  const [isSuccessTransfer, setIsSuccessTransfer] = useState(false);
  const [cryptoTransfer, setCryptoTransfer] = useState(false);

  const [networkOption, setnetwotkOption] = useState({});
  const [DepositData, setDepositData] = useState("");
  const [selectedNetwork, setselectedNetwork] = useState({});
  const [error, setError] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState([]);

  const [showWithdrawCrypto, setShowWithdrawCrypto] = useState(false);
  const [showWithdrawFiat, setShowWithdrawFiat] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [amountData, setAmountData] = useState({})
  useEffect(() => {
    setError({});
    if (selectedCurrency.type == "token") {
      let option = [];
      selectedCurrency.networkData.map((val) => {
        console.log(val, "selectedCurrency");
        if (val.withdrawStatus) {
          let obj = {
            value: val.chainId,
            label: val.chainName,
          };
          option.push(obj);
        }
      });
      setnetwotkOption(option);
      setDepositData({})
    } else if (selectedCurrency.type == "crypto") {
      setDepositData({
        ...selectedCurrency.networkData[0],
        balance: selectedCurrency.balance,
      });
    } else if (selectedCurrency.type == "fiat") {
      setDepositData({
        ...selectedCurrency.networkData[0],
        balance: selectedCurrency.balance,
      });
    }
  }, [selectedCurrency]);

  console.log("select_userAsset", userAsset);

  const handleCryptoTransferClose = () => {
    setCryptoTransfer(false);
    setSelectCurrencyType("");
  };

  const handleWithdraw = () => {
    try {

      let error = {};
      if (isEmpty(selectedCurrency)) {
        error["currency"] = "please select currency";
        setError(error);
        return false;
      }
      if (selectedCurrency.type == "token") {
        if (isEmpty(selectedNetwork)) {
          error["network"] = "Select network";
          setError(error);
        } else {
          handleShowWithdrawCrypto();
        }
      } else if (selectedCurrency.type == "crypto") {
        handleShowWithdrawCrypto();
      } else if (selectedCurrency.type == "fiat") {
        setShowWithdrawFiat(true);
      }
    } catch (err) {
      console.log(err, "handleWithdraw__err");
    }
    // if (
    //   selectedCurrency.type === "fiat" &&
    //   (paymentMode?.value === "bankTransfer" ||
    //     paymentMode?.value === "paymentGateway")
    // ) {
    //   setConfirmBank(true);
    // } else if (
    //   (selectedCurrency.type == "token" || selectedCurrency.type == "crypto") &&
    //   paymentMode?.value === "walletTransfer"
    // ) {
    //   setCryptoTransfer(true);
    // }
  };

  const handleConfirmBankClose = (getValue) => {
    setConfirmBank(false);
    console.log("getValue", getValue);
    if (getValue) {
      setIsSuccessTransfer(true);
    }
  };

  const handleSuccessTransfer = () => {
    setIsSuccessTransfer(false);
  };

  const handleSelectNetWork = (e) => {
    try {
      console.log(e, "handleSelectNetWork");
      setselectedNetwork(e);
      let DepositData = selectedCurrency.networkData.find(
        (val) => val.chainId == e.value
      );
      setDepositData({ ...DepositData, balance: selectedCurrency.balance });
    } catch (err) {
      console.log(err, "handleSelectNetWork__err");
    }
  };

  const handleShowWithdrawCrypto = () => {
    setShowWithdrawCrypto(true);
  };

  const handleCloseWithdrawCrypto = () => {
    setShowWithdrawCrypto(false);
    setisSubmit(false)
    setShowAcknowledgement(false)
  };

  // useEffect(() => {
  //   setSelectedCurrency(userAsset?.assets?.length > 0 && userAsset?.assets[0]);
  // }, [userAsset]);
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

  const handleCloseAcknowledgement = () => {
    setisSubmit(false);
    setShowAcknowledgement(false);
  };

  const handleShowAcknowledgement = (content) => {
    try {
      setShowAcknowledgement(true);
      setAmountData(content)
      // setAcknowledgementContent(content);
    } catch (err) {
      console.log(err, "");
    }
  };
  return (
    <BalanceLayout props={props} tokentype={selectedCurrency} DepositData={DepositData} statustype={"Withdraw"}>
      {/* start of modal */}
      {/* <ConfirmBankDetails
        confirmBank={confirmBank}
        handleConfirmBankClose={handleConfirmBankClose}
        data={selectedCurrency}
      />
      <CryptoTransfer
        transferName="withdraw"
        cryptoTransfer={cryptoTransfer}
        handleCryptoTransferClose={handleCryptoTransferClose}
        data={selectedCurrency}
      />
      <SuccessTransfer
        isSuccessTransfer={isSuccessTransfer}
        handleSuccessTransfer={handleSuccessTransfer}
      /> */}
      <Acknowledgement
        show={showAcknowledgement}
        // show={true}

        handleClose={() => {
          handleCloseAcknowledgement();
        }}
        content="Please check your wallet address ,the fund will be withdraw to this address"
        onOkay={() => {
          setisSubmit(true);
          setShowAcknowledgement(false)
        }}
        data={DepositData}
        amountData={amountData}
      />
      <WithdrawCrypto
        isSubmit={isSubmit}
        show={showWithdrawCrypto}
        handleClose={handleCloseWithdrawCrypto}
        handleShowAcknowledgement={(content) => {
          handleShowAcknowledgement(content);
        }}
        data={DepositData}
      />
      <WithdrawFiat
        show={showWithdrawFiat}
        handleClose={() => {
          setShowWithdrawFiat(false);
        }}
        data={DepositData}
      />
      {/* end of modal */}
      <div className="h-100 d-flex flex-column justify-content-between">
        <div>
          <div>
            <label className="label_txt_sm">Select Currency</label>
            <SelectWithImage
              setSelectCurrencyType={setSelectCurrencyType}
              setSelectedCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
              assetList={userAsset && userAsset?.assets}
            />
          </div>{" "}
          <p className="text-danger mt-2">{error?.currency}</p>
          {selectedCurrency.type == "token" ? (
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
              {/* <SelectWithContent
                options={
                  selectCurrencyType == "usd" || selectCurrencyType == "inr"
                    ? paymentOptions
                    : walletTransfer
                }
                paymentMode={paymentMode}
                setPaymentMode={setPaymentMode}
                setSelectCurrencyType={setSelectCurrencyType}
              // setPaymentMode={setPaymentMode}
              // setSelectCurrencyType={setSelectCurrencyType}
              /> */}
            </div>
          ) : (
            ""
          )}
          {/* <div className="mt-4">
            <label className="label_txt_sm">Withdraw address</label>
            <SelectWithContent options={addressOptions} />
          </div> */}

        </div>
        <div className="mt-5 mb-4">
          <button className="grad_btn w-100" onClick={handleWithdraw}>
            Continue
          </button>
        </div>
      </div>{" "}
    </BalanceLayout>
  );
};

export default Withdraw;
