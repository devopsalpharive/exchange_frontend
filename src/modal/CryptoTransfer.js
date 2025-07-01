import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { IoClose } from "react-icons/io5";
import { Images } from "../data/Images";

const CryptoTransfer = (props) => {
  const fileRef = useRef(null);
  console.log("CryptoTransfer_daa", props);
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.cryptoTransfer}
        onHide={props.handleCryptoTransferClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleCryptoTransferClose}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Wallet Transfer ( {props?.data?.currencySymbol} )</h5>
        </Modal.Header>
        <Modal.Body>
          <div
            className="
          "
          >
            <div className="d-flex flex-column  gap-3">
              <p className="fw-bold"></p>
              <div className="qr_code_wraper w-100 mx-auto my-4">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={props?.data?.address}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="d-flex flex-column w-100">
                <label className="fw-bold">Wallet Address</label>
                <input
                  type="text"
                  placeholder={props?.data?.address}
                  className="cred_input mt-3"
                  value={props?.data?.address}
                />
              </div>
              <p className="mt-3">
                1. This is a {props?.data?.currencySymbol} address only {props.transferName} this {props?.data?.currencySymbol} Coin.
              </p>
              <p className="mt-1">
                2. Your {props.transferName} will be reflected inside your
                account  "After receiving 1 confirmation" on the blockchain.
              </p>
              <p className="mt-3">
                3. Deposit fee {props.data.depositFee} will be detect from the deposited amount
              </p>
            </div>

            {/* <div>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={props.handleCryptoTransferClose}
              >
                Submit
              </button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CryptoTransfer;
