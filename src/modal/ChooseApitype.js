import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";
import { Images } from "../data/Images";

/** Actions */


const ChooseApitype = (props) => {

  const [apitype, setApitype] = useState("systemkey")
  const closefn = () => {

    props.apitypes(apitype)
    props.handleDeleteAccount();
  }

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
          <h5 className="mb-0">Choose API Key type</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div onClick={() => setApitype("systemkey")} className={`keycard d-flex align-items-center gap-3 mb-3 ${apitype == 'systemkey' && 'active'}`}>
              <div>
                <img src={Images.systemkey} alt="key" className="img-fluid keyimg" />
              </div>
              <div>
                <p className="keyhead">System generated</p>
                <p className="keydesc">Works using HMAC symmetric encryption. An API Key and Secret Key will be provided to you. Please keep these keys secure and treat it like your password. Do not share the keys with any third parties.</p>
              </div>
            </div>
            {/* <div onClick={()=>setApitype("selfkey")} className={`keycard d-flex align-items-center gap-3 mb-3 ${apitype == 'selfkey' && 'active'}`}>
              <div>
                <img src={Images.selfkey} alt="key" className="img-fluid keyimg1" />
              </div>
              <div>
                <p className="keyhead">System generated</p>
                <p className="keydesc">Works using Ed25519 or RSA asymmetric encryption. An API Key will be provided to you and you will have to create your own public-private key pair via software (for example: HUMB Key Generator), and provide the public key to Humb. Please keep the API Key and Private Key secure and treat it like your password. Do not share the API Key or Private Key with any third parties.</p>
              </div>
            </div> */}
          </div>
          <div className="btnsec">
            <button className="grad_btn" onClick={closefn} >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChooseApitype;
