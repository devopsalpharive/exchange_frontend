import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";

/** Actions */
import { closeAccount, userLogout } from "../actions/userAction";
import { showToastMessage } from "../config/toast";

const DeleteAccount = (props) => {

  const [showPrompt, setShowPrompt] = useState(true)
  const [person, setPerson] = useState("")
  const [error, setError] = useState("")
  const accountClose = async () => {
    try {
      if (person == "I AM CONFIRM") {
        const userAccountclose = await closeAccount(props?.data?.secretKey);
        console.log("userAccountcloseuserAccountclose", props?.data?.secretKey, userAccountclose);
        if (userAccountclose.status) {
          showToastMessage(userAccountclose.message, "success");
          props.handleDeleteAccount()
          userLogout()
        } else {
          showToastMessage(userAccountclose.message, "success")
        }
      } else if (person !== "I AM CONFIRM") {
        setError("* Please enter a valid key")
      } else {
        setError("* Field is required")
      }
    } catch (e) {
      console.log("accountCloset_err", e);
    }
  };

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.showDeleteAccount}
        onHide={props.handleDeleteAccount}
        className="custom_modal">
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => { setPerson(""); props.handleDeleteAccount(); setError(""); }}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Close Account</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3 d-flex flex-column">
            <label>Are you sure want to delete your account ?</label>

            <div className={`mt-3 ${showPrompt ? "d-block" : "d-none"}`}>
              <p className="mdl_text_opc">
                To confirm the closure of your account, please type ' I AM CONFIRM ' in the box below. Once confirmed, your account will be permanently deactivated, and you will lose access to all associated data and services
              </p>
              <input
                className="mdl_custom_input mt-3 w-100"
                placeholder="Enter deactivation key"
                value={person}
                onChange={(e) => { setError(""); setPerson(e.target.value) }}
              />
              <p className=" error_text mt-2">{error}</p>
            </div>

            <div className="d-flex align-items-center justify-content-end gap-3 mt-5">
              <button
                className=" grad_btn4 "
                onClick={() => { setError(""); setPerson(""); props.handleDeleteAccount() }}
              >
                Back
              </button>
              {/* <Link to="/"> */}
              <button
                className=" red_grad_btn3  "
                onClick={() => { setError(""); accountClose() }}
              >
                Close
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
