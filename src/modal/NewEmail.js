import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { IoClose } from "react-icons/io5";
import { updateUserEmail } from "../actions/userAction";
import { showToastMessage } from "../config/toast";
import { useSelector } from "react-redux";

const NewEmail = (props) => {
    const { getUser } = useSelector((state) => state.user);

    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const [checked, setChecked] = useState("");
    const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag


    const close = () => {
        setError({}); setEmail("")
        props.handleClose();
    }
    const updateEmail = async () => {
        try {
            if (checked) {
                const profile = await updateUserEmail({ newEmail: email }, getUser?.secretKey);
                if (profile.status) {
                    showToastMessage(profile.message, 'success')
                    close()

                } else {
                    setError(profile.errors);
                    profile.message && showToastMessage(profile.message, 'error')
                }
            } else {
                setError({ check: "* Terms and condition is required." });
            }

        } catch (e) {
            console.log("updateProfile_err", e);
        }
    }


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
                    <h4 className="mb-0 modal_title">Enter New Email</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12 mb-3">
                                <p className="text_gray_sm">Enter email address</p>
                                <input type="text" className="modal_input w-100 mt-2" placeholder="Enter a email address" value={email} onChange={(e) => {
                                    if (!htmlTagPattern.test(e.target.value)) {
                                        setEmail(e.target.value)
                                    }
                                }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.newEmail}
                            </span>
                            <div className="col-12 mb-3">
                                <div className='security_card'>
                                    <ul className='secu_sec px-2 list-unstyled mb-0'>
                                        <li>
                                            <p className='secu_desc '> 1. You must Verify your new Email Address by clicking the Confirmation Link sent to your New Email. This Step is Mandatory to complete the Email Change Process.</p>
                                        </li>
                                        <li>
                                            <p className='secu_desc '> 2. Your Email Address will not be updated until you have Confirmed the New Email Address. Ensure you check your New Email & Complete the Verification Promptly.</p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                3. If you no longer have access to your Current Email Address, please contact our Customer Support Team for Assistance. (Additional Verification may be required.)
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                4. Ensure that the New Email Address you provide is Valid & Active. Incorrect or Invalid Email Addresses will not receive the Confirmation Link.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                5. If you do not receive the Confirmation Email, please check your Spam or Junk Folder. You can request to resend the Confirmation Email if necessary.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                6. For your Account's Security, ensure that the New Email Address is not shared with Unauthorized Individuals. The Email change process includes Verification Steps to protect your Account.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                7. Once you click the Confirmation Link & Follow the Instructions, your Email Address should be updated immediately. You will receive a Notification confirming the Update.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                8. If you did not receive the Confirmation Email, please request a Resend from this Screen.
                                            </p>

                                        </li>
                                        <li>
                                            <p className='secu_desc'>
                                                9. If you encounter any Issues or need further Assistance, please Contact our Customer Support Team.
                                            </p>

                                        </li>
                                    </ul>


                                </div>

                            </div>
                            <div className='col-12'>
                                <div className='wv_card mt-3 d-flex align-items-center gap-2 mb-3'>
                                    <label class="checkbox_container">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => {
                                                setChecked(e.target.checked);
                                            }}
                                        />
                                        <span class="checkbox_checkmark"></span>
                                    </label>
                                    <p>By checking this box, all existing API Key(s) on your master account and sub-accounts will be subject to Default Security Controls</p>

                                </div>
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.check}
                            </span>
                        </div>
                        <div className="mt-4">
                            <button className="grad_btn2 grad_btn " onClick={() => { updateEmail() }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NewEmail;
