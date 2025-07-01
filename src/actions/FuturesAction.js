/** Pacakges */
import isEmpty from 'is-empty';
import axios, { setAuthorization } from '../config/axios';

// import { setDerivativePairList } from './derivativeReduxAction';

// export const getDerivativePairList = async () => {
//     try {
//         let respData = await axios({
//             'url': `/futures/pairList`,
//             'method': 'get'
//         })
//         console.log(respData?.data?.data, 'getDerivativePairList')
//         if (!isEmpty(respData?.data?.data)) {
//             let ActivePairlist = respData.data.data.filter((val) => { return val.status == 'active' })
//             setDerivativePairList(ActivePairlist)
//         }
//         return { status: true, data: respData.data.data }
//     } catch (e) {
//         console.log("currencyList_err", e);
//         return { status: false, error: e.response.data.errors }
//     }
// }


// export const getOrderBook = async (pairId) => {
//     try {
//         let respData = await axios({
//             'url': `/futures/orderBook/${pairId}`,
//             'method': 'get',
//         })
//         return {
//             status: respData.data.success,
//             result: respData.data.result,
//         }
//     } catch (err) {
//         console.log(err, 'getOrderBook__err')
//         return {
//             status: err.response.data.success,
//             message: err.response.data.message
//         }
//     }
// }


// export const getRecentTrade = async (pairId) => {
//     try {
//         let respData = await axios({
//             'url': `/futures/recentTrade/${pairId}`,
//             'method': 'get',
//         })
//         return {
//             status: respData.data.success,
//             result: respData.data.result,
//         }
//     } catch (err) {
//         console.log(err, 'getOrderBook__err')
//         return {
//             status: err.response.data.success,
//             message: err.response.data.message
//         }
//     }
// }

export const getOpenOrders = async (pairId, query) => {
    try {
        let respData = await axios({
            'url': `/futures/openOrder/${pairId}`,
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
            'url': `/futures/positionOrders/${pairId}`,
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
            'url': `/futures/orderHistory/${pairId}`,
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
            'url': `/futures/closedOrders/${pairId}`,
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
            'url': `/futures/orderPlacing`,
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
            'url': `/futures/cancelOrder/${orderId}`,
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
            'url': `/futures/closeposition`,
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


// export const getChartData = async (tikerRoot) => {
//     try {
//         let respData = await axios({
//             'url': `/futures/chart/${tikerRoot}`,
//             'method': 'get',
//         })
//         return {
//             status: respData.data.success,
//             result: respData.data.result,
//         }
//     } catch (err) {
//         console.log(err, 'getOrderBook__err')
//         return {
//             status: err.response.data.success,
//             message: err.response.data.message,
//             result: []
//         }
//     }
// }