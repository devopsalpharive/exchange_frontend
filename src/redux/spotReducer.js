/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { SPOT_TRADE_PAIR, SET_SPOT_MARKET_PRICE, SPOT_ORDERBOOK_PRICE } from '../constant/Index';

const initialState = { spotPair: {}, spotTicker: {}, spotOrderBookprice: '' };


export default function (state = initialState, action) {
    switch (action.type) {
        case SPOT_TRADE_PAIR:
            return {
                ...state,
                spotPair: action.payload
            };
        case SET_SPOT_MARKET_PRICE:
            return {
                ...state,
                spotTicker: action.payload
            };
        case SPOT_ORDERBOOK_PRICE:
            return {
                ...state,
                spotOrderBookprice: action.payload
            };
        default:
            return state;
    }
}