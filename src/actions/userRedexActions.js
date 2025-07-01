/** STORE */
import store from '../redux/store'

/**CONSTANT */
import { SET_SPOT_MARKET_PRICE, SET_USER_FIRST_CURRENCY, SPOT_TRADE_PAIR, SET_USER_SECOND_CURRENCY, SET_ASSET_DATA } from '../constant/Index'
export const userAction = (data) => {
    store.dispatch({
        type: "GET_USER",
        payload: data
    })
}

export const userAssetAction = (data) => {
    store.dispatch({
        type: "USER_ASSET",
        payload: data
    })
}

export const setAssetData = (assetData) => {
    store.dispatch({
        type: SET_ASSET_DATA,
        payload: assetData
    })
}

export const setIsAuth = (data) => {
    store.dispatch({
        type: 'IS_AUTH',
        payload: data
    })
}