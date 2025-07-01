import React, { useRef, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import Lottie from "lottie-react";
import paymentProcess from "../asset/json/paymentprocess.json";
import { useSelector } from "react-redux";
import { resendWithdraw2faCode, userWithdrawal } from "../actions/withdrawAction";
import { showToastMessage } from "../config/toast";
import { Link } from "react-router-dom";
import isEmpty from "is-empty";
import { encryptObject } from "../lib/CryptoJs";
import countryList from 'react-select-country-list'
/** Actions */

const WithdrawFiat = (props) => {
    const numbersRegex = /^-?(?:\d+(\.\d*)?|\.\d+)$/;
    const numbers = /^\d+$/;
    const htmlTagPattern = /<[^>]*>/; // Matches any HTML tag


    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
        setCountry(value)
    }

    const { getUser } = useSelector((state) => state.user);
    const { show, handleClose, data } = props;
    const [walletAddress, setWalletAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [amountAfterFee, setAmountAfterFee] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBankAccount, setSelectedBankAccount] = useState({});
    const [code, setCode] = useState("");
    const [showCode, setShowCode] = useState(false);

    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [holderName, setHolderName] = useState("");
    const [iban, setIban] = useState("");
    const [bic, setBic] = useState("");
    const [routingCodeValue, setRoutingCodeValue] = useState("");
    const [error, setError] = useState({});

    console.log("WithdrawFiat_selectedCurrency", selectedBankAccount, data);


    const close = () => {
        // setWalletAddress("");
        setAmount("");
        setAmountAfterFee(0);
        setIsLoading(false);
        setShowCode(false);
        setCode("");
        setAddress("");
        setPostalCode("");
        setCity("");
        setAccountNumber("")
        setError({})
        handleClose();
        setHolderName("");
        setAddress("");
    }

    const userWithdraw = async () => {
        try {
            setIsLoading(true)
            const payload = {
                code: code,
                type: data?.type,
                userId: getUser?.userId,
                currency: data?.currencyId,
                coin: data?.currencySymbol,
                amount: amount,
                amountWithfee: amountAfterFee,
                address: walletAddress,
                accountNumber: accountNumber,
                line1: address,
                city: city,
                postalCode: postalCode,
                country: country?.value ? country?.value : "",
                holderName: holderName,
                iban: iban,
                bic: bic
            }
            // let token = encryptObject(payload, getUser.secretKey)
            // let reqData = { token: token }
            // const withdraw = await userWithdrawal(payload);


            const withdraw = await userWithdrawal(payload, getUser.secretKey);
            console.log("withdraw_userWithdraw", payload);

            if (withdraw.success) {
                showToastMessage(withdraw.message, 'success')
                if (withdraw?.status == "OTP") {
                    setIsLoading(false);
                    setShowCode("OTP")
                    return
                }
                // showToastMessage(withdraw.data.message, 'success')
                setIsLoading(false)
                close()
            } else {
                setIsLoading(false)
                withdraw?.message && showToastMessage(withdraw?.message, 'error')
                setError(withdraw?.errors)
                if (withdraw?.errors?.otp == "OTP is Expired") {
                    setIsLoading(false);
                    setError(withdraw?.errors)
                    setShowCode("RESEND");
                    return
                }


            }
        } catch (e) {
            console.log("userWithdraw_err", e);
        }
    }
    const withdrawFeeReducer = async (value) => {
        try {
            if (value > 0) {
                // const fee = parseFloat(value) * parseFloat(data?.withdrawalFee) / 100;
                const fee = parseFloat(data?.withdrawalFee)
                setAmountAfterFee(parseFloat(value) + parseFloat(fee))
            }
        } catch (e) {
            console.log("withdrawFeeReducer_err", e);
        }
    }

    const resendCode = async () => {
        try {
            const resend = await resendWithdraw2faCode();
            if (resend.status) {
                setShowCode("OTP");
                showToastMessage(resend.data.message, 'success')
            } else {
                resend?.error?.message && showToastMessage(resend.error.message, 'error')
            }
        } catch (e) {
            console.log("resendCode_err", e);
        }
    }


    const HandleClose = () => {
        try {
            setAmount('')
            setAmountAfterFee('')
            handleClose()
        } catch (err) {
            console.log(err, 'HandleClose__err')
        }
    }
    return (
        <div>
            <Modal
                centered
                size="md"
                backdrop="static"
                show={show}
                onHide={() => { close() }}
                className="custom_modal"
            >
                <button
                    className="d-flex align-items-center justify-content-center modal_close_button"
                    onClick={() => { close() }}
                >
                    <IoClose />
                </button>
                <Modal.Header closeButton>
                    <h5 className="mb-0">Withdraw Fiat {data?.currencySymbol}</h5>
                </Modal.Header>
                <Modal.Body className="bank_modal_md">
                    <div>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">Amount</label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-9  d-flex align-items-center">
                                                <input type="text" className="w-100" value={amount} onChange={(e) => {
                                                    console.log(numbersRegex.test(e.target.value), "numbersRegex.test(e.target.value)")
                                                    if (numbersRegex.test(e.target.value) || e.target.value == "") {
                                                        setError({})
                                                        setAmount(e.target.value);
                                                        withdrawFeeReducer(e.target.value)
                                                    }
                                                }} />
                                            </div>
                                            <div className="col-3 px-0 d-flex justify-content-center align-items-center label_orange_wraper">
                                                <p className="">{data?.currencySymbol}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className='text-danger'>{error?.amount}</span>


                                </div>
                            </div>
                            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">Bank Account Number</label>

                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-12  d-flex align-items-center">
                                                <input type="text" className="w-100" value={accountNumber} onChange={(e) => {
                                                    if (!htmlTagPattern.test(e.target.value)) {
                                                        setAccountNumber(e.target.value)
                                                    }

                                                }}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.accountNumber}
                                    </span>
                                    {/* <input type="text" className="h-100 w-100 px-2" onChange={(e) => { setWalletAddress(e.target.value) }} /> */}
                                    {/* <div className="coin_select dw_coin_slt"> */}
                                    {/* <div className="mt-2">
                                        {
                                            getUser && getUser?.bankAccounts?.length > 0 ?
                                                <Select
                                                    options={getUser?.bankAccounts}
                                                    isSearchable={false}
                                                    placeholder="Select Bank"
                                                    classNamePrefix="custom_rct_slt"
                                                    onChange={(e) => { setSelectedBankAccount(e) }}
                                                /> :
                                                <Link
                                                    to="/myprofile"
                                                    className="grn_grd_btn text-decoration-none text-center"
                                                >
                                                    Add Bank Account
                                                </Link>

                                        }

                                    </div> */}

                                </div>
                            </div>
                        </div>

                        <div className="wallet_balance_wrap mt-4 d-flex align-items-center justify-content-center">
                            <p>
                                Wallet Balance : <span>{data?.balance} {data?.currencySymbol}</span>
                            </p>
                        </div>


                        <p className="mt-4 fw-bold">Bank Details</p>

                        <div className="row mt-2">
                            <div className="col-12 col-sm-6">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        Bank Accout Holdername
                                    </label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-12  d-flex align-items-center">
                                                <input type="text" className="w-100" value={holderName} onChange={(e) => {
                                                    if (!htmlTagPattern.test(e.target.value)) {
                                                        setHolderName(e.target.value)
                                                    }
                                                }} />
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.holderName}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        Bank Address
                                    </label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-12  d-flex align-items-center">
                                                <input type="text" className="w-100" value={address} onChange={(e) => {
                                                    if (!htmlTagPattern.test(e.target.value)) {
                                                        setAddress(e.target.value)
                                                    }

                                                }} />
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.line1}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3">

                            <div className="col-12 col-sm-6">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        City
                                    </label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-12  d-flex align-items-center">
                                                <input type="text" className="w-100" value={city} onChange={(e) => {
                                                    if (!htmlTagPattern.test(e.target.value)) {
                                                        setCity(e.target.value)
                                                    }

                                                }} />
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.city}
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        Postal Code
                                    </label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-12  d-flex align-items-center">
                                                <input type="text" className="w-100" value={postalCode} onChange={(e) => {
                                                    if (!htmlTagPattern.test(e.target.value)) {
                                                        setPostalCode(e.target.value)
                                                    }
                                                }} />
                                            </div>

                                        </div>
                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.postalCode}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="row mt-3">
                            <div className="col-12 col-sm-6 ">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        Country
                                    </label>
                                    <div className="">
                                        <Select className=""
                                            classNamePrefix="custom_rct_slt" options={options} value={value} onChange={changeHandler} />


                                    </div>
                                    <span className="text-danger f-12 d-block text-left mt-2">
                                        {error?.country}
                                    </span>
                                </div>
                            </div>
                            {
                                (data?.currencySymbol == 'EUR' || data?.currencySymbol == "USD") ?
                                    <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                        <div className="d-flex flex-column">
                                            <label className="label_orange">
                                                IBAN
                                            </label>
                                            <div className="input_label_wraper mt-2">
                                                <div className="row mx-auto h-100">
                                                    <div className="col-12  d-flex align-items-center">
                                                        <input type="text" className="w-100" value={iban} onChange={(e) => {
                                                            if (!htmlTagPattern.test(e.target.value)) {
                                                                setIban(e.target.value)
                                                            }
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="error_text mt-2">
                                                {error?.iban}
                                            </span>
                                        </div>
                                    </div> : <></>
                            }

                        </div>
                        <div className="row mt-3">

                            {
                                data?.currencySymbol == 'USD' &&
                                <div className="col-12 col-sm-6">
                                    <div className="d-flex flex-column">
                                        <label className="label_orange">
                                            BIC
                                        </label>
                                        <div className="input_label_wraper mt-2">
                                            <div className="row mx-auto h-100">
                                                <div className="col-12  d-flex align-items-center">
                                                    <input type="text" className="w-100" value={bic} onChange={(e) => {
                                                        if (!htmlTagPattern.test(e.target.value)) {
                                                            setBic(e.target.value)
                                                        }
                                                    }} />
                                                </div>

                                            </div>
                                        </div>
                                        <span className="error_text mt-2">
                                            {error?.bic}
                                        </span>
                                    </div>

                                </div>
                            }
                            {
                                data.currencySymbol == 'AUD' &&
                                <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                    <div className="d-flex flex-column">
                                        <label className="label_orange">
                                            Routing Code Value
                                        </label>
                                        <div className="input_label_wraper mt-2">
                                            <div className="row mx-auto h-100">
                                                <div className="col-12  d-flex align-items-center">
                                                    <input type="text" className="w-100" value={routingCodeValue} onChange={(e) => {
                                                        if (!htmlTagPattern.test(e.target.value)) {
                                                            setRoutingCodeValue(e.target.value)
                                                        }
                                                    }} />
                                                </div>

                                            </div>
                                        </div>
                                        <span className="error_text mt-2">
                                            {error?.routingCodeValue}
                                        </span>
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="row mt-3">
                            <div className="col-12 col-sm-6">
                                <div className="d-flex flex-column">
                                    <label className="label_orange">
                                        Withdraw Amount With Fee
                                    </label>
                                    <div className="input_label_wraper mt-2">
                                        <div className="row mx-auto h-100">
                                            <div className="col-9  d-flex align-items-center">
                                                <input type="text" className="w-100" value={amountAfterFee} />
                                            </div>
                                            <div className="col-3 px-0 d-flex justify-content-center align-items-center label_orange_wraper">
                                                <p className="">{data?.currencySymbol}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                // (showCode == "OTP" || showCode == "RESEND") &&
                                <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                                    <div className="d-flex flex-column">
                                        <label className="label_orange">
                                            OTP
                                        </label>
                                        <div className="input_label_wraper mt-2">
                                            <div className="row mx-auto h-100">
                                                <div className="col-12  d-flex align-items-center">
                                                    <input type="text" className="w-100" value={code}
                                                        onChange={(e) => {
                                                            if (numbers.test(e.target.value) || e.target.value == "") {
                                                                setCode(e.target.value);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-danger f-12 d-block text-left mt-2">
                                            {error?.otp}
                                        </span>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="mt-4 ">
                            {isLoading ?
                                <button className="grad_btn w-100">Loading...</button>
                                :
                                showCode == "RESEND" ?
                                    <button className="grad_btn w-100" onClick={() => { resendCode() }}>Resend Code</button>
                                    : <button className="grad_btn w-100" disabled={amount == ""} onClick={() => { userWithdraw() }}>Withdraw</button>
                            }
                        </div>
                        <div className="mt-4">
                            <p className="label_orange">Notes</p>
                            <div className="notes_p mt-2">
                                <p>1. Maximum withdraw limit {data?.maximumWithdrawal} {data?.currencySymbol}</p>
                                <p>2. Minimum withdraw limit {data?.minimumWithdrawal} {data?.currencySymbol}</p>
                                <p>
                                    3. Submit your withdraw your received mail can approve (or)
                                    cancel
                                </p>
                                <p>4. Your withdraw is pending means after approved by admin only collect the amount.</p>
                                {/* <p>
                  4. After 2 minutes your withdraw not completed automatically
                  cancelled and then amount will be updated
                </p> */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default WithdrawFiat;
