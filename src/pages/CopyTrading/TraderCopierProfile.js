import React, { useState, useEffect, useRef } from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import ProfileDetails from '../../components/ProfileDetails'
import ROIcard from '../../components/ROIcard'
import TradePerformanceCard from '../../components/TradePerformanceCard'
import VolumeAllocation from '../../components/VolumeAllocation'
import CurrentCopiers from '../../components/CurrentCopiers'
import CopyTradingPairs from '../../modal/CopyTradingPairs'
import TradeOrder from './Trade/TradeOrder'
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from 'is-empty'
import { showToastMessage } from '../../config/toast'
import { getCommissionHistory, getCopierDetails, getstrategyDetails, updateCopierDetails, updateStrategyDetails } from '../../actions/copyTradeAction'
import { momentFormat, strategyAge } from '../../lib/dateTimeHelper'
import { Images } from '../../data/Images'
import { FaPen } from 'react-icons/fa6'
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import Select from "react-select";
import { FaSearch } from 'react-icons/fa'
import { FiSearch } from "react-icons/fi";
import fileObjectUrl from '../../lib/fileObjectUrl'


const typeOptions = [
    { value: 'credit', label: 'Credit' },
    { value: 'debit', label: 'Debit' },
    { value: 'all', label: 'All' },
];


const TraderCopierProfile = (props) => {
    const initialValue = {
        _id: "",
        name: "",
        description: "",
        showHistory: "",
        minInvest: "",
        tradePairs: [],
        investAmount: 0,
        maxAllowAmount: 0,
        investType: "amount"
    }
    const { type, id } = useParams();
    const { currencyList } = useSelector((state) => state.currency);
    const { myStrategy } = useSelector((state) => state.copyTrade);
    const { getUser } = useSelector((state) => state.user);
    // console.log(getUser, 'TraderCopierProfile')
    const { pairList } = useSelector((state) => state.pairList);
    const [formValue, setFormValue] = useState(initialValue)
    const [profileData, setProfileData] = useState({})
    const [isCopier, setisCopier] = useState(false)

    const [pairCollections, setPairCollections] = useState([])
    const [showTabDetails, setShowTabDetails] = useState('insights')
    const [showSelectPairs, setShowSelectPairs] = useState(false)
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [commissionData, setCommissionData] = useState([])
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [search, setSearch] = useState('')
    const [selectedCoin, setSelectedCoin] = useState('')
    const [count, setCount] = useState('')
    const [coinOptions, setCoin] = useState([])

    const imageUploadRef = useRef(null)
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const handleUploadImage = () => {
        imageUploadRef.current.click();
    };

    const handleShowSelectPairs = () => {
        setShowSelectPairs(true)
    }

    const handleCloseSelectPairs = () => {
        setShowSelectPairs(false)
    }


    const updateStrategyValidation = async () => {
        try {
            let error = {}
            if (isEmpty(formValue.name)) {
                error.name = "Name field is required"
            } if (isEmpty(formValue.tradePairs)) {
                error.tradePairs = "TradePairs field is required"
            } if (isEmpty(formValue.description)) {
                error.description = "Description field is required"
            } if (isEmpty(formValue.showHistory)) {
                error.showHistory = "ShowHistory field is required"
            } if (isEmpty(formValue.minInvest)) {
                error.minInvest = "MinInvest field is required"
            } if (isEmpty(formValue._id)) {
                showToastMessage("Startegy id is required", "error")
                return false
            }

            console.log("validateinputs", error);
            if (Object.keys(error).length > 0) {
                setError(error)
                return false
            }
            return true
        } catch (e) {
            console.log("updateStrategyValidation_err", e);
        }
    }

    const updateCopierValidation = async () => {
        try {
            let error = {}

            if (isEmpty(formValue.tradePairs)) {
                error.tradePairs = "TradePairs field is required"
            } if (isEmpty(formValue.investAmount)) {
                error.investAmount = "Invest amount is required"
            } if (isEmpty(formValue.maxAllowAmount)) {
                error.tradePairs = "Maximum allow amount is required"
            } if (isEmpty(formValue._id)) {
                showToastMessage("Copier id is required", "error")
                return false
            }

            console.log("validateinputs", error);
            if (Object.keys(error).length > 0) {
                setError(error)
                return false
            }
            return true
        } catch (e) {
            console.log("updateStrategyValidation_err", e);
        }
    }

    const updateStrategy = async () => {
        try {
            setIsLoading(true)
            const isValid = await updateStrategyValidation()
            if (isValid) {
                let formaData = new FormData()
                formaData.append('_id', formValue?._id)
                formaData.append('name', formValue.name)
                for (let i = 0; i < formValue.tradePairs.length; i++) {
                    formaData.append('tradePairs', JSON.stringify(formValue.tradePairs[i]))
                }
                formaData.append('description', formValue.description)
                formaData.append('showHistory', formValue.showHistory)
                formaData.append('minInvest', formValue.minInvest)
                formaData.append('minInvestPercen', formValue.minInvestPercen)
                formaData.append('profileImage', formValue.profileImage)
                const { status, message, data, errors } = await updateStrategyDetails(formaData);
                setIsLoading(false)
                if (status) {
                    showToastMessage(message, 'success')
                } else {
                    setError(errors)
                    !isEmpty(message) && showToastMessage(message, 'error')
                }
            }
            setIsLoading(false)

        } catch (e) {
            console.log("updateStrategy_err", e);
        }
    }

    const updateCopierData = async () => {
        try {
            setIsLoading(true)
            const isValid = await updateCopierValidation()
            if (isValid) {
                const { status, message, data, errors } = await updateCopierDetails(formValue, getUser.secretKey);
                setIsLoading(false)
                if (status) {
                    showToastMessage(message, 'success')
                } else {
                    setError(errors)
                    !isEmpty(message) && showToastMessage(message, 'error')
                }
            }
            setIsLoading(false)

        } catch (e) {
            console.log("updateStrategy_err", e);
        }
    }

    const handleOnchange = (event) => {
        var inputRegex = /^[0-9A-Za-z\-\/\s]+$/;
        let numbersRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;

        const { value, name } = event.target
        if (["name", "description"].includes(name) && !inputRegex.test(value) && value !== "") {
            return false
        } if (["minInvest", "maxAllowAmount", "investAmount", 'minInvestPercen'].includes(name) && !numbersRegex.test(value) && value !== "") {
            return false
        }
        setFormValue({ ...formValue, ...{ [name]: value } })
    }



    const fetchStrategyDetails = async () => {
        try {
            let { status, data } = await getstrategyDetails(id)
            console.log(status, data, 'fetchStrategyDetails')
            if (status) {
                let TradePairs = data?.tradePairs.map((value) => {
                    let pairdetails = [...pairList].find((el) => el._id == value)
                    return {
                        pair: `${pairdetails.firstCurrency} / ${pairdetails.secondCurrency}`,
                        label: pairdetails.tikerRoot,
                        value: value
                    }
                })
                let pairs = [...pairList].map((value) => {
                    return {
                        pair: `${value.firstCurrency} / ${value.secondCurrency}`,
                        label: value.tikerRoot,
                        value: value._id
                    }
                })
                setPairCollections(pairs)
                let isCopier = data.copiersId.find((val) => (val.userId.toString() == getUser?.userId))
                if (!isEmpty(isCopier)) {
                    setisCopier(true)
                } else {
                    setisCopier(false)
                }
                console.log(TradePairs, pairs, 'TradePairs,pairs')
                setFormValue({
                    ...formValue, ...{
                        tradePairs: TradePairs,
                        _id: data?.strategyId,
                        name: data?.name,
                        description: data?.description,
                        showHistory: data?.showHistory,
                        minInvest: data?.minInvest,
                        minInvestPercen: data?.minInvestPercen,
                        profileImage: data?.profileImage
                    }
                })
                setProfileData(data)
            }
        } catch (err) {
            console.log(err, 'fetchStrategyDetails__err')
        }
    }

    const fetchCopierDetails = async () => {
        try {
            console.log('fetchCopierDetails')
            let { status, data } = await getCopierDetails({ strategyId: id }, getUser.secretKey)
            console.log(status, data, 'fetchCopierDetails')
            if (status) {
                let pairs = data?.strategyTradePairs?.map((value) => {
                    let pairdetails = pairList.find((el) => el._id == value)
                    return {
                        pair: `${pairdetails.firstCurrency} / ${pairdetails.secondCurrency}`,
                        label: pairdetails.tikerRoot,
                        value: value
                    }
                })
                let selectedCopierpairs = data?.tradePairs?.map((value) => {
                    let pairdetails = pairList.find((el) => el._id == value)
                    return {
                        pair: `${pairdetails.firstCurrency} / ${pairdetails.secondCurrency}`,
                        label: pairdetails.tikerRoot,
                        value: value
                    }
                })
                setPairCollections(pairs)
                setFormValue({
                    ...formValue, ...{
                        tradePairs: selectedCopierpairs,
                        _id: data?._id,
                        name: data?.name,
                        description: data?.description,
                        showHistory: data?.showHistory,
                        minInvest: data?.minInvest,
                        investAmount: data?.investAmount,
                        maxAllowAmount: data?.maxAllowAmount,
                        takeProfit: data?.takeProfit,
                        stopLoss: Math.abs(data?.stopLoss),
                        investPercen: data?.investPercen,
                        investType: data?.investType
                    }
                })
                setProfileData(data)
            }
        } catch (err) {
            console.log(err, 'fetchStrategyDetails__err')
        }
    }


    const handleStartDateClick = () => {
        if (!startDateOpen) {
            startDateRef.current.input.click()
            setStartDateOpen(true);
        } else {
            setStartDateOpen(false);
        }
    }

    const handleEndDateClick = () => {
        if (!endDateOpen) {
            endDateRef.current.input.click();
            setEndDateOpen(true);
        } else {
            setEndDateOpen(false);
        }
    }

    const years = range(1950, getYear(new Date()) + 1, 1);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const searchCommissionHistory = (startDate, endDate, search, selectedCoin) => {
        try {
            let page = 1
            setPage(page)
            let reqData = {
                startDate: !isEmpty(startDate) ? new Date(startDate).getTime() : '',
                endDate: !isEmpty(endDate) ? new Date(endDate).getTime() : '',
                page: page,
                limit: limit,
                search: search,
                coin: selectedCoin,
            }
            fetchCommissionHistory([], reqData)
        } catch (err) {
            console.log(err, 'fetchCommissionHistory__err')
        }
    }

    const LoadMore = (page) => {
        try {
            setPage(page)
            let reqData = {
                startDate: !isEmpty(startDate) ? new Date(startDate).getTime() : '',
                endDate: !isEmpty(endDate) ? new Date(endDate).getTime() : '',
                page: page,
                limit: limit,
                search: search,
                coin: selectedCoin,
            }
            fetchCommissionHistory(commissionData, reqData)
        } catch (err) {
            console.log(err, 'LoadMore__err')
        }
    }

    const fetchCommissionHistory = async (commissionData, reqData) => {
        try {
            let { status, result, count, message } = await getCommissionHistory(reqData, getUser?.secretKey)
            if (status) {
                console.log(commissionData, result, 'fetchCommissionHistory')
                setCommissionData([...commissionData, ...result])
                setCount(count)
            } else {
                setCommissionData([])
                setCount(0)
            }
        } catch (err) {
            console.log(err, 'fetchCommissionHistory__err')
        }
    }


    useEffect(() => {
        if (!isEmpty(id) && !isEmpty(type)) {
            if (type == 'trader') {
                fetchStrategyDetails()
            } else if (type == 'copier') {
                console.log('fetchCopierDetails1')
                if (!isEmpty(getUser)) {
                    fetchCopierDetails()
                }
            }
        }
    }, [id, type, pairList, getUser])

    useEffect(() => {
        if (type == "trader" && getUser?.userId == profileData?.userId) {
            let reqData = {
                startDate: startDate,
                endDate: endDate,
                page: Page,
                limit: limit,
                search: search,
                coin: selectedCoin,
            }
            fetchCommissionHistory([], reqData)
        }
    }, [type, getUser, profileData])

    useEffect(() => {
        let coinOptions = []
        if (!isEmpty(currencyList)) {
            [...currencyList]?.map((e, i) => {
                if (e.currencySymbol != "") {
                    if (coinOptions.filter((el) => el.value == e.currencySymbol).length == 0) {
                        coinOptions.push({
                            value: e.currencySymbol,
                            label: e.currencySymbol
                        })
                    }
                }
                if (i == currencyList.length - 1) {
                    setCoin([{ value: "", label: "All" }, ...coinOptions])
                    // setCoin(coinOptions)
                }
            })
        }

    }, [currencyList])

    return (
        <div>

            {/* modal import - start */}

            {
                pairCollections.length > 0 &&
                <CopyTradingPairs
                    show={showSelectPairs}
                    handleClose={handleCloseSelectPairs}
                    pairCollections={pairCollections}
                    selectPairs={(value) => { setFormValue({ ...formValue, ...{ tradePairs: value } }) }}
                    pairs={formValue.tradePairs}
                />
            }



            {/* modal import - end */}

            <Header props={props} />

            <section className='custom_section screen_min_ht'>
                <div className="container container80 pt-5">
                    <ProfileDetails data={profileData} copyType={type} Refetch={() => { fetchCopierDetails() }} isCopier={isCopier} page='dash' />

                    <div className='tcp_body mt-5'>
                        <div className='am_tabs'>
                            <button
                                className={`${showTabDetails == 'insights' ? "active" : ""}`}
                                onClick={() => setShowTabDetails('insights')}
                            >
                                Insights
                            </button>
                            {
                                !isEmpty(getUser) ?
                                    type == "trader" && getUser.userId == profileData.userId ?
                                        <button
                                            className={`${showTabDetails == 'configuration' ? "active" : ""}`}
                                            onClick={() => setShowTabDetails('configuration')}
                                        >
                                            Configuration
                                        </button> :
                                        type == "copier" && getUser.userId == profileData.copierId ?
                                            <button
                                                className={`${showTabDetails == 'configuration' ? "active" : ""}`}
                                                onClick={() => setShowTabDetails('configuration')}
                                            >
                                                Configuration
                                            </button> :
                                            "" :
                                    ""
                            }

                            {type == "trader" ?
                                profileData?.showHistory == 'only_trader' && !isEmpty(myStrategy) ?
                                    <button
                                        className={`${showTabDetails == 'orders' ? "active" : ""}`}
                                        onClick={() => setShowTabDetails('orders')}
                                    >
                                        Orders
                                    </button> :
                                    profileData?.showHistory == 'only_copier' && isCopier ?
                                        <button
                                            className={`${showTabDetails == 'orders' ? "active" : ""}`}
                                            onClick={() => setShowTabDetails('orders')}
                                        >
                                            Orders
                                        </button> :
                                        profileData?.userId == getUser?.userId ?
                                            <button
                                                className={`${showTabDetails == 'orders' ? "active" : ""}`}
                                                onClick={() => setShowTabDetails('orders')}
                                            >
                                                Orders
                                            </button> : "" :
                                < button
                                    className={`${showTabDetails == 'orders' ? "active" : ""}`}
                                    onClick={() => setShowTabDetails('orders')}
                                >
                                    Orders
                                </button>
                            }
                            {!isEmpty(getUser) && type == "trader" && getUser.userId == profileData.userId ?
                                < button
                                    className={`${showTabDetails == 'commission_history' ? "active" : ""}`}
                                    onClick={() => setShowTabDetails('commission_history')}
                                >
                                    Commission History
                                </button>
                                :
                                ""}
                        </div>

                        <div className='tcp_tab_content'>
                            {showTabDetails == 'insights' ?
                                <div className='tcp_insights'>
                                    <div className='tcp_trading_data mt-4'>
                                        <h5 className='tcp_trading_data_title'>Trading data</h5>

                                        <div className='tcp_trading_data_card_container mt-4'>
                                            {/* {type == 'copier' ? "" :
                                                <div className='tcp_trading_data_card'>
                                                    <p className='value'>{profileData?.viewUsers}</p>
                                                    <p className='desc'>Total views count</p>
                                                </div>} */}
                                            {type == 'copier' ? "" :
                                                <div className='tcp_trading_data_card'>
                                                    <p className='value'>{isEmpty(profileData?.tradeDate) || profileData?.tradeDate == 0 ? `0 days 0 hours` : strategyAge(profileData?.tradeDate)}</p>
                                                    <p className='desc'>Trade start Date</p>
                                                </div>}
                                            {type == 'copier' ? "" :
                                                <div className='tcp_trading_data_card'>
                                                    <p className='value'>{profileData?.totalCopier}</p>
                                                    <p className='desc'>Followers</p>
                                                </div>}
                                            <div className='tcp_trading_data_card'>
                                                <p className='value'>{parseFloat(profileData?.totalPandL).toFixed(2)} USDT</p>
                                                <p className='desc'>Total Pnl</p>
                                            </div>
                                            <div className='tcp_trading_data_card'>
                                                <p className='value'>{parseFloat(profileData?.totalAUM).toFixed(2)} USDT</p>
                                                <p className='desc'>{type == 'copier' ? 'Invested Amount' : 'Total AUM'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-5'>
                                        <div className='col-12 col-xl-7'>
                                            <div className=''>
                                                <ROIcard />
                                            </div>
                                        </div>
                                        <div className='col-12 col-xl-5 mt-4 mt-xl-0'>
                                            <div className=''>
                                                <TradePerformanceCard />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row mt-4'>
                                        <div className='col-12 col-xl-7'>
                                            <div className=''>
                                                <VolumeAllocation />
                                            </div>
                                        </div>
                                        {
                                            !isEmpty(type) && type == "trader" &&
                                            <div className='col-12 col-xl-5 mt-4 mt-xl-0'>
                                                <div className=''>
                                                    <CurrentCopiers />
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div> :
                                showTabDetails == 'configuration' ?
                                    <div className='tcp_config mt-4'>
                                        <div className='row'>
                                            <div className='col-xl-8 col-xxl-7'>
                                                <div>
                                                    <div className='selected_pairs'>
                                                        <div className='selected_pairs_heads'>
                                                            <h5 className='mb-0'>Copy trading pairs</h5>
                                                            <button
                                                                className='grad_btn'
                                                                onClick={handleShowSelectPairs}>Edit Pairs</button>
                                                        </div>

                                                        <div className='selected_pairs_body mt-3'>
                                                            {
                                                                formValue.tradePairs.length > 0 ?
                                                                    formValue.tradePairs.map((value) => (
                                                                        <>
                                                                            <button className={`${"active"}`}>{value.pair}</button>
                                                                        </>
                                                                    ))
                                                                    : "No data found"
                                                            }
                                                        </div>
                                                        <p className="bt_error text-danger">{error?.tradePairs}</p>
                                                    </div>
                                                    {
                                                        !isEmpty(type) && type == "trader" ?
                                                            <>
                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Profile Image</h5>
                                                                    <div className="mt-3 position-relative">
                                                                        <div className="bt_profileImage_wrapper">
                                                                            <img src={fileObjectUrl(formValue?.profileImage)} />
                                                                            <input
                                                                                ref={imageUploadRef}
                                                                                className="d-none"
                                                                                type="file"
                                                                                onChange={(e) => {
                                                                                    setFormValue({ ...formValue, ['profileImage']: e.target.files[0] })
                                                                                }}
                                                                            />
                                                                            <button
                                                                                className="image_upload_button"
                                                                                onClick={handleUploadImage}
                                                                            >
                                                                                <FaPen fontSize={12} />
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                    <p className="bt_error text-danger">{error?.profileImage}</p>
                                                                </div>

                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>View Access</h5>
                                                                    <div className='selected_pairs_body mt-3'>
                                                                        <button
                                                                            name="showHistory"
                                                                            className={`${formValue.showHistory == 'only_trader' ? "active" : ""}`}
                                                                            onClick={() => setFormValue({ ...formValue, ...{ showHistory: "only_trader" } })}
                                                                        >Master Trader</button>
                                                                        <button
                                                                            name="showHistory"
                                                                            className={`${formValue.showHistory == 'only_copier' ? "active" : ""}`}
                                                                            onClick={() => setFormValue({ ...formValue, ...{ showHistory: "only_copier" } })}
                                                                        >Followers</button>
                                                                    </div>
                                                                    <p className="bt_error text-danger">{error?.showHistory}</p>
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Minimum Invest</h5>
                                                                    <div className='mt-4 am_input_section'>
                                                                        <input placeholder='10' name="minInvest" onChange={handleOnchange} value={formValue.minInvest} />
                                                                        <div className='am_amount_type'>
                                                                            USDT
                                                                        </div>
                                                                    </div>
                                                                    <p className="bt_error text-danger">{error?.minInvest}</p>
                                                                </div>

                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Minimum Invest (%) </h5>
                                                                    <div className='mt-4 am_input_section'>
                                                                        <input placeholder='10' name="minInvestPercen" onChange={handleOnchange} value={formValue.minInvestPercen} />
                                                                        <div className='am_amount_type'>
                                                                            (%)
                                                                        </div>
                                                                    </div>
                                                                    <p className="bt_error text-danger">{error?.minInvestPercen}</p>
                                                                </div>

                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Description</h5>
                                                                    <textarea className='mt-4 ct_textarea' name="description" placeholder="Enter your description" onChange={handleOnchange} value={formValue.description} />
                                                                    <p className="bt_error text-danger">{error?.description}</p>
                                                                </div>
                                                            </> :
                                                            <>
                                                                {
                                                                    formValue.investType == 'amount' ?
                                                                        <div className='mt-5'>
                                                                            <h5 className='mb-0'>Investmet Amount</h5>
                                                                            <div className='mt-4 am_input_section'>
                                                                                <input placeholder='10' name="investAmount" onChange={handleOnchange} value={formValue.investAmount} />
                                                                                <div className='am_amount_type'>
                                                                                    USDT
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className='mt-5'>
                                                                            <h5 className='mb-0'>Investmet percentage</h5>
                                                                            <div className='mt-4 am_input_section'>
                                                                                <input placeholder='10' name="investPercen" onChange={handleOnchange} value={formValue.investAmount} />
                                                                                <div className='am_amount_type'>
                                                                                    (%)
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                }


                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Maximum follow amount</h5>
                                                                    <div className='mt-4 am_input_section'>
                                                                        <input placeholder='10' name="maxAllowAmount" onChange={handleOnchange} value={formValue.maxAllowAmount} />
                                                                        <div className='am_amount_type'>
                                                                            USDT
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Take Profit</h5>
                                                                    <div className='mt-4 am_input_section'>
                                                                        <input placeholder='10' name="takeProfit" onChange={handleOnchange} value={formValue.takeProfit} />
                                                                        <div className='am_amount_type'>
                                                                            %
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='mt-5'>
                                                                    <h5 className='mb-0'>Stop Loss</h5>
                                                                    <div className='mt-4 am_input_section'>
                                                                        <input placeholder='10' name="stopLoss" onChange={handleOnchange} value={formValue.stopLoss} />
                                                                        <div className='am_amount_type'>
                                                                            %
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                    }
                                                    <div className='mt-4'>
                                                        {
                                                            isLoading ?
                                                                <button className='grad_btn '>Loading...</button> :
                                                                type == 'trader' ?
                                                                    <button className='grad_btn ' onClick={updateStrategy}>Update</button> :
                                                                    <button className='grad_btn ' onClick={updateCopierData}>Update</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div> :
                                    showTabDetails == 'orders' ?
                                        <div className='tcp_orders mt-4'>
                                            <div className="tradeordersec">
                                                < TradeOrder />
                                            </div>
                                        </div> :
                                        <div className='tcp_orders mt-4'>
                                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                                                <div className='d-flex flex-wrap align-items-center gap-3'>


                                                    <div className="custom_datepicker position-relative">
                                                        {" "}
                                                        <img
                                                            src={Images.calender}
                                                            alt="calender"
                                                            className="img-fluid calender_icon"
                                                            onClick={handleStartDateClick}
                                                        />
                                                        <DatePicker
                                                            ref={startDateRef}
                                                            placeholderText="Start Date"
                                                            selected={startDate}
                                                            maxDate={new Date()}

                                                            onKeyDown={(e) => {
                                                                e.preventDefault()
                                                            }}
                                                            onChange={(date) => {
                                                                setStartDate(date)
                                                                if (date && endDate && date > endDate) {
                                                                    setEndDate(null);
                                                                }
                                                                searchCommissionHistory(new Date(date).getTime(), endDate, search, selectedCoin)
                                                            }}
                                                            renderCustomHeader={({
                                                                date,
                                                                changeYear,
                                                                changeMonth,
                                                                decreaseMonth,
                                                                increaseMonth,
                                                                prevMonthButtonDisabled,
                                                                nextMonthButtonDisabled,
                                                            }) => (
                                                                <div className="datepicker_custom_header d-flex align-items-center gap-2 justify-content-center">
                                                                    <button
                                                                        onClick={decreaseMonth}
                                                                        disabled={prevMonthButtonDisabled}
                                                                        className="date_handle_button"
                                                                    >
                                                                        {"<"}
                                                                    </button>
                                                                    <select
                                                                        className="decorated"
                                                                        value={getYear(date)}
                                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                                    >
                                                                        {years.map((option) => (
                                                                            <option key={option} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    <select
                                                                        value={months[getMonth(date)]}
                                                                        onChange={({ target: { value } }) =>
                                                                            changeMonth(months.indexOf(value))
                                                                        }
                                                                    >
                                                                        {months.map((option) => (
                                                                            <option key={option} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    <button
                                                                        onClick={increaseMonth}
                                                                        disabled={nextMonthButtonDisabled}
                                                                        className="date_handle_button"
                                                                    >
                                                                        {">"}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="custom_datepicker position-relative">
                                                        {" "}
                                                        <img
                                                            src={Images.calender}
                                                            alt="calender"
                                                            className="img-fluid calender_icon"
                                                            onClick={handleEndDateClick}
                                                        />
                                                        <DatePicker
                                                            ref={endDateRef}
                                                            placeholderText="End Date"
                                                            selected={endDate}
                                                            maxDate={new Date()}
                                                            minDate={startDate}
                                                            onKeyDown={(e) => {
                                                                e.preventDefault()
                                                            }}
                                                            onChange={(date) => {
                                                                setEndDate(date)
                                                                // if (date && endDate && date > endDate) {
                                                                // setStartDate(null);
                                                                // }
                                                                searchCommissionHistory(startDate, new Date(date).getTime(), search, selectedCoin)
                                                            }}
                                                            renderCustomHeader={({
                                                                date,
                                                                changeYear,
                                                                changeMonth,
                                                                decreaseMonth,
                                                                increaseMonth,
                                                                prevMonthButtonDisabled,
                                                                nextMonthButtonDisabled,
                                                            }) => (
                                                                <div className="datepicker_custom_header d-flex align-items-center gap-2 justify-content-center">
                                                                    <button
                                                                        onClick={decreaseMonth}
                                                                        disabled={prevMonthButtonDisabled}
                                                                        className="date_handle_button"
                                                                    >
                                                                        {"<"}
                                                                    </button>
                                                                    <select
                                                                        className="decorated"
                                                                        value={getYear(date)}
                                                                        onChange={({ target: { value } }) => changeYear(value)}
                                                                    >
                                                                        {years.map((option) => (
                                                                            <option key={option} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    <select
                                                                        value={months[getMonth(date)]}
                                                                        onChange={({ target: { value } }) =>
                                                                            changeMonth(months.indexOf(value))
                                                                        }
                                                                    >
                                                                        {months.map((option) => (
                                                                            <option key={option} value={option}>
                                                                                {option}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    <button
                                                                        onClick={increaseMonth}
                                                                        disabled={nextMonthButtonDisabled}
                                                                        className="date_handle_button"
                                                                    >
                                                                        {">"}
                                                                    </button>
                                                                </div>
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-wrap align-items-center gap-3'>
                                                    <div className='min_width_div'>
                                                        <Select
                                                            // menuIsOpen
                                                            isSearchable={false}
                                                            placeholder="Currency"
                                                            classNamePrefix="react_select_three"
                                                            name="type"
                                                            value={
                                                                coinOptions.find(
                                                                    (val) => val.value == selectedCoin
                                                                )}
                                                            onChange={(e) => {
                                                                setSelectedCoin(e.value)
                                                                searchCommissionHistory(startDate, endDate, search, e.value)
                                                            }}
                                                            options={coinOptions}
                                                        />
                                                    </div>
                                                    <div className='table_search'>
                                                        <FiSearch fontSize={18} />
                                                        <input
                                                            placeholder='Search here...'
                                                            onChange={(e) => {
                                                                setSearch(e.target.value)
                                                                searchCommissionHistory(startDate, endDate, e.target.value, selectedCoin)
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="trade_order_table_body border_top_visible">
                                                <div className="table_div">
                                                    <div className="custom_tableWrap table_body_white">
                                                        <table className="table">
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="text-center snum_width" >S.No</th>
                                                                    <th className="text-center">Date</th>
                                                                    <th className="text-center">Email</th>
                                                                    <th className="text-center">Coin</th>
                                                                    <th className="text-center">Fee</th>
                                                                    {/* <th className="text-center">Buy/Sell</th>
                                                                    <th className="text-center">Price</th>
                                                                    <th className="text-center">Stop Price</th>
                                                                    <th className="text-center">Amount</th>
                                                                    <th className="text-center text-nowrap">Filled / Remaining</th>
                                                                    <th className="text-center">Order Value</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {
                                                                    commissionData.length > 0 ? commissionData.map((val, index) => {
                                                                        return (

                                                                            <tr>
                                                                                <td className="text-center snum_width">{index + 1}</td>
                                                                                <td className="text-center">{momentFormat(val?.createdAt)}</td>
                                                                                <td className="text-center"> {val.email}</td>
                                                                                <td className="text-center">{val.currecnySymbol}</td>
                                                                                <td className="text-center">{val.fees}</td>
                                                                                {/* <td className="text-center">Buy/Sell</td>
                                                                                    <td className="text-center">Price</td>
                                                                                    <td className="text-center">Stop Price</td>
                                                                                    <td className="text-center">Amount</td>
                                                                                    <td className="text-center">Filled</td>
                                                                                    <td className="text-center">Order Value</td> */}
                                                                            </tr>

                                                                        )
                                                                    }) : ''
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {
                                                        commissionData.length > 0 && count > commissionData.length ? (
                                                            <div className="d-flex justify-content-center">
                                                                <button
                                                                    className="grad_btn  px-4 fw_sm mt_2rem"
                                                                    onClick={() => {
                                                                        LoadMore(Page + 1)
                                                                    }}
                                                                >
                                                                    Load More
                                                                </button>
                                                            </div>
                                                        ) : <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>



                            }

                        </div>
                    </div>
                </div>
            </section >

            <Footer />
        </div >
    )
}

export default TraderCopierProfile