/** Pacakges */
import axios, { setAuthorization } from '../config/axios';

/** Config */
import config from "../config/env"


export const getOrderBook = async (pairId) => {
    try {
        let respData = await axios({
            'url': `/spot/orderBook/${pairId}`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            result: respData.data.result,
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}


export const getRecentTrade = async (pairId) => {
    try {
        let respData = await axios({
            'url': `/spot/recentTrade/${pairId}`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            result: respData.data.result,
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const getOpenOrders = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/spot/openOrder/${pairId}`,
            'method': 'get',
            'params': query
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

export const getTradeHistory = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/spot/tradeHistory/${pairId}`,
            'method': 'get',
            'params': query
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

export const getorderHistory = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/spot/orderHistory/${pairId}`,
            'method': 'get',
            'params': query
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

export const OrderPlacing = async (data) => {
    try {
        let respData = await axios({
            'url': `/spot/orderPlacing`,
            'method': 'post',
            'data': data
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        }
    }
}

export const CancelTrade = async (orderId) => {
    try {
        let respData = await axios({
            'url': `/spot/cancelOrder/${orderId}`,
            'method': 'get',
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


export const getChartData = async (tikerRoot) => {
    try {
        let respData = await axios({
            'url': `/spot/chart/${tikerRoot}`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            result: respData.data.result,
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            result: []
        }
    }
}


export const getMarketOverview = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/spot/marketOverview`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            record: respData.data.data
        }
    } catch (err) {
        console.log(err, 'getMarketOverview__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            record: []
        }
    }
}
