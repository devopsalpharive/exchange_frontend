/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { DERIVATIVE_LIST, DERIVATIVE_TRADE_PAIR, SET_DERIVATIVE_MARKET_PRICE } from '../constant/Index';

const initialState = { derivativeList: [], derivativeTicker: {}, derivativePair: {} };


export default function (state = initialState, action) {
    switch (action.type) {
        case DERIVATIVE_LIST:
            return {
                ...state,
                derivativeList: action.payload
            };
        case DERIVATIVE_TRADE_PAIR:
            return {
                ...state,
                derivativePair: action.payload
            };
        case SET_DERIVATIVE_MARKET_PRICE:
            return {
                ...state,
                derivativeTicker: action.payload
            };
        default:
            return state;
    }
}
