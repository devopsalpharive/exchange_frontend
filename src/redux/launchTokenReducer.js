/** Packages */
import isEmpty from 'is-empty'

import { APPROVE_TOKEN } from '../constant/Index';
const initialState = { approveTokens: [], creationData: {} };


export default function (state = initialState, action) {
    switch (action.type) {
        case APPROVE_TOKEN:
            return {
                ...state,
                approveTokens: action.payload
            };
        default:
            return state;
    }
}
