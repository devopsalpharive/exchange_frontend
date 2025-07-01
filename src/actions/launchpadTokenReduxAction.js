/** STORE */
import store from '../redux/store';

/**CONSTANT */
import { APPROVE_TOKEN } from '../constant/Index';

export const ApproveTokenList = (data) => {
    store.dispatch({
        type: APPROVE_TOKEN,
        payload: data
    })
}