import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { updateUserEmail, userLogin, verifyMobileNumberOtp, verifyOldMobileOtp } from "../actions/userAction";
import { showToastMessage } from "../config/toast";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import OtpInput from 'react-otp-input';
import Countdown, { zeroPad } from "react-countdown";
import { useSelector } from "react-redux";

const OtpVerification = (props) => {
    const navigate = useNavigate();
    const { getUser } = useSelector((state) => state.user);
    const numbers = /^\d+$/;
    const { location, data, show } = props
    const [error, setError] = useState({});
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResubmit, setIsResubmit] = useState(false);
    const [expireIn, setExpireIn] = useState(Date.now() + 60000);

    const close = () => {
        setError({}); setOtp("");
        setIsResubmit(false);
        props.handleClose();
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        // console.log(completed, 'renderer')
        if (completed) {
            // Render a completed state
            setIsResubmit(true)
            setError({})
        } else {
            return <span className="">
                {zeroPad(minutes)}m : {zeroPad(seconds)}s
            </span>
        }
    }

    const verifyNumber = async () => {
        try {
            if (otp == "") {
                setError({ otp: "OTP is Required." });
                return false
            }
            setIsLoading(true)
            const verify = await verifyMobileNumberOtp({ countryCode: data?.countryCode, mobileNumber: data?.mobileNumber, otp: otp });
            console.log("getOtpgetOtpgetOtp", verify);
            if (verify.status) {
                setIsLoading(false)
                props.verified(true)
                showToastMessage(verify.data.message, 'success')
                close()
            } else {
                setIsLoading(false)
                setError(verify.data.error)
                verify?.data?.message && showToastMessage(verify.data.message, 'error')
            }
        } catch (e) {
            console.log("verifyNumber_err", e);
        }
    }

    const verifyLogin = async () => {
        try {
            if (otp == "") {
                setError({ otp: "OTP is Required." });
                return false
            }
            setIsLoading(true)
            const getData = await userLogin({ email: data?.email, password: data?.password, loginHistory: data?.loginHistory, otp }, "verifyLoginOTP");
            console.log("getDatagetData", getData);
            if (getData.status) {
                setIsLoading(false)
                showToastMessage(getData.message, 'success')
                const badge = document.querySelector('.grecaptcha-badge');
                if (badge) {
                    badge.style.visibility = 'hidden';
                }
                navigate("/wallet");
            } else {
                if (getData?.error?.otp == "OTP is Expired") {
                    setIsResubmit(true)
                }
                setIsLoading(false)
                setError(getData.error)
                getData?.message && showToastMessage(getData.message, 'error')
            }
        } catch (e) {
            console.log("verifyLogin_err", e);
        }
    }

    const validOldOtp = async () => {
        try {
            if (otp == "") {
                setError({ otp: "OTP is Required." });
                return false
            }
            const getData = await verifyOldMobileOtp({ otp: otp }, getUser.secretKey);
            console.log("validOldOtpvalidOldOtp", getData);
            if (getData.status) {
                showToastMessage(getData.message, 'success')
                props.newOtpModel();
                close();
            } else {
                setError(getData.errors)
                getData?.message && showToastMessage(getData.message, 'error')
            }
        } catch (e) {
            console.log("validOldOtp_err", e);
        }
    }
    console.log("OtpVerification_datadatadatadatda", data, isResubmit);

    useEffect(() => {
        // if (isResubmit == true) {
        //     setExpireIn(Date.now() + 60000)
        // }
        console.log(isResubmit, "isResubmit");
        if (show) {
            console.log('useEffect')
            setIsResubmit(false);
            setExpireIn(Date.now() + (5 * 60000))
        }
        setIsResubmit(false);
    }, [show])

    return (
        <div>

            <Modal
                centered
                size="md"
                backdrop="static"
                show={props.show}
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
                    {
                        props?.type?.toUpperCase() == "2FA" ?
                            <h4 className="mb-0 modal_title">Enter the authenticate code</h4>
                            :
                            <h4 className="mb-0 modal_title">OTP Verification for {props?.type?.toUpperCase()}</h4>
                    }
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault() }}>

                        <div className="kyc_verify_card mx-auto">
                            <div className="row">
                                <div className="col-12">
                                    <p className="text_gray_sm">Enter OTP</p>
                                    {/* <input type="text" className="modal_input w-100 mt-2" value={otp} onChange={(e) => {
                                    if (numbers.test(e.target.value) || e.target.value == "") {
                                        setOtp(e.target.value)
                                    }
                                }} /> */}
                                    <div className="custom_otp_input mt-4 ">
                                        <OtpInput
                                            shouldAutoFocus={true}
                                            value={otp}
                                            onChange={(e) => { setOtp(e) }}
                                            numInputs={6}
                                            // renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />

                                    </div>
                                    <div className="d-flex flex-wrap align-items-center gap-1 mt-3 otp_verification_timer">
                                        <p className="otp_verification_timer_text">
                                            {props.type == "2fa" ? "Enter your google authendicate code." : "We've send a code to"}&nbsp;

                                            {
                                                props.type == "2fa" ? "" : props.type == "email" ? `${props?.data?.email.slice(0, 4)}xxxxxx${props?.data?.email.slice(-3)}` :
                                                    `${props?.data?.mobileNumber?.slice(0, 4)}xxxxxx${props?.data?.mobileNumber?.slice(-2)}`
                                            }

                                        </p>
                                        &nbsp;
                                        {
                                            (props.type == "email" && isResubmit == false) &&
                                            <div className="otp_verification_timer_countdown ">
                                                <Countdown
                                                    date={expireIn}
                                                    renderer={renderer}
                                                />
                                            </div>
                                        }

                                    </div>
                                </div>{" "}
                                <span className="text-danger f-12 d-block text-left mt-2">
                                    {error?.mobileNumber}
                                    {error?.errors}
                                    {error?.otp}
                                </span>
                            </div>
                            <div className="mt-4">
                                {console.log("isResubmitisResubmit", isResubmit)}
                                {
                                    location == "/login" ?
                                        isResubmit ?
                                            <button type='submit' className="grad_btn2 grad_btn " onClick={() => {
                                                setOtp("");
                                                props.resendOtp();
                                                setIsResubmit(false);
                                                setExpireIn(Date.now() + 5 * 60000)
                                                setError({})
                                            }}>
                                                Resend OTP
                                            </button>
                                            :
                                            <button type='submit' className="grad_btn2 grad_btn" disabled={isLoading} onClick={() => { setError({}); verifyLogin() }}>
                                                {isLoading ? "Loading..." : "Submit"}
                                            </button> :
                                        location == "/number-management" ?
                                            <button type='submit' className="grad_btn2 grad_btn " onClick={() => { setError({}); validOldOtp() }}>
                                                Submit
                                            </button>
                                            :
                                            <button type='submit' className="grad_btn2 grad_btn " onClick={() => { setError({}); verifyNumber() }}>
                                                Submit
                                            </button>
                                }
                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OtpVerification;
