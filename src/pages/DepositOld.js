import React, { useEffect, useState } from "react";
import SelectWithImage from "../components/SelectWithImage";
import SelectWithContent from "../components/SelectWithContent";
import BankTransfer from "../modal/BankTransfer";
import CryptoTransfer from "../modal/CryptoTransfer";
import PaymentProcess from "../modal/PaymentProcess";
import { Images } from "../data/Images";

const networkOptions = [
  { value: "bnb", label: "ERC 20" },
  { value: "ETH", label: "ETH" },
  { value: "CRON", label: "CRON" },
];
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

const DepositOld = () => {
  const [selectCurrencyType, setSelectCurrencyType] = useState("");
  const [paymentMode, setPaymentMode] = useState({});
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cryptoTransfer, setCryptoTransfer] = useState(false);
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: "bep20",
    label: "BEP20",
    img: Images.stakeCoin3,
  });

  const handleBankTransferClose = () => {
    setBankTransfer(false);
    setSelectCurrencyType("");
  };

  const handleCryptoTransferClose = () => {
    setCryptoTransfer(false);
    setSelectCurrencyType("");
  };

  const handlePaymentProcessClose = () => {
    setShowPaymentProcess(false);
  };

  const handleDeposit = () => {
    if (
      (selectCurrencyType === "inr" || selectCurrencyType === "usd") &&
      (paymentMode?.value === "bankTransfer" ||
        paymentMode?.value === "paymentGateway")
    ) {
      setBankTransfer(true);
    } else if (
      (selectCurrencyType === "bep20" ||
        selectCurrencyType === "erc20" ||
        selectCurrencyType === "trc20" ||
        selectCurrencyType === "sol" ||
        selectCurrencyType === "polygon") &&
      paymentMode?.value === "walletTransfer"
    ) {
      setCryptoTransfer(true);
    }
  };

  useEffect(() => {
    if (selectedCurrency) {
      setPaymentMode({});
    }
  }, [selectedCurrency]);

  console.log("selectCurrencyType", selectCurrencyType);

  return (
    <>
      {/*start of  modal */}

      <BankTransfer
        bankTransfer={bankTransfer}
        setShowPaymentProcess={setShowPaymentProcess}
        handleBankTransferClose={handleBankTransferClose}
      />
      <CryptoTransfer
        transferName="Deposit"
        cryptoTransfer={cryptoTransfer}
        handleCryptoTransferClose={handleCryptoTransferClose}
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
              setSelectCurrencyType={setSelectCurrencyType}
              setSelectedCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
            />
          </div>{" "}
          <div className="mt-4">
            <label className="label_txt_sm">Choose Payment Mode</label>
            <SelectWithContent
              options={
                selectCurrencyType == "usd" || selectCurrencyType == "inr"
                  ? paymentOptions
                  : walletTransfer
              }
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              setSelectCurrencyType={setSelectCurrencyType}
            />
          </div>
        </div>
        <div className="mt-5 mb-4">
          <button className="grad_btn w-100" onClick={handleDeposit}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default DepositOld;
