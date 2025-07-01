/** Pacakges */
import isEmpty from 'is-empty'

/** Config */
import axios, { Axios, setAuthToken } from "../config/axios"
import config from "../config/env"

/** Redux */
import { setAllStrategy, setMyStrategy } from './copyTradeReduxAction';



export const getAllStrategy = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getAllStrategy`,
            method: 'post',
            data: data
        });
        console.log("getAllStrategy_data", getData?.data);
        if (getData?.data?.success) {
            setAllStrategy(getData?.data?.data)
        } else {
            setAllStrategy({})
        }
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getAllStrategy_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getTopTraders = async () => {
    try {
        const getData = await Axios({
            url: `/copy/getTopTraders`,
            method: 'get'
        });
        console.log("getTopTraders_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getTopTraders_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getCopierDetails = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/copy/getCopierDetails`,
            method: 'post',
            data: data,
            secretKey: key
        });
        console.log("getCopierDetails_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getCopierDetails_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getPerformanceDetails = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getPerformanceDetails`,
            method: 'post',
            data: data
        });
        console.log("getPerformanceDetails_data", getData);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getPerformanceDetails_err", e);
        return { status: false, message: 'Error on submit' }
    }
}


export const getCopierTrades = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/copy/getCopierTrades`,
            method: 'get',
            params: data,
            secretKey: key
        });
        console.log("getCopierTrades_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getCopierTrades_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getSingleTrader = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getSingleTrader`,
            method: 'get'
        });
        console.log("getSingleTrader_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getSingleTrader_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getReturnOfInvestmentChart = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getReturnOfInvestmentChart`,
            method: 'post',
            data: data
        });
        console.log("getReturnOfInvestmentChart_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getReturnOfInvestmentChart_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const getVolumeBreakDown = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getVolumeBreakDown`,
            method: 'post',
            data: data
        });
        console.log("getVolumeBreakDown_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getVolumeBreakDown_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const requestTrader = async (data, key) => {
    try {
        const getData = await axios({
            url: `/copy/requestTrader`,
            method: 'post',
            data: data
        });
        console.log("requestTrader_data", getData?.data);
        if (getData?.data?.success) {
            setAllStrategy(getData?.data?.data)
        }
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("requestTrader_err", e);
        return {
            status: false,
            message: e?.response?.data?.message,
            errors: e?.response?.data?.errors,
        }
    }
}

export const requestCopier = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/copy/requestCopier`,
            method: 'post',
            data: data,
            secretKey: key
        });
        console.log("requestCopier_data", getData?.data);

        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("requestCopier_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const updateStrategyDetails = async (data) => {
    try {
        const getData = await axios({
            url: `/copy/editStartegy`,
            method: 'post',
            data: data
        });
        console.log("updateStrategyDetails_data", getData?.data);

        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("updateStrategyDetails_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const updateCopierDetails = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/copy/editCopier`,
            method: 'post',
            data: data,
            secretKey: key
        });
        console.log("updateCopierDetails_data", getData?.data);

        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("updateCopierDetails_err", e);
        return { status: false, message: 'Error on server' }
    }
}

export const setViewers = async (strategyId) => {
    try {
        const respData = await axios({
            url: `/copy/setViewers/${strategyId}`,
            method: 'get'
        });
        console.log("setViewers_data", respData.data);
        return {
            status: respData?.data?.success,
            message: respData?.data?.message
        }
    } catch (e) {
        console.log("setViewers_err", e);
        return { status: false, message: 'Error on server' }
    }
}


export const updatecopiedStrategy = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/copy/updatecopiedStrategy`,
            method: 'post',
            data: data,
            secretKey: key
        });
        console.log("updatecopiedStrategy_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getCopierTrades_err", e);
        return { status: false, message: 'Error on server' }
    }
}

export const getstrategyDetails = async (id) => {
    try {
        const getData = await Axios({
            url: `/copy/strategyDetails/${id}`,
            method: 'get'
        });
        console.log("updatecopiedStrategy_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getCopierTrades_err", e);
    }
}

export const getCopierStats = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/getCopierStats/${data}`,
            method: 'get'
        });
        console.log("getCopierStats_data", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData?.data?.data
        }
    } catch (e) {
        console.log("getCopierStats_err", e);
        return { status: false, message: 'Error on server' }
    }
}

export const getCopyOpenOrders = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/openOrder`,
            method: 'post',
            data: data
        });
        console.log("getCopierStats_data", getData.data);
        return {
            status: getData.data.success,
            record: getData.data.result.data,
            count: getData.data.result.count,
            currentPage: getData.data.result.currentPage,
            nextPage: getData.data.result.nextPage
        }
    } catch (e) {
        console.log("getCopierStats_err", e);
        return { status: false, message: 'Error on server' }
    }
}

export const CancelCopyTrade = async (orderId, data, key) => {
    try {
        let respData = await Axios({
            'url': `/copy/cancelOrder/${orderId}`,
            'method': 'get',
            data: data,
            secretKey: key
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const getCopyOrderHistory = async (data) => {
    try {
        const getData = await Axios({
            url: `/copy/orderHistory`,
            method: 'post',
            data: data
        });
        console.log("getCopierStats_data", getData.data);
        return {
            status: getData.data.success,
            record: getData.data.result.data,
            count: getData.data.result.count,
            currentPage: getData.data.result.currentPage,
            nextPage: getData.data.result.nextPage
        }
    } catch (e) {
        console.log("getCopierStats_err", e);
        return { status: false, message: 'Error on server' }
    }
}

export const getCopyTradeHistory = async (data) => {
    try {
        let respData = await Axios({
            'url': `/copy/tradeHistory`,
            'method': 'post',
            'data': data
        })
        return {
            status: respData.data.success,
            record: respData.data.result.data,
            count: respData.data.result.count,
            currentPage: respData.data.result.currentPage,
            nextPage: respData.data.result.nextPage
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const getMyStrategy = async (secretKey) => {
    try {
        let respData = await Axios({
            'url': `/copy/mystrategyDetails`,
            'method': 'get',
            secretKey: secretKey
        })
        console.log(respData.data.data, 'getMyStrategy')
        if (respData.data.success) {
            setMyStrategy(respData.data.data)
        } else {
            setMyStrategy({})
        }
        return {
            status: respData.data.success,
            result: respData.data.data
        }
    } catch (err) {
        console.log(err, 'getMyStrategy__err')
    }
}

export const getCommissionHistory = async (data, secretKey) => {
    try {
        let respData = await Axios({
            'url': `/copy/CommissionHistory`,
            'method': 'get',
            'params': data,
            secretKey: secretKey
        })
        console.log(respData.data.data, 'getCommissionHistory')
        return {
            status: respData.data.success,
            result: respData.data.data,
            count: respData.data.count,
            message: respData.data.message,
        }
    } catch (err) {
        console.log(err, 'getMyStrategy__err')
        return {
            status: false,
            result: [],
            count: 0,
            message: 'Failed to fetch',
        }
    }
}