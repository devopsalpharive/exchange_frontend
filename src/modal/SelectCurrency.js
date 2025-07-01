import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { Images } from "../data/Images";



const SelectCurrency = (props) => {



  return (
    <div>
      <Modal
        centered
        size="md"
        backdrop="static"
        show={props.show}
        // show={true}
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
          <h4 className="mb-0 modal_title">Select Currency</h4>
        </Modal.Header>
        <Modal.Body className="custom_modal_body">

          <div className="mt-4">

            <div className="search_bar_icon_container">
              <LuSearch fontSize={20} />
              <input />
            </div>

            <div className="all_currency_listed_container ">
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button className="active">
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button >
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
              <div className="each_currency_container">
                <div className="left">
                  <div className="currency_image_wrapper">
                    <img src={Images.kh6} />
                  </div>
                  <div>
                    <p className="bold_text">USDC</p>
                    <p className="light_text">USD Coin</p>
                  </div>
                </div>
                <div className="right">
                  <button>
                    <IoIosStar />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </Modal.Body>
      </Modal>
    </div >
  );
};

export default SelectCurrency;
