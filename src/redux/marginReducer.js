/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { MARGIN_LIST, MARGIN_TRADE_PAIR, SET_MARGIN_MARKET_PRICE, MARGIN_ORDERBOOK_PRICE } from '../constant/Index';

const initialState = { marginList: [], marginTicker: {}, marginPair: {}, marginOrderbookPrice: '' };


export default function (state = initialState, action) {
    switch (action.type) {
        case MARGIN_LIST:
            return {
                ...state,
                marginList: action.payload
            };
        case MARGIN_TRADE_PAIR:
            return {
                ...state,
                marginPair: action.payload
            };
        case SET_MARGIN_MARKET_PRICE:
            return {
                ...state,
                marginTicker: action.payload
            };
        case MARGIN_ORDERBOOK_PRICE:
            return {
                ...state,
                marginOrderbookPrice: action.payload
            };
        default:
            return state;
    }
}
