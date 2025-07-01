import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { IoClose } from "react-icons/io5";
import { updateUserProfile } from "../actions/userAction";
import { showToastMessage } from "../config/toast";

const ProfileName = (props) => {
    const { data } = props
    const alfaRegex = /^[a-zA-Z]*$/

    console.log("ProfileName_data", data);
    const [firstName, setFirstName] = useState(data?.firstName);
    const [lastName, setLastName] = useState(data?.lastName);
    const [error, setError] = useState({});
   

    const updateProfile = async () => {
        try {
            const formData = new FormData()
            formData.append("type", "name")
            formData.append("firstName", firstName)
            formData.append("lastName", lastName)
            const profile = await updateUserProfile(formData);
            if (profile.status) {
                showToastMessage(profile.data.message, 'success')
                props.handleClose();
            } else {
                setError(profile.error.errors);
                profile.error.message && showToastMessage(profile.error.message, 'error')
            }
        } catch (e) {
            console.log("updateProfile_err", e);
        }
    }

    useEffect(() => {
        setFirstName(data?.firstName)
        setLastName(data?.lastName)
    }, [data])
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={props.show}
                onHide={props.handleClose}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={props.handleClose}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h4 className="mb-0 modal_title">Update Profile</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="kyc_verify_card mx-auto">
                        <div className="row">
                            <div className="col-12">
                                <p className="text_gray_sm">First Name</p>
                                <input type="text" maxLength="20" className="modal_input w-100 mt-2" value={firstName} onChange={(e) => {
                                    if (alfaRegex.test(e.target.value) || e.target.value == '') {
                                        setFirstName(e.target.value)
                                    }
                                }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.firstName}
                            </span>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className="text_gray_sm">Last Name</p>
                                <input type="text" maxLength="20" className="modal_input w-100 mt-2" value={lastName} onChange={(e) => {
                                    if (alfaRegex.test(e.target.value) || e.target.value == '') {
                                        setLastName(e.target.value)
                                    }
                                }} />
                            </div>{" "}
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {error?.lastName}
                            </span>
                        </div>
                        <div className="mt-4">
                            <button className="grad_btn2 grad_btn " onClick={() => { updateProfile() }}>
                                Update
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProfileName;
