import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Synaps from "@synaps-io/react-verify";

import { IoClose } from "react-icons/io5";

import ModalInput from "../components/ModalInput";
import { Link } from "react-router-dom";

const LaunchpadBuyModal = (props) => {
    const { show, handleClose, type, id } = props
    console.log(show, handleClose, type, id, 'IndividualModal')
    const handleShowUserDeposit = () => {
        setUserDeposit(true);
    };
    const handleCloseUserDeposit = () => {
        setError({});
        setAmount(0);
        setUserDeposit(false);
    };
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={userDeposit}
                onHide={handleCloseUserDeposit}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={handleCloseUserDeposit}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h5 className="mb-0 model_head_grad">Buy {state?.tokenName}</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <div className="mt-2 d-flex flex-column">
                            {/* <label className="label_orange">
                  Token Address
                </label> */}
                            <input
                                type="number"
                                placeholder="Amount"
                                className="trade_value_input_wrap border-0 outline-0 w-100 mt-2"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                            <div
                                className={`d-flex flex-wrap gap-2 align-items-center mt-3 ${amount > 0
                                    ? "justify-content-between"
                                    : "justify-content-end"
                                    }`}
                            >
                                {!isEmpty(amount) && amount > 0 && (
                                    <p className="white_text_xs ">{`${amount} ${state?.currency
                                        } : ${parseFloat(amount) * parseFloat(state?.presaleRate)
                                        } ${state?.tokenSymbol}`}</p>
                                )}

                                <p className="green_text_xs ">
                                    Balance : {asset?.balance} {state?.currency}
                                </p>
                            </div>
                            <span className="text-danger f-12 d-block text-left mt-2">
                                {errors?.amount}
                            </span>
                            <div className="row mt-4">
                                <div className="col-12 col-sm-5 ">
                                    <p className=" label_gray ">Token Address </p>
                                </div>
                                <div className="col-12 col-sm-7 mt-2 mt-sm-0 ">
                                    <p className="white_text_sm">
                                        {state?.contractAddress?.substring(0, 25)}....
                                    </p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 col-sm-5 ">
                                    <p className="label_gray">Status</p>
                                </div>
                                <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                                    <p className="white_text_sm">
                                        {state?.launchStatus}{" "}
                                        <img
                                            src={Images.activeicon}
                                            className="img-fluid"
                                            alt="active"
                                            style={{ width: "12px" }}
                                        />
                                    </p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 col-sm-5">
                                    <p className="label_gray">Minimum Buy</p>
                                </div>
                                <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                                    <p className="white_text_sm">{`${state?.minimum} ${state?.currency}`}</p>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 col-sm-5">
                                    <p className="label_gray">Maximum Buy</p>
                                </div>
                                <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                                    <p className="white_text_sm">{`${state?.maximum} ${state?.currency}`}</p>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-12 col-sm-5">
                                    <p className="label_gray">You Purchased</p>
                                </div>
                                <div className="col-12 col-sm-7 mt-2 mt-sm-0">
                                    <p className="white_text_sm">{`${userContribution?.userSaleOfLaunch
                                        ? userContribution?.userSaleOfLaunch
                                        : 0
                                        } ${state?.currency}`}</p>
                                </div>
                            </div>

                            {/* <input className="trade_value_input_wrap border-0 outline-0 w-100 mt-2" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} /> */}
                            {/* <span className="text-danger f-12 d-block text-left mt-2">
           error
              </span> */}
                        </div>
                        {/* <input className="trade_value_input_wrap border-0 outline-0 w-100" placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} /> */}
                        {/* <span className="text-danger f-12 d-block text-left mt-2">
                {errors?.amount}
              </span> */}
                        <div>
                            <button
                                className="grad_btn grad_btn2 mt-5"
                                onClick={userPartispate}
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

export default LaunchpadBuyModal;
