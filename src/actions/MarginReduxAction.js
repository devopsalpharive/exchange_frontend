
/** STORE */
import store from '../redux/store'
import { MARGIN_LIST, MARGIN_TRADE_PAIR, SET_MARGIN_MARKET_PRICE } from "../constant/Index"


export const setMarginPairList = (data) => {
    store.dispatch({
        type: MARGIN_LIST,
        payload: data
    })
}

export const setMarginTradePair = (data) => {
    store.dispatch({
        type: MARGIN_TRADE_PAIR,
        payload: data
    })
}

export const setMarginTicker = ({
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
    store.dispatch({
        type: SET_MARGIN_MARKET_PRICE,
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