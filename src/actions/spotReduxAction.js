/** STORE */
import store from '../redux/store'

import { SPOT_TRADE_PAIR, SET_SPOT_MARKET_PRICE } from '../constant/Index'

export const setSpotTradePair = (data) => {
    store.dispatch({
        type: SPOT_TRADE_PAIR,
        payload: data
    })
}

export const setSpotTicker = ({
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
        type: SET_SPOT_MARKET_PRICE,
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