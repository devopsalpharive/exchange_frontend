import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { IoClose } from "react-icons/io5";
import { updateUserEmail } from "../actions/userAction";
import { showToastMessage } from "../config/toast";

const Emailverification = (props) => {

    const [error, setError] = useState({});
    const [email, setEmail] = useState("");


    const close = () => {
        setError({}); setEmail("")
        props.handleClose();
    }
    const updateEmail = async () => {
        try {

            const profile = await updateUserEmail({ newEmail: email });
            if (profile.status) {
                showToastMessage(profile.data.message, 'success')
                close()

            } else {
                setError(profile.error.errors);
                profile.error.message && showToastMessage(profile.error.message, 'error')
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
                    <h4 className="mb-0 modal_title">Email Verification</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <p className="text_gray_sm">Email</p>
                                <input type="text" className="modal_input w-100 mt-2" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.newEmail}
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
