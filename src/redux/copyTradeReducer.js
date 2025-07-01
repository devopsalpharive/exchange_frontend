/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { ALL_STRATEGY, MY_STRATEGY } from '../constant/Index';

const initialState = { allStrategy: {}, myStrategy: {} };


export default function (state = initialState, action) {
    switch (action.type) {

        case ALL_STRATEGY:
            return {
                ...state,
                allStrategy: action.payload
            };
        case MY_STRATEGY:
            return {
                ...state,
                myStrategy: action.payload
            };
        default:
            return state;
    }
}
