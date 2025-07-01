import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import { IoClose } from "react-icons/io5";

const Acknowledgement = (props) => {

    const { show, handleClose, content, onOkay, data, amountData } = props
    console.log("Acknowledgement_props", data, amountData);
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={show}
                onHide={handleClose}
                className="custom_modal backdrop_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={handleClose}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    {/* <h4 className="mb-0 modal_title">Acknowledgement</h4> */}
                    <h4 className="mb-0 modal_title">Withdrawal Details Confirmation</h4>

                </Modal.Header>
                <Modal.Body>
                    <div>
                        {/* <p>{content}</p> */}

                        <div className="ack_balance_details mt-2">
                            <p className="text-center">Receiving Amount</p>
                            <h2 className="text-center fw-bold">{amountData?.amount} <span>{data?.currencySymbol}</span></h2>
                        </div>
                        <div className="ack_value_details mt-3">
                            <div className="row mx-auto">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Address
                                    </label>
                                </div>
                                <div className="col-12  col-sm-9 px-0">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {amountData?.address}
                                    </p>
                                </div>
                                <div className="col-12 px-0">
                                    <p className="ack_value_details_hglt text-start text-sm-end">This address has not been saved in withdrawal address list</p>
                                </div>
                            </div>
                            <div className="row mx-auto mt-3">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Network
                                    </label>
                                </div>
                                <div className="col-12  col-sm-9 px-0">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {data?.chainName}
                                    </p>
                                </div>
                                <div className="col-12 px-0">
                                    <p className="ack_value_details_hglt_gray text-start text-sm-end">{data?.networkName}</p>
                                </div>
                            </div>
                            <div className="row mx-auto mt-3">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Trading Pair
                                    </label>
                                </div>
                                <div className="col-9 px-0">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {data?.currencySymbol}
                                    </p>
                                </div>

                            </div>
                            <div className="row mx-auto mt-3">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Amount
                                    </label>
                                </div>
                                <div className="col-9 px-0 ">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {amountData?.amount}
                                    </p>
                                </div>

                            </div>
                            <div className="row mx-auto mt-3">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Amount With Fee
                                    </label>
                                </div>
                                <div className="col-9 px-0 ">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {amountData?.amountWithfee}
                                    </p>
                                </div>

                            </div>
                            <div className="row mx-auto mt-3">
                                <div className="col-12 col-sm-3 ps-0">
                                    <label className="gray_label">
                                        Network Fee
                                    </label>
                                </div>
                                <div className="col-9 px-0">
                                    <p className="text-start text-sm-end mb-0 ack_value_p">
                                        {data?.withdrawalFee}
                                    </p>
                                </div>

                            </div>
                            <p className="mt-3 ack_value_details_hglt">
                                Please make sure to verify the accuracy of the withdrawal address and transfer network to prevent the loss of your assets
                            </p>
                        </div>
                        <div className="mt-3 d-flex align-items-center gap-3">
                            <button className="grn_grd_btn w-100" onClick={() => { onOkay() }}>Confirm Withdrawal</button>
                            {/* <button className="grn_grd_btn">Close</button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Acknowledgement;
