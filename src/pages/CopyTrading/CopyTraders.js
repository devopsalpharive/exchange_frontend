import React, { useEffect, useState } from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import CopyTradingPairs from '../../modal/CopyTradingPairs'
import RiskManagement from '../../modal/RiskManagement'
import isEmpty from 'is-empty'
import { useNavigate, useLocation } from 'react-router-dom'
import { requestCopier } from '../../actions/copyTradeAction'
import { useSelector } from "react-redux";
import { showToastMessage } from '../../lib/toast'

const CopyTraders = (props) => {

    const initialValue = {
        investAmount: 0,
        investType: "amount",  // amount || percen
        investPercen: "",
        maxAllowAmount: "",
        takeProfit: "",
        stopLoss: "",
        tradePairs: [],
        strategyId: ""
    }
    const navigate = useNavigate()
    const { state } = useLocation()
    const { getUser } = useSelector((state) => state.user);
    const { pairList } = useSelector((state) => state.pairList);

    const [investedType, setInvestedType] = useState('fixedAmount')
    const [showSelectPairs, setShowSelectPairs] = useState(false)
    const [showRiskManagement, setShowRiskManagement] = useState(false)
    const [formValue, setFormValue] = useState(initialValue)
    const [pairCollections, setPairCollections] = useState([])
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleShowSelectPairs = () => {
        setShowSelectPairs(true)
    }

    const handleCloseSelectPairs = () => {
        setShowSelectPairs(false)
    }

    const handleShowRiskManagement = () => {
        setShowRiskManagement(true)
    }

    const handleCloseRiskManagement = () => {
        setShowRiskManagement(false)
    }




    const handleOnchange = (event) => {
        let numbersRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        const { value, name } = event.target
        if (["investAmount", "stopLoss", "takeProfit", "maxAllowAmount"].includes(name) && !numbersRegex.test(value) && value !== "") {
            return false
        }
        setError({})
        setFormValue({ ...formValue, ...{ [name]: value } })
    }

    console.log("formValueformValue_formValue", state);

    const riskManagemantValidation = () => {
        try {
            let error = {}
            if (isEmpty(formValue.takeProfit)) {
                error.takeProfit = "Take profit field is required"
            } if (isEmpty(formValue.stopLoss)) {
                error.stopLoss = "Stop loss field is required"
            } if (isEmpty(formValue.maxAllowAmount)) {
                error.maxAllowAmount = "Max Allow Amount field is required"
            }


            console.log("validateinputs", error);
            if (Object.keys(error).length > 0) {
                setError(error)
                return false
            }
            return true
        } catch (e) {
            console.log("riskManagemantValidation_err", e);
            return false
        }
    }

    const requestCopierValidation = async () => {
        try {
            let error = {}
            if (isEmpty(formValue.investAmount)) {
                error.investAmount = "Amount field is required"
            } if (isEmpty(formValue.investType)) {
                error.investType = "Type field is required"
            }
            if (isEmpty(formValue.tradePairs)) {
                error.tradePairs = "Trade pairs must not be empty"
            }
            if (isEmpty(formValue.takeProfit) || isEmpty(formValue.stopLoss) || isEmpty(formValue.maxAllowAmount)) {
                error.riskManage = "You miss some fields in risk managemengt"
            }


            console.log("validateinputs", error);
            if (Object.keys(error).length > 0) {
                setError(error)
                return false
            }
            return true
        } catch (e) {
            console.log("requestCopierValidation_err", e);
            return false
        }
    }

    const requestToCopier = async () => {
        try {
            const isValid = await requestCopierValidation()
            if (isValid) {
                const { status, message, data, errors } = await requestCopier(formValue, getUser.secretKey);
                setIsLoading(false)
                if (status) {
                    setFormValue(initialValue)
                    showToastMessage(message, 'success')
                    navigate("/copy-trade")
                } else {
                    setError(errors)
                    !isEmpty(message) && showToastMessage(message, 'error')
                }
            }
        } catch (e) {
            console.log("requestCopier_err", e);
        }
    }

    useEffect(() => {
        if (!isEmpty(state?.data?.tradePairs) && !isEmpty(pairList)) {
            let pairs = state?.data?.tradePairs.map((value) => {
                let pairdetails = pairList.find((el) => el._id == value)
                return {
                    pair: `${pairdetails.firstCurrency} / ${pairdetails.secondCurrency}`,
                    label: pairdetails.tikerRoot,
                    value: value
                }
            })
            console.log(pairs, 'pairs')
            setPairCollections(pairs)
            setFormValue({ ...formValue, ...{ strategyId: state?.data?.strategyId } })
        }
    }, [state, pairList])

    console.log(state, 'useEffect__useEffect')

    return (
        <div>

            {/* modal import - start */}

            {
                pairCollections.length > 0 &&
                <CopyTradingPairs
                    show={showSelectPairs}
                    handleClose={handleCloseSelectPairs}
                    pairCollections={pairCollections}
                    selectPairs={(value) => {
                        setError({})
                        setFormValue({ ...formValue, ...{ tradePairs: value } })
                    }}
                    pairs={formValue.tradePairs}
                />
            }


            <RiskManagement
                show={showRiskManagement}
                handleClose={handleCloseRiskManagement}
                handleChange={handleOnchange}
                errors={error && error}
                formValue={formValue}
                riskManagemantValidation={riskManagemantValidation}
            />

            {/* modal import - end */}

            <Header props={props} />
            <section className='custom_section screen_min_ht' >

                <div className="container container80 pt-5">

                    <div className='row'>
                        <div className='col-xl-8 col-xxl-7'>
                            <div>
                                <div className='selected_pairs'>
                                    <div className='selected_pairs_heads'>
                                        <h5 className='mb-0'>Copy trading pairs</h5>
                                        <button
                                            className='grad_btn'
                                            onClick={handleShowSelectPairs}>Select Pairs</button>
                                    </div>


                                    {/* <div className='selected_pairs_body mt-3'>
                                        {
                                            formValue.tradePairs.length > 0 ?
                                            formValue.tradePairs.map((value) => (
                                                <>
                                                <button className={`${"active"}`}>{value.pair}</button>
                                                </>
                                                ))
                                                : "No pair selected"
                                                }
                                                </div> */}

                                    {formValue.tradePairs.length > 0 ?
                                        <div className='selected_pairs_body mt-3'>
                                            {formValue.tradePairs.map((value) => (
                                                <button className={`${"active"}`}>{value.pair}</button>))}
                                        </div> :
                                        <div className='mt-3 selected_pairs_body_nopairs'>No pair selected</div>
                                    }

                                    <p className="bt_error text-danger">{error && error?.tradePairs}</p>
                                </div>

                                <div className='amount_management mt-5'>

                                    <div className='am_tabs'>
                                        <button
                                            className={`${formValue.investType == 'amount' ? "active" : ""}`}
                                            onClick={() => setFormValue({ ...formValue, ...{ investType: "amount" } })}
                                        >
                                            Fixed Amount
                                        </button>
                                        <button
                                            className={`${formValue.investType == 'percen' ? "active" : ""}`}
                                            onClick={() => setFormValue({ ...formValue, ...{ investType: "percen" } })}
                                        >
                                            Percentage Amount
                                        </button>
                                    </div>

                                    <div className='am_body mt-4'>

                                        {formValue.investType == 'amount' ?
                                            <div>
                                                <div className='am_input_section'>
                                                    <input placeholder='10' name="investAmount" onChange={handleOnchange} value={formValue.investAmount} />
                                                    <div className='am_amount_type'>
                                                        USDT
                                                    </div>
                                                </div>
                                                <p className="bt_error text-danger">{error && error?.investAmount}</p>
                                            </div>
                                            : <div className='am_input_section'>
                                                <input placeholder='100' name="investPercen" onChange={handleOnchange} value={formValue.investPercen} />
                                                <div className='am_amount_type'>
                                                    In Percentage
                                                </div>
                                            </div>}



                                        <div className='am_risk_manage mt-4 mt-lg-5'>
                                            <div className='am_risk_manage_left'>
                                                <h5 className='mb-0'>Risk Management</h5>
                                                {/* <p className='mt-3'>Maximum follow amount : 5000 USDT</p> */}
                                                <p className="bt_error text-danger">{error && error?.riskManage}</p>
                                            </div>

                                            <button
                                                className='grad_btn'
                                                onClick={handleShowRiskManagement}
                                            >
                                                Manage Risk
                                            </button>
                                        </div>

                                        <div className='mt-4'>
                                            {
                                                isLoading ?
                                                    <button className='grad_btn '>Loading...</button> :
                                                    <button className='grad_btn ' onClick={requestToCopier}>Copy</button>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    )
}

export default CopyTraders