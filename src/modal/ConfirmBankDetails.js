import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";

import ModalInput from "../components/ModalInput";

const ConfirmBankDetails = ({ confirmBank, handleConfirmBankClose }) => {
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={confirmBank}
        onHide={(cancel) => handleConfirmBankClose(false)}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={(cancel) => handleConfirmBankClose(false)}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Confirm Bank Details</h5>
        </Modal.Header>
        <Modal.Body>
          <div
            className="
          "
          >
            <div className="d-flex flex-column align-items-start gap-3">
              <div className="row">
                <div className="col-10 col-sm-5">
                  <p className="fw-bold">Bank Name </p>
                </div>
                <div className="col-2 col-sm-1 d-none d-sm-block">
                  <p className="fw-bold ">:</p>
                </div>
                <div className="col-12 col-sm-6">
                  <p>xyz Junction Limited</p>
                </div>
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Bank Code</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  <p>XYZ0000027</p>
                </div>{" "}
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Account Number </p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  <p>40101011042102</p>
                </div>{" "}
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Holder Name</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  <p>John Doe</p>
                </div>
                <div className="col-10 col-sm-5 mt-3">
                  <p className="fw-bold">Account Type</p>
                </div>
                <div className="col-1 mt-3 d-none d-sm-block">
                  <p className="fw-bold">:</p>
                </div>
                <div className="col-12 col-sm-6 mt-sm-3">
                  <p>Savings</p>
                </div>
              </div>
            </div>

            <div>
              <button
                className="grad_btn grad_btn2 mt-5"
                onClick={(success) => handleConfirmBankClose(true)}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmBankDetails;
