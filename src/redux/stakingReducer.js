/** Packages */
import isEmpty from 'is-empty'




const initialState = { pools: [], stakingCurrencies: [] };


export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_POOLS":
            return {
                ...state,
                pools: action.payload
            };
        case "GET_STAKING_CURRENCY":
            return {
                ...state,
                stakingCurrencies: action.payload,
            };
        default:
            return state;
    }
}
