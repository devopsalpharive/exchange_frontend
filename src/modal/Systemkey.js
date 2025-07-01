import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import OtpInput from 'react-otp-input';
import { showToastMessage } from "../lib/toast";
/** Actions */
import { CreateNewKey } from "../actions/ApikeyAction";

const Systemkey = (props) => {
  const { handleDeleteAccount, setKeyList } = props
  const [apitype, setApitype] = useState("systemkey")
  const [error, setError] = useState({})
  const [name, setName] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState('')

  const handleSubmit = async () => {
    try {
      let data = {
        name: name,
        otp: otp
      }
      const { status, success, message, result, error } = await CreateNewKey(data)
      if (success) {
        if (status == "OTP") {
          showToastMessage(message, "success");
          setShowOtp(true)
        } else if (success) {
          showToastMessage(message, "success");
          setKeyList(result)
          handleClose()
        } else if (!success) {
          showToastMessage(message, "error");
          setError(error)
        }
      }
    } catch (err) {
      console.log(err, 'handleSubmit__err')
    }
  }

  const handleClose = () => {
    try {
      setShowOtp(false)
      setOtp('')
      setName('')
      handleDeleteAccount()
    } catch (err) {
      console.log(err, 'handleClose__err')
    }
  }
  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.show}
        onHide={() => { handleClose() }}
        className="custom_modal apimodal"
      >
        <button
          className="d-flex align-items-center justify-content-center modal_close_button"
          onClick={() => { handleClose() }}
        >
          <IoClose />
        </button>
        <Modal.Header closeButton>
          <h5 className="mb-0">Create API</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 mb-3">
              <p className="text_gray_sm">Label API Key to proceed</p>
              <input
                type="text"
                className="modal_input w-100 mt-2"
                name='name'
                value={name}
                onChange={(e) => {
                  setError({})
                  setName(e.target.value)
                }}
              />
            </div>{" "}
            <span className="text-danger f-12 d-block text-left mt-2">
              {error?.name}
            </span>
            {showOtp ? <div className="row">
              <div className="col-12">
                <p className="text_gray_sm">Enter OTP</p>
                <div className="custom_otp_input mt-4">
                  <OtpInput
                    shouldAutoFocus={true}
                    value={otp}
                    onChange={(e) => { setOtp(e) }}
                    numInputs={6}
                    // renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </div>{" "}
              <span className="text-danger f-12 d-block text-left mt-2">
                {error?.otp}
              </span>
            </div> : ''}
          </div>
          <div className="btnsec d-flex gap-2 justify-content-center w-100">
            <button className="grad_btn" onClick={() => { handleClose() }} >
              Cancel
            </button>
            <button
              className="grad_btn"
              onClick={() => { handleSubmit() }}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Systemkey;
