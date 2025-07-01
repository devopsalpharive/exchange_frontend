import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";
import { Images } from "../data/Images";
import { PiSealWarningFill } from "react-icons/pi";

/** Actions */


const Selfkey = (props) => {

  const [apitype, setApitype] = useState("systemkey")
  // const closefn =() =>{

  //    props.apitypes(apitype)
  //    props.handleDeleteAccount();
  // }

  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.show}
        onHide={props.handleDeleteAccount}
        className="custom_modal apimodal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={props.handleDeleteAccount}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Upload public key</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 mb-3">
              <p className="text_gray_sm">Your public key</p>
              <input type="text" className="modal_input w-100 mt-2"
              // value={email}
              //  onChange={(e) => { setEmail(e.target.value) }} 
              />
            </div>{" "}
            <span className="text-danger f-12 d-block text-left mt-2">
              {/* {error?.newEmail} */}
            </span>
            <div className="col-12 mb-3">
              <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3'>
                <PiSealWarningFill fill='#ff602e' fontSize={25} />
                <p>The RSA public key needs to comply with the PEM format.</p>

              </div>

            </div>
          </div>
          <div className="btnsec d-flex gap-2 justify-content-center w-100">
           
            <button className="grad_btn" onClick={props.handleDeleteAccount} >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Selfkey;
