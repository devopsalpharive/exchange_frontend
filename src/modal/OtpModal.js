import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { showToastMessage } from "../config/toast";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import isEmpty from "is-empty";


const OtpModal = (props) => {
    const numbers = /^\d+$/;
    const { show, handleClose, resendOtp, handleConfirm, isResubmit, errors, setIsResubmit } = props
    const [error, setError] = useState({});
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const close = () => {
        setError({});
        setOtp("");
        handleClose();
    }

    const handleSubmit = async () => {
        try {
            if (isEmpty(otp)) {
                setError({ ...error, 'otp': 'OTP is required' })
                return false
            }
            let result = await handleConfirm(otp)
            if (result) {
                setOtp('')
            }
        } catch (err) {
            console.log(err, '')
        }
    }

    useEffect(() => {
        setError(errors)
    }, [errors])
    return (
        <div>
            {
                console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrr", error)
            }
            <Modal
                centered
                size="md"
                backdrop="static"
                show={show}
                onHide={close}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={close}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h4 className="mb-0 modal_title">OTP Verification</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <p className="text_gray_sm">Enter OTP</p>
                                <div className="custom_otp_input mt-4">
                                    <OtpInput
                                    shouldAutoFocus={true}
                                        value={otp}
                                        onChange={(e) => { setOtp(e) }}
                                        numInputs={6}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.otp}
                            </span>
                        </div>
                        <div className="mt-4">
                            {
                                isResubmit ?
                                    <button
                                        className="grad_btn2 grad_btn "
                                        onClick={() => {
                                            setIsResubmit()
                                            resendOtp()
                                        }}
                                    >
                                        Resend OTP
                                    </button>
                                    :
                                    <button
                                        className="grad_btn2 grad_btn "
                                        onClick={() => { handleSubmit() }}
                                    >
                                        Submit
                                    </button>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OtpModal;
