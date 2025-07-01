/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { PAIR_LIST, SPOT_TRADE_PAIR } from '../constant/Index';

const initialState = { pairList: [],tradePair:{} };


export default function (state = initialState, action) {
    switch (action.type) {
        case PAIR_LIST:
            return {
                ...state,
                pairList: action.payload
            };
        case SPOT_TRADE_PAIR:
            return {
                ...state,
                tradePair: action.payload
            };
        default:
            return state;
    }
}
