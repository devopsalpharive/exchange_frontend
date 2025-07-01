/** STORE */
import store from '../redux/store'

import { CURRENCY_LIST, PRICE_CONVERSION_LIST } from '../constant/Index'


export const setCurrencyData = (data) => {
    store.dispatch({
        type: CURRENCY_LIST,
        payload: data
    })
}

export const SetPriceConversionData = (data) => {
    store.dispatch({
        type: PRICE_CONVERSION_LIST,
        payload: data
    })
}