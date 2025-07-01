/** STORE */
import store from '../redux/store'

import { CONNECTION_STATE } from '../constant/Index'


export const setConnectionState = (data) => {
    store.dispatch({
        type: CONNECTION_STATE,
        payload: data
    })
}