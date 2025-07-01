/** STORE */
import store from '../redux/store'

import { DERIVATIVE_LIST, DERIVATIVE_TRADE_PAIR, SET_DERIVATIVE_MARKET_PRICE } from '../constant/Index'


export const setDerivativePairList = (data) => {
    store.dispatch({
        type: DERIVATIVE_LIST,
        payload: data
    })
}

export const setDerivativeTradePair = (data) => {
    console.log('setMarginTradePair', data)
    store.dispatch({
        type: DERIVATIVE_TRADE_PAIR,
        payload: data
    })
}

export const setDerivativeTicker = ({
    last,
    marketPrice,
    open,
    close,
    low,
    high,
    bid,
    ask,
    volume,
    deal,
    changePrice,
    change,
    botStatus,
    _id,
}) => {
    console.log(last,
        marketPrice,
        open,
        close,
        low,
        high,
        bid,
        ask,
        volume,
        deal,
        changePrice,
        change,
        botStatus,
        _id, 'setDerivativeTicker')
    store.dispatch({
        type: SET_DERIVATIVE_MARKET_PRICE,
        payload: {
            last,
            marketPrice,
            open,
            close,
            low,
            high,
            bid,
            ask,
            volume,
            deal,
            changePrice,
            change,
            botStatus,
            _id,
        }
    })
}