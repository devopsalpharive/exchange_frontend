import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";

import Lottie from "lottie-react";
import paymentProcess from "../asset/json/paymentprocess.json";

const SuccessTransfer = (props) => {
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.isSuccessTransfer}
        onHide={props.handleSuccessTransfer}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleSuccessTransfer}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Payment Success</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <Lottie
              animationData={paymentProcess}
              loop={true}
              className="payment_process_json"
            />
            <h5 className="fw-bold">Successful</h5>
            <h5 className="fw-bold">This may take up to 15-30 minutes</h5>
            <p className="mt-3 desc sub_desc text-center">
              Your withdraw request is completed and should reflect in your
              account in few minutes
            </p>

            <div>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={props.handleSuccessTransfer}
              >
                Done
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessTransfer;
