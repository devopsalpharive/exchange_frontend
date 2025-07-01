/** Packages */
import isEmpty from 'is-empty'

import { LAUNCH_CREATEDATA } from '../constant/Index';
const initialState = { launchpad: [], creationData:{} };


export default function (state = initialState, action) {
    switch (action.type) {
        case "LAUNCHPAD_LIST":
            return {
                ...state,
                launchpad: action.payload
            };
        case LAUNCH_CREATEDATA: {
            return {
                ...state,
                creationData: action.payload
            };
        }
        default:
            return state;
    }
}
