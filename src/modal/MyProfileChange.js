import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";

import ModalInput from "../components/ModalInput";

const MyProfileChange = (props) => {
  const { heading, modalHeading, modalSubHeading, placeholder, type } =
    props.profileData;
  console.log("propss", modalHeading, modalSubHeading);
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.showProfileModal}
        onHide={props.handleProfileModalClose}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleProfileModalClose}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">{modalHeading}</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3 d-flex flex-column">
            <label>{heading}</label>
            <ModalInput placeholder={placeholder} type={type} />
            <div>
              <button
                className="grad_btn grad_btn2 mt-4"
                onClick={props.handleProfileModalClose}
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

export default MyProfileChange;
