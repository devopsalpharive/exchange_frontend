import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";

import ModalInput from "../components/ModalInput";

const ConfirmModal = ({ confirmShow, handleClose,handleCancel,orderId }) => {
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={confirmShow}
        onHide={() => handleClose(false)}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => handleClose(false)}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Acknowledgement</h5>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex flex-column align-items-center">
            {/* <h5 className="fw-bold">Confirm Modal</h5> */}
            {/* <h5 className="fw-bold">This may take up to 15-30 minutes</h5> */}
            <p className="mt-3 text-center">
             Are you want to cancel this order
            </p>
            <div className="d-flex align-items-center gap-4">
            <button
                className="grad_btn grad_btn2 mt-4"
                onClick={()=>{handleClose()}}
              >
                Cancel
              </button>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={()=>{handleCancel(orderId)}}
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

export default ConfirmModal;
