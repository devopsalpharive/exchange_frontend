import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { IoClose } from "react-icons/io5";
import Select from 'react-select'
import { Images } from "../data/Images";



const RiskManagement = (props) => {

    const { handleChange, errors, riskManagemantValidation, handleClose, formValue } = props

    const closeModel = () => {
        const isValid = riskManagemantValidation()
        if (isValid) {
            handleClose()
        }
    }
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
                    <h4 className="mb-0 modal_title">Risk Management</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="bt_modal_body">
                        <div className="bt_input_section">
                            <label className="bt_label mb-2">Stop loss (0-90)</label>
                            <div className='am_input_section'>
                                <input placeholder='Stop loss (0-90)' name="stopLoss" onChange={handleChange} value={formValue?.stopLoss} />
                                <div className='am_amount_type'>
                                    %
                                </div>
                            </div>
                            <p className="bt_error text-danger">{errors && errors?.stopLoss}</p>
                        </div>
                        <div className="bt_input_section mt-4" >
                            <label className="bt_label mb-2">Take profit (0-90)</label>
                            <div className='am_input_section'>
                                <input placeholder='Take profit (0-90)' name="takeProfit" onChange={handleChange} value={formValue?.takeProfit} />
                                <div className='am_amount_type'>
                                    %
                                </div>
                            </div>
                            <p className="bt_error text-danger">{errors && errors?.takeProfit}</p>
                        </div>
                        <div className="bt_input_section mt-4" >
                            <label className="bt_label mb-2">Maximum follow amount</label>
                            <div className='am_input_section'>
                                <input placeholder='500' onChange={handleChange} name="maxAllowAmount" value={formValue?.maxAllowAmount} />
                                <div className='am_amount_type'>
                                    USDT
                                </div>
                            </div>
                            <p className="bt_error text-danger">{errors && errors?.maxAllowAmount}</p>
                        </div>
                        <div className="mt-4">
                            <button className="login_button_lg w-100" onClick={closeModel}>Confirm</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
};

export default RiskManagement;
