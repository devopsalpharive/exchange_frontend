import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Images } from "../data/Images";

/** Config */
import { priceConversion } from "../config/lib";
import BankTransfer from "../modal/BankTransfer";
import CryptoTransfer from "../modal/CryptoTransfer";
import PaymentProcess from "../modal/PaymentProcess";
import WalletTransfer from "../modal/WalletTransfer";
import WithdrawCrypto from "../modal/WithdrawCrypto";
import WithdrawFiat from "../modal/WithdrawFiat";
import { FaBoxOpen } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import isEmpty from "is-empty";
import { toCutOff } from "../lib/Calculationlib";


const MyAssetTable = (props) => {
  console.log("MyAssetTable_props", props.data);
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cryptoTransfer, setCryptoTransfer] = useState(false);
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [isWalletTransfer, setIsWalletTransfer] = useState(false);
  const [showWithdrawCrypto, setShowWithdrawCrypto] = useState(false);
  const [showWithdrawFiat, setShowWithdrawFiat] = useState(false);
  const handleBankTransferClose = () => {
    setBankTransfer(false);
  };

  const handleCryptoTransferClose = () => {
    setCryptoTransfer(false);
  };

  const handlePaymentProcessClose = () => {
    setShowPaymentProcess(false);
  };
  const handleCloseWalletTransfer = () => {
    setIsWalletTransfer(false);
    props.handleCloseWalletTransfer();
  };

  const handleCloseWithdrawCrypto = () => {
    setShowWithdrawCrypto(false);
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
        <h5 className="h5_text_lg mb-0">My Asset</h5>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="asset_search d-flex align-items-center gap-2">
            <FiSearch />
            <input placeholder="Search..." onChange={(e) => { props.onSearch(e.target.value) }} />
          </div>
          <div className="asset_separate d-none d-sm-block">
          </div>
          <div className="asset_checkbox d-flex align-items-center gap-2">
            <div style={{ marginBottom: "2px" }}>
              <label class="checkbox_container">
                <input type="checkbox"
                  onChange={(e) => { props.onHideZero(e.target.checked) }}
                />
                <span class="checkbox_checkmark"></span>
              </label>
            </div>

            <p className="asset_checkbox_p">
              Hide zero balance
            </p>
          </div>
        </div>
      </div>
      <div className="custom_table custom_table_min_wid">
        {/* start of modal import */}

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
          data={selectedCurrency}
        />

        <PaymentProcess
          showPaymentProcess={showPaymentProcess}
          handlePaymentProcessClose={handlePaymentProcessClose}
        />

        <WalletTransfer
          show={isWalletTransfer}
          handleClose={handleCloseWalletTransfer}
          data={selectedCurrency}
        />
        <WithdrawCrypto
          show={showWithdrawCrypto}
          handleClose={handleCloseWithdrawCrypto}
          data={selectedCurrency}
        />
        <WithdrawFiat
          show={showWithdrawFiat}
          handleClose={() => {
            setShowWithdrawFiat(false);
          }}
          data={selectedCurrency}
        />

        {/* end of modal import */}

        <div className="custom_tableWrap ">
          <table className="table">
            <thead>
              <tr>
                <th className="text-start mw_150">Coin </th>
                <th className="text-center mw_160">Main</th>
                <th className="text-center mw_160">Spot</th>
                <th className="text-center">Margin</th>
                <th className="text-center mw_160">Margin Holding</th>
                {/* <th className="text-center">Derivative</th>
                <th className="text-center">Futures</th> */}
                <th className="text-center mw_130">Action</th>
              </tr>
            </thead>
            <tbody>

              {props.data.length > 0 ?
                props.data.map((record) => (

                  <tr>
                    <td className="mw_150">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={isEmpty(record.currencyImage) ? (Images.stakeCoin8) : record.currencyImage}
                          alt="coin"
                          className="img-fluid table_coin_img"
                        />
                        <div className="d-flex flex-column align-items-start">
                          <h6 className="mb-1 h6_550">{record.currencyName}</h6>
                          {/* <p className="desc sub_desc">{record.chain}</p> */}
                        </div>
                      </div>
                    </td>
                    <td className="mw_160">
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.balance), record?.pip)}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.convertBalance), (record?.pip))} {record?.convertCurrency}</p>
                      </div>
                    </td>
                    <td className="mw_160">
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.spotBalance), (record?.pip))}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.spotConvertBalance), (record?.pip))} {record?.convertCurrency}</p>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.marginBalance), (record?.pip))}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.marginConvertBalance), (record?.pip))} {record?.convertCurrency}</p>
                      </div>
                    </td>
                    <td className="mw_160">
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.marginHolding), (record?.pip))}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.marginHoldingConvert), (record?.pip))} {record?.convertCurrency}</p>
                      </div>
                    </td>
                    {/* <td>
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.derivativeBalance),(record?.pip))}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.derivativeConvertBalance),(record?.pip))} {record.convertCurrency}</p>
                      </div>
                    </td> */}
                    {/* <td>
                      <div className="d-flex flex-column align-items-center">
                        <h6 className="mb-1 h6_550">{toCutOff((record?.futuresBalance),(record?.pip))}</h6>
                        <p className="desc sub_desc">~~ {toCutOff((record?.futuresConvertBalance),(record?.pip))} {record.convertCurrency}</p>
                      </div>
                    </td> */}
                    <td className="mw_130">
                      <div className="d-flex flex-column align-items-center">
                        <button className="gray_btn" onClick={() => { setSelectedCurrency(record); setIsWalletTransfer(true); }}>Transfer</button>
                      </div>
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td className="text-center" colSpan={5}>
                    {" "}
                    <div className="d-flex align-items-center justify-center flex-column gap-3 nodata_text">
                      <FaBoxOpen fontSize={35} />
                      No Data Found
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
};

export default MyAssetTable;
