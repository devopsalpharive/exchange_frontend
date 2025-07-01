/** Packages */
import isEmpty from 'is-empty'


/**CONSTANT */
import { CONNECTION_STATE } from '../constant/Index';

const initialState = { connectionStatus: 'connecting' };


export default function (state = initialState, action) {
    switch (action.type) {
        case CONNECTION_STATE:
            return {
                ...state,
                connectionStatus: action.payload
            };
        default:
            return state;
    }
}
