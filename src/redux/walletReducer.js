/** Packages */
import isEmpty from 'is-empty'
import { SET_ASSET_DATA } from '../constant/Index';




const initialState = {  userAsset: {} };


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ASSET_DATA :
            return {
            ...state,
            userAsset: action.payload,
        };
        default:
            return state;
    }
}
