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
            'url': `/margin/openOrder/${pairId}`,
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

export const getuserPositionOrders = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/margin/positionOrders/${pairId}`,
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
            'url': `/margin/orderHistory/${pairId}`,
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

export const getCloseOrders = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/margin/closedOrders/${pairId}`,
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
            'url': `/margin/orderPlacing`,
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
            'url': `/margin/cancelOrder/${orderId}`,
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
            message: err.response.data.message,
        }
    }
}

export const ClosepositionOrder = async (data) => {
    try {
        let respData = await axios({
            'url': `/margin/closeposition`,
            'method': 'post',
            'data': data
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (err) {
        console.log(err, 'ClosepositionOrder__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            errors: err.response.data.error
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

