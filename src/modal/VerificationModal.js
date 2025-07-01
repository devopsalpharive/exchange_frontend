import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";


const VerificationModal = (props) => {

    const { show, handleClose } = props

    return (
        <div>
            <Modal
                centered
                size="lg"
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
                    <h5 className="mb-0">Verification</h5>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Verification modal
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default VerificationModal;
