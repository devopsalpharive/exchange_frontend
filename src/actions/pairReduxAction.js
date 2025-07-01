/** STORE */
import store from '../redux/store'

import {PAIR_LIST} from '../constant/Index'


export const setPairList = (data) => {
    store.dispatch({
        type: PAIR_LIST,
        payload: data
    })
}