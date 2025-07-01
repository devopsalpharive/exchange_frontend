/** STORE */
import store from '../redux/store'

import { FUTURES_TRADE_PAIR, SET_FUTURES_MARKET_PRICE } from '../constant/Index'


// export const setFuturesPairList = (data) => {
//     store.dispatch({
//         type: DERIVATIVE_LIST,
//         payload: data
//     })
// }

export const setFuturesTradePair = (data) => {
    console.log('setFuturesTradePair', data)
    store.dispatch({
        type: FUTURES_TRADE_PAIR,
        payload: data
    })
}

export const setFuturesTicker = ({
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
        _id, 'setFuturesTicker')
    store.dispatch({
        type: SET_FUTURES_MARKET_PRICE,
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