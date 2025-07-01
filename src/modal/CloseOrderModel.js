import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import isEmpty from "is-empty";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const tradeValueData = [
    {
        id: 1,
        title: "Market"
    },
    {
        id: 2,
        title: "Limit"
    }
];
const balbtn = [
    {
        value: 5
    },
    {
        value: 10
    },
    {
        value: 25,
    },
    {
        value: 50,
    },
    {
        value: 75,
    },
    {
        value: 100,
    }
]


const initalFormvalue = {
    price: '',
    percentage: '0',
    quantity: "",
    typeTIF: 'GTC',
    expriy_date: null
}

const tifOptions = [
    {
        value: "GTC", label: "GTC",
    },
    {
        value: "IOC", label: "IOC",
    },
    {
        value: "FOK", label: "FOK",
    },
    {
        value: "GTD", label: "GTD",
    }
]

const CloseOrder = (props) => {
    const dateRef = useRef(null);
    const { marginPair } = useSelector((state) => (state.margin))
    const { futuresPair } = useSelector((state) => (state.futures))
    const { derivativePair } = useSelector((state) => (state.derivative))
    const { show, orderData, onClose, onConfirm, errors, setErrors, tradeType } = props
    console.log(show, orderData, 'CloseOrder', onClose, errors)
    const [formValue, setFormValue] = useState(initalFormvalue)
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [quanPip, setQuanPip] = useState(0)
    // const [errors, setErrors] = useState({})
    const handleTabClick = (getIndex) => {
        console.log("getId", getIndex);
        setCurrentTabIndex(getIndex);
    };

    const handleChange = (e) => {
        try {
            // setErrors({})
            let FormValue = { ...formValue }
            let error = {}
            const { name, value } = e.target
            console.log(name, value, 'handleChange')
            let numbers = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
            if (['price', 'quantity'].includes(name) && !numbers.test(value) && value !== "") {
                return false
            }
            console.log('handleChange', parseFloat(value) > parseFloat(orderData.balanceFilled).toFixed(quanPip))
            if (name == 'quantity' && parseFloat(value) > parseFloat(orderData.balanceFilled).toFixed(quanPip)) {
                console.log('handleChange', name == 'quantity' && value > (orderData.balanceFilled).toFixed(quanPip))
                error['quantity'] = 'Quntity should not be greater remaining quantity'
                // return false

            }
            if (name == 'quantity') {
                let percentage = (parseFloat(value) / orderData.balanceFilled) * 100
                percentage = isNaN(percentage) ? 0 : percentage
                FormValue = { ...FormValue, ['percentage']: (percentage).toFixed(2) }
            }
            FormValue = { ...FormValue, [name]: value }
            console.log(error, 'handleChange')
            setErrors(error)
            setFormValue(FormValue)
        } catch (err) {
            console.log(err, 'handleChange__Err')
        }
    }

    const ChangePercentage = (percentage) => {
        try {
            setErrors()
            let FormValue = { ...formValue }
            let quantity = parseFloat(orderData.balanceFilled) * (parseFloat(percentage) / 100)
            quantity = isNaN(quantity) ? 0 : quantity
            quantity = (quantity).toFixed(quanPip)
            FormValue = { ...FormValue, ['percentage']: percentage, 'quantity': quantity }
            setFormValue(FormValue)
        } catch (err) {
            console.log(err, 'ChangePercentage__Err')
        }
    }

    const ClosingPosition = () => {
        try {
            if (!isEmpty(errors)) {
                return false
            }
            let data = {
                orderType: currentTabIndex == 0 ? 'market' : 'limit',
                percentage: formValue.percentage,
                positionId: orderData._id,
                buyorsell: orderData.buyorsell,
                pairId: orderData.pairId
            }
            if (tradeType == 'futures' && currentTabIndex == 1) {
                data['typeTIF'] = formValue.typeTIF
                data['expriy_date'] = formValue.typeTIF == 'GTD' ? formValue.expriy_date : null
            }
            if (data.orderType == 'limit') {
                data['price'] = formValue.price
            }
            onConfirm(data)
            // return data
        } catch (err) {
            console.log(err, 'ClossingPosition___err')
        }
    }

    useEffect(() => {
        if (!isEmpty(orderData)) {
            let FormValue = { ...formValue }
            FormValue = { ...FormValue, ['price']: orderData.close_price }
            setFormValue(FormValue)
        }
    }, [orderData])

    useEffect(() => {
        if (tradeType == 'margin') {
            setQuanPip(marginPair.firstDecimal)
        } else if (tradeType == 'derivative') {
            setQuanPip(derivativePair.firstDecimal)
        } else if (tradeType == 'futures') {
            setQuanPip(futuresPair.firstDecimal)
        }
    }, [tradeType])
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={show}
                onHide={onClose}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h5 className="mb-0">Close Position Order</h5>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="ml_tabs d-flex align-items-center  gap-3 my-3">
                            {tradeValueData.map((tabs, index) => (
                                <button
                                    key={index}
                                    className={`tk_tab_btn ${currentTabIndex === index ? "active" : ""}`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tabs.title}
                                </button>
                            ))}
                        </div>

                        <div className="ml_content mt-4">
                            {currentTabIndex == 1 ?
                                <div className="ml_price d-flex flex-wrap align-items-center gap-3">
                                    <p className="ml_p">Price :</p>
                                    <div className="position-relative">
                                        <input
                                            className="trade_value_input_wrap_input"
                                            name='price'
                                            value={formValue.price}
                                            onChange={handleChange}
                                        />
                                        <p className="error_text mt-2 ml_error_position">{errors?.price}</p>
                                    </div>
                                </div> : ""}

                            <p className="ml_p mt-4">Select percentage : <span>{formValue?.percentage} %</span></p>
                            {/* <p className="slider_value_p">{formValue?.percentage} %</p> */}
                            <div className="ml_percentage d-flex flex-wrap align-items-center gap-2 mt-3">
                                {balbtn.map((e) => (
                                    <button
                                        className={`tab_grad_btn ${formValue?.percentage === e.value ? 'active' : ''}`}
                                        onClick={() => ChangePercentage(e.value)}>
                                        {e.value}%
                                    </button>
                                ))}

                            </div>
                            <p className="error_text mt-2 mb-0 mb-sm-2">{errors?.percentage}</p>
                            <div className="ml_quantity d-flex flex-wrap align-items-center gap-3">
                                <p className="ml_p">Enter Quantity : </p>
                                <div className="position-relative">
                                    <input
                                        className="trade_value_input_wrap_input"
                                        name='quantity'
                                        value={formValue.quantity}
                                        onChange={handleChange}
                                    />
                                    <p className="error_text mt-2 mb-0 mb-sm-2">{errors?.quantity}</p>
                                </div>
                            </div >
                            {tradeType == 'futures' && currentTabIndex == 1 ?
                                <div className="ml_price d-flex flex-wrap align-items-center gap-3">
                                    <p className="ml_p">TIF :</p>
                                    <div className="position-relative">
                                        <Select
                                            isSearchable={false}
                                            options={tifOptions}
                                            className=""
                                            classNamePrefix="theme_select"
                                            placeholder="Select"
                                            onChange={(e) => {
                                                let FormValue = { ...formValue }
                                                FormValue = { ...FormValue, ['typeTIF']: e.value }
                                                setFormValue(FormValue)
                                            }}
                                            value={!isEmpty(formValue?.typeTIF) ? tifOptions.find((val) => (val.value == formValue?.typeTIF)) : ""}
                                        />
                                        <p className="error_text mt-2 ml_error_position">{errors?.typeTIF}</p>
                                    </div>
                                </div> : ""}
                            {tradeType == 'futures' && formValue.typeTIF == 'GTD' ?
                                <div className="ml_price d-flex flex-wrap align-items-center gap-3">
                                    <p className="ml_p">Select Expire Date :</p>
                                    <div className="position-relative custom_datepicker red_datepicker lmcard_datepicker">
                                        <DatePicker
                                            ref={dateRef}
                                            placeholderText="DD/MM/YYYY "
                                            minDate={new Date().getTime() + 3 * 86400000}
                                            maxDate={new Date().getTime() + 30 * 86400000}
                                            showTimeSelect
                                            selected={
                                                isEmpty(formValue.expriy_date) ? "" : new Date(formValue.expriy_date)
                                            }
                                            onChange={(date) => {
                                                let FormValue = { ...formValue }
                                                FormValue = { ...FormValue, ['expriy_date']: new Date(date).getTime() }
                                                setFormValue(FormValue)
                                            }}
                                            onKeyDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                        />
                                        <p className="error_text mt-2 ml_error_position">{errors?.expriy_date}</p>
                                    </div>
                                </div> : ""}
                            {/* <div className="ml_description">
                                <p className="ml_p">Description : </p>
                                <p className="ml_desc_xs mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div> */}

                        </div >



                        <div className="mt-4 d-flex align-items-center gap-3">
                            <button
                                className="ml_cancel_button"
                                onClick={() => { onClose() }}>
                                Cancel
                            </button>
                            <button
                                className="ml_submit_button"
                                onClick={() => { ClosingPosition() }}
                            >
                                <p>
                                    Submit
                                </p>
                            </button>
                        </div>
                    </div >
                </Modal.Body >
            </Modal >
        </div >
    );
};

export default CloseOrder;
