/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { CURRENCY_LIST, PRICE_CONVERSION_LIST } from '../constant/Index';

const initialState = { currencyList: [], priceConversionList: [] };


export default function (state = initialState, action) {
    switch (action.type) {
        case CURRENCY_LIST:
            return {
                ...state,
                currencyList: action.payload
            };
        case PRICE_CONVERSION_LIST:
            return {
                ...state,
                priceConversionList: action.payload
            };
        default:
            return state;
    }
}
