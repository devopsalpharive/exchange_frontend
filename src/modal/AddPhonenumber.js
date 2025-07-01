import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";

/** Actions */
import { closeAccount, userLogout } from "../actions/userAction";
import { showToastMessage } from "../config/toast";

const AddPhonenumber = (props) => {



  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.show}
        onHide={props.handleDeleteAccount}
        className="custom_modal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleDeleteAccount}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Add Phone Number</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3 d-flex flex-column">
            <div className="px-3">
              <div className="row">
                <div className="col-12">
                  <p className="text_gray_sm">Number</p>
                  <input type="number" className="modal_input w-100 mt-2" 
                  // value={email} onChange={(e) => { setEmail(e.target.value) }} 
                  />
                </div>{" "}
                <span className="text-danger f-12 d-block text-left mt-2">
                  {/* {error?.newEmail} */}
                </span>
              </div>
            
            </div>

            <div className="d-flex align-items-center justify-content-end gap-3 mt-5">
              <button
                className=" grad_btn4 "
                onClick={props.handleDeleteAccount}
              >
                Back
              </button>
              {/* <Link to="/"> */}
              <button
                className=" red_grad_btn3  "
                onClick={props.handleDeleteAccount}
              >
                Add
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddPhonenumber;
