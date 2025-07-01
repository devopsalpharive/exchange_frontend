import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { newMobileOtp, updateMobileNumber, updateUserEmail } from "../actions/userAction";
import { showToastMessage } from "../config/toast";
import PhoneInput from "react-phone-input-2";
const Changemailnumber = (props) => {
    const { getUser } = useSelector((state) => state.user);

    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [mobileNumber, setMobileNumber] = useState(0);
    const [otp, setOtp] = useState("");


    const close = () => {
        setError({}); setEmail("")
        props.handleClose();
    }

    const getNewOtp = async () => {
        try {
            const getData = await newMobileOtp({ mobileNumber: mobileNumber, countryCode: countryCode }, getUser.secretKey);
            if (getData.status) {
                showToastMessage(getData.message, 'success');
            } else {
                setError(getData.errors)
                getData?.message && showToastMessage(getData.message, 'error');
            }
        } catch (e) {
            console.log("getNewOtp_err", e);
        }
    }

    const updateMobile = async () => {
        try {
            const getData = await updateMobileNumber({ mobileNumber: mobileNumber, countryCode: countryCode, otp: otp },getUser.secretKey);
            if (getData.status) {
                showToastMessage(getData.message, 'success');
                close();
            } else {
                console.log("getData.errorgetData.error", getData);
                setError(getData.errors)
                getData?.message && showToastMessage(getData.message, 'error');
            }
        } catch (e) {
            console.log("getNewOtp_err", e);
        }
    }

    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={props.show}
                // show={true}
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
                    <h4 className="mb-0 modal_title">{props.type == "email" ? "Email Change" : "Phone Number Change"}</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <p className="text_gray_sm">{props.type == "email" ? "New Email" : "New Phone Number"}</p>
                                {/* <input
                                    type={props.type == "email" ? "text" : "number"}
                                    className="modal_input w-100 mt-2"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} /> */}
                                <div className="d-flex flex-wrap gap-3 align-items-end mt-3 mt-lg-2 mt-xxl-3 ">
                                    <div className="custom_phone_input phone_input_sm flex-grow-1">
                                        <PhoneInput
                                            countryCodeEditable={false}
                                            placeholder="Enter Phone Number"
                                            country={"us"}
                                            onChange={(value, event) => {
                                                const { dialCode } = event;
                                                let newPhoneNo = value
                                                console.log("PHONE INPUTS", value, event);
                                                setMobileNumber(newPhoneNo.slice(dialCode.length));
                                                setCountryCode(dialCode);
                                            }}
                                        />

                                    </div>
                                    <button
                                        // className="login_button_lg"
                                        className="grad_button_xs"
                                        onClick={() => { getNewOtp() }}>Get Code</button>
                                </div>{" "}
                                <span className="text-danger f-12 d-block text-left mt-2">
                                    {error?.mobileNumber}
                                    {error?.countryCode}
                                </span>
                            </div>

                            <div className="col-12">
                                <p className="text_gray_sm">Enter Otp</p>
                                <div class="input-group ">
                                    <input type="number" className="modal_input w-100 px-0" placeholder="Enter Otp" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                        onChange={(e) => { setOtp(e.target.value) }} />
                                    {/* <span class="input-group-text" id="basic-addon2" onClick={() => { getNewOtp() }}>Get Code</span> */}
                                </div>
                                <span className="text-danger f-12 d-block text-left mt-2">
                                    {error?.otp}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="grad_btn2 grad_btn "
                                onClick={() => { updateMobile() }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Changemailnumber;
