import React, { act, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const MarketLimit = (props) => {

    const { show, handleClose } = props

    const [activeTabs, setActiveTabs] = useState('Market');
    const [choosenPercentage, setChoosenPercentage] = useState(25)


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
                    <h5 className="mb-0">Market Limit</h5>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="ml_tabs d-flex align-items-center  gap-3 my-3">
                            <button
                                className={`tk_tab_btn ${activeTabs == 'Market' ? "active" : ""}`}
                                onClick={() => setActiveTabs('Market')}>Market</button>
                            <button
                                className={`tk_tab_btn ${activeTabs == 'Limit' ? "active" : ""}`}
                                onClick={() => setActiveTabs('Limit')}>Limit</button>
                        </div>

                        {activeTabs === "Market" ? <div className="ml_content mt-4">
                            <p className="ml_p">Select percentage :</p>
                            <div className="ml_percentage d-flex align-items-center gap-2 my-2">
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 25 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(25)}>25</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 50 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(50)}>50</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 75 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(75)}>75</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 100 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(100)}>100</button>

                            </div>
                            <div className="ml_quantity d-flex flex-wrap align-items-center gap-3">
                                <p className="ml_p">Enter Quantity : </p>
                                <input className="trade_value_input_wrap_input " />
                            </div>
                            <div className="ml_description">
                                <p className="ml_p">Description : </p>
                                <p className="ml_desc_xs mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>

                            </div>

                        </div> : <div className="ml_content mt-4">
                            <p className="ml_p">Select percentage :</p>
                            <div className="ml_percentage d-flex align-items-center gap-2 my-2">
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 25 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(25)}>25</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 50 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(50)}>50</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 75 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(75)}>75</button>
                                <button
                                    className={`tab_grad_btn ${choosenPercentage === 100 ? 'active' : ''}`}
                                    onClick={() => setChoosenPercentage(100)}>100</button>

                            </div>
                            <div className="ml_quantity d-flex flex-wrap align-items-center gap-3">
                                <p className="ml_p">Enter Quantity : </p>
                                <input className="trade_value_input_wrap_input " />
                            </div>
                            {/* <div className="ml_description">
                                <p className="ml_p">Description : </p>
                                <p className="ml_desc_xs mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div> */}

                        </div>}


                        <div className="mt-4 d-flex align-items-center gap-3">
                            <button className="ml_cancel_button"> Cancel</button>
                            <button
                                className="ml_submit_button"
                            >
                                <p>
                                    Submit
                                </p>
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MarketLimit;
