import React, { useEffect, useContext, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
/**ACTIONS */
import { getPairList } from './actions/pairAction';
import { currencyList, getpriceConversionList } from './actions/currencyAction';
import { launchpadApproveTokenList, launchpadList } from './actions/launchpadAction';

//context
import SocketContext from './context/SocketContext';
import { LAUNCH_CREATEDATA } from './constant/Index';
import { setPairList } from './actions/pairReduxAction';
import { launchpadLists } from './actions/launchpadReduxAction';

import { jwtDecode } from 'jwt-decode';
import isEmpty from 'is-empty';
import { setIsAuth, userAction, userAssetAction } from './actions/userRedexActions';
import { decodeJwt } from './config/jsonWebToken';
import { getSynapsStatus, userAssets, userData } from './actions/userAction';
/** Actions */
import { userLogout } from './actions/userAction';
import axios, { setAuthToken } from './config/axios';
import { getDerivativePairList } from './actions/DerivativeAction';
import { setMarginPairList, setMarginTicker } from './actions/MarginReduxAction';
import { setSpotTicker } from './actions/spotReduxAction';
import { setDerivativePairList, setDerivativeTicker } from './actions/derivativeReduxAction';
import { SetPriceConversionData } from './actions/currencyReduxAction';
import { setFuturesTicker } from './actions/FuturesReduxAction';
import { getAllStrategy, getMyStrategy } from './actions/copyTradeAction';
import { getAuthToken } from './lib/localStorage';

const HelperRoute = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    const { priceConversionList } = useSelector((state) => (state.currency))
    const { pairList } = useSelector((state) => (state.pairList))
    const { marginList } = useSelector((state) => state.margin);
    const { derivativeList } = useSelector((state) => state.derivative);

    const ConversionList = useRef(priceConversionList)
    const pairsList = useRef(pairList)
    const marginsList = useRef(marginList)
    const derivativesList = useRef(derivativeList)
    const socketContext = useContext(SocketContext);
    const { isAuthenticated, getUser } = useSelector((state) => (state.user))
    // console.log(pairList, 'tempPairList', isAuthenticated)
    useEffect(() => {

        let id = location?.pathname?.split('/').length == 5 ? location?.pathname?.split('/')[4] : ''

        console.log(location, 'location', params?.id, location.pathname?.split('/'), id, location.pathname !== '/createlaunchpad' && id != 'perview')
        if (location.pathname !== '/createlaunchpad' && id != 'perview') {
            console.log(location, 'location1', params?.id, location.pathname?.split('/'), id)
            dispatch({
                type: LAUNCH_CREATEDATA,
                payload: {}
            })
        }
    }, [location])
    useEffect(() => {
        fetchPairList()
        fetchMarginPairList()
        fetchCurrencyList()
        getlaunchpadList()
        fetchDerivativePairList()
        getpriceConversionList()
        if (isAuthenticated) {
            sessionStorage.removeItem("loginFrom")
            // fetchGetSynapsStatus();
            fetchAssetDetails();
            fetchUserData();

            // getUserApproveToken()
            if (!isEmpty(getUser)) {
                launchpadApproveTokenList(getUser?.secretKey);
            }
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (!isEmpty(getAuthToken()) && !isEmpty(getUser)) {
            fetchAllStrategy()
        }
        if (isEmpty(getAuthToken())) {
            fetchAllStrategy()
        }
        if (!isEmpty(getUser)) {
            getMyStrategy(getUser?.secretKey)
        }

    }, [getUser])

    useEffect(() => {
        const token = localStorage.token;
        if (!isEmpty(token)) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    useEffect(() => {
        const token = localStorage.token;
        if (!isEmpty(token)) {
            setAuthToken(token); // Set token common as headers
            const decoded = jwtDecode(token);
            /** Force-Logout */
            expireToken(decoded) // Expire JWT.
            noActivityInSite() // Without activity.
        }
    }, [isAuthenticated]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        decodeJwt(token)
    }, [])

    useEffect(() => {
        if (isEmpty(pairsList.current)) {
            pairsList.current = pairList
        }
    }, [pairList])

    useEffect(() => {
        if (isEmpty(marginsList.current)) {
            marginsList.current = marginList
        }
    }, [marginList])

    useEffect(() => {
        derivativesList.current = derivativeList
    }, [derivativeList])

    useEffect(() => {
        ConversionList.current = priceConversionList
    }, [priceConversionList])

    useEffect(() => {
        socketContext.socket.on('tikerPrice', (result) => {
            console.log('tikerPrice', result, pairsList.current)
            let tempPairList = [...pairsList.current];
            let marginTemp = [...marginsList.current]
            let pairIndex = tempPairList.findIndex((el => el.tikerRoot == result.tikerRoot))
            let marginpairIndex = marginTemp.findIndex((el => el.tikerRoot == result.tikerRoot))
            if (pairIndex != -1) {
                tempPairList[pairIndex] = { ...tempPairList[pairIndex], ...result }
                pairsList.current = tempPairList
            }
            if (marginpairIndex != -1) {
                marginTemp[marginpairIndex] = { ...marginTemp[marginpairIndex], ...result }
                marginsList.current = marginTemp
            }
            if (tempPairList.length > 0) {
                setPairList(tempPairList)
            }
            if (marginTemp.length) {
                setMarginPairList(marginTemp)
            }
            let marginpair = localStorage.getItem("marginpair");
            let spotpair = localStorage.getItem("curpair");
            if (spotpair == result.tikerRoot) {
                setSpotTicker(result);
            }
            if (marginpair == result.tikerRoot) {
                setMarginTicker(result)
            }
        })

        socketContext.socket.on('DerivativePrice', (result) => {
            let tempPairList = [...derivativesList.current];
            let pairIndex = tempPairList.findIndex((el => el.tikerRoot == result.tikerRoot))
            if (pairIndex != -1) {
                tempPairList[pairIndex] = { ...tempPairList[pairIndex], ...result }
            }
            if (tempPairList.length > 0) {
                setDerivativePairList(tempPairList)
                derivativesList.current = tempPairList
            }
            let derivativepair = localStorage.getItem("derivativepair");
            let futurespair = localStorage.getItem("futurespair");
            if (derivativepair == result.tikerRoot) {
                setDerivativeTicker(result)
            }
            if (futurespair == result.tikerRoot) {
                setFuturesTicker(result)
            }
        })

        socketContext.socket.on('priceConversion', (result) => {
            let tempList = [...ConversionList.current]
            let findIndex = tempList.findIndex((el => el._id.toString() == result._id.toString()))
            if (findIndex != -1) {
                tempList[findIndex] = { ...tempList[findIndex], ...result }
            } else if (findIndex != -1) {
                tempList.push(result)
            }
            SetPriceConversionData(tempList)
        })

        socketContext.socket.on('AssetDetails', (result) => {
            // console.log(result, 'AssetDetails')
            userAssetAction(result)
        })

        socketContext.socket.on('userDetails', (result) => {
            if (!isEmpty(result)) {
                userAction(result)
            }
        })
        socketContext.socket.on('UserDeactivate', (result) => {
            // console.log(result, 'UserDeactivate')
            userLogout()
        })
        socketContext.socket.on('FORCE_LOGOUT', (result) => {
            let token = localStorage.getItem('token');
            if (result && result != token) {
                userLogout()
            }
        })
    }, [])

    const fetchAllStrategy = () => {
        try {
            console.log(getUser, 'getAllStrategy')
            getAllStrategy({
                page: 1,
                limit: 10,
                filterBy: "",
                search: "",
                id: isEmpty(getUser?.userId) ? "" : getUser?.userId
            })
        } catch (err) {
            console.log(err, 'fetchUserData__err')
        }
    }

    const fetchUserData = () => {
        try {
            userData()
        } catch (err) {
            console.log(err, 'fetchUserData__err')
        }
    }

    const fetchGetSynapsStatus = () => {
        try {
            getSynapsStatus()
        } catch (err) {
            console.log(err, 'fetchGetSynapsStatus___err')
        }
    }

    const fetchPairList = () => {
        try {
            getPairList({ isMargin: false })
        } catch (err) {
            console.log(err, 'fetchPairList__err')
        }
    }

    const fetchMarginPairList = () => {
        try {
            getPairList({ isMargin: true })
        } catch (err) {
            console.log(err, 'fetchPairList__err')
        }
    }

    const fetchDerivativePairList = () => {
        try {
            getDerivativePairList()
        } catch (err) {
            console.log(err, 'fetchPairList__err')
        }
    }

    const fetchAssetDetails = () => {
        try {
            if (isAuthenticated) {
                let token = localStorage.getItem('token');
                token = token.replace('Bearer ', '')
                const decoded = jwtDecode(token);
                console.log(decoded, token, 'fetchAssetDetails')
                userAssets(decoded)
            }

        } catch (err) {
            console.log(err, 'fetchAssetDetails__err')
        }
    }

    const fetchCurrencyList = () => {
        try {
            currencyList()
        } catch (err) {
            console.log(err, 'fetchAssetDetails__err')
        }
    }

    const getlaunchpadList = async () => {
        try {
            const { status, message, result } = await launchpadList();
            if (status) {
                launchpadLists(result)
            }
        } catch (e) {
            console.log("getlaunchpadList_err", e);
        }
    }

    // const getUserApproveToken = async () => {
    //     try {
    //         const { status, message, result } = await launchpadApproveTokenList();
    //         if (status) {
    //             console.log(result, 'getUserApproveToken')
    //             ApproveTokenList(result)
    //         }
    //     } catch (err) {
    //         console.log(err, 'getUserApproveToken__err')
    //     }
    // }


    const expireToken = (decoded) => {
        try {
            const oldintervalId = localStorage.getItem("ActiveInterval");
            if (oldintervalId) {
                clearInterval(oldintervalId);
                localStorage.removeItem("ActiveInterval");
            }
            const intervalId = setInterval(() => {
                const currentTime = Date.now() / 1000;
                // console.log("expireToken_expireToken", decoded.exp < currentTime, parseInt(decoded.exp) - parseInt(currentTime));
                if (parseInt(decoded.exp) < parseInt(currentTime)) {
                    userLogout();
                }
            }, 1000);
            localStorage.setItem("ActiveInterval", intervalId);
        } catch (e) {
            console.log("expireToken_Err", e);
        }
    }


    window.addEventListener('click', (event) => {
        localStorage.setItem("ActiveTime", new Date().getTime())
    })
    const noActivityInSite = () => {
        try {
            const intervalId = setInterval(async () => {
                let lastactivetime = localStorage.getItem("ActiveTime")
                let activeTime = new Date().getTime()
                let checkTime = (parseFloat(activeTime) - parseFloat(lastactivetime)) / 1000 / 60
                // console.log(parseFloat(checkTime), "checkTimecheckTimecheckTime")
                if (parseInt(checkTime) > 60) {
                    let oldintervalId = localStorage.getItem('ActiveCheck')
                    if (oldintervalId) {
                        clearInterval(oldintervalId);
                    }
                    userLogout();
                }
            }, 1000)
            localStorage.setItem('ActiveCheck', intervalId)
        } catch (e) {
            console.log("noActivityInSite_err", e);
        }
    }

    // return (
    //     <>
    //         <p> {count}</p>
    //         {PairData.length > 0 ? PairData.map((val, i) => {
    //             return (
    //                 <p>{i + 1} - {val.tikerRoot} - {val.last} - {val.change}</p>
    //             )
    //         }) : ''}
    //     </>
    // )
}



export default HelperRoute;