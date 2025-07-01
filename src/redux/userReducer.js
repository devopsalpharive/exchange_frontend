/** Packages */
import isEmpty from 'is-empty'




const initialState = { isAuthenticated: false, user: {}, loading: false, userAsset: [], firstCurrency: {}, secondCurrency: {} };


export default function (state = initialState, action) {
    switch (action.type) {
        case "USER_REGISTER":
            return {
                ...state,
                newuser: action.payload
            };
        case 'IS_AUTH':
            return {
                ...state,
                isAuthenticated: action.payload,
            }
        case "GET_USER":
            return {
                ...state,
                getUser: action.payload,
            };
        case "USER_ASSET":
            return {
                ...state,
                userAsset: action.payload,
            };
        default:
            return state;
    }
}
