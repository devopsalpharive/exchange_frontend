import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";

import Lottie from "lottie-react";
import paymentProcess from "../asset/json/paymentprocess.json";

const PaymentProcess = (props) => {
  const fileRef = useRef(null);
  const [chooseFile, setChooseFile] = useState("No File Chosen");

  const handleFileChoosen = () => {
    fileRef.current.click();
  };

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.showPaymentProcess}
        onHide={props.handlePaymentProcessClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handlePaymentProcessClose}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Payment Process</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <Lottie
              animationData={paymentProcess}
              loop={true}
              className="payment_process_json"
            />
            <h5 className="fw-bold">Process Your Payment</h5>
            <h5 className="fw-bold">This may take up to 15-30 minutes</h5>
            <p className="mt-3 desc sub_desc text-center">
              As soon as it's verified, the deposit will be credited to your{" "}
              Coinswitch wallet
            </p>
            <p className="mt-5 desc sub_desc text-center fw-bold">
              Note: Any payment done from a non-registered ID will be refunded{" "}
              in 7 working days
            </p>
            <div>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={props.handlePaymentProcessClose}
              >
                Okay
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentProcess;
