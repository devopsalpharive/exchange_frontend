/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { FUTURES_TRADE_PAIR, SET_FUTURES_MARKET_PRICE } from '../constant/Index';

const initialState = { futuresTicker: {}, futuresPair: {} };


export default function (state = initialState, action) {
    switch (action.type) {
        // case DERIVATIVE_LIST:
        //     return {
        //         ...state,
        //         derivativeList: action.payload
        //     };
        case FUTURES_TRADE_PAIR:
            return {
                ...state,
                futuresPair: action.payload
            };
        case SET_FUTURES_MARKET_PRICE:
            return {
                ...state,
                futuresTicker: action.payload
            };
        default:
            return state;
    }
}
