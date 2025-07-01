import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";

import ModalInput from "../components/ModalInput";

const UserDeposit = (props) => {
    const { show, handleClose } = props
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={show}
                onHide={handleClose}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={handleClose}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h5 className="mb-0">Amount</h5>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="my-4"
                    >
                        <input className="trade_value_input_wrap border-0 outline-0 w-100" placeholder="Amount" onChange={(e) => { props.setAmount(e.target.value) }} />

                        <div>
                            <button
                                className="grad_btn grad_btn2 mt-5"
                                onClick={handleClose}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserDeposit;
