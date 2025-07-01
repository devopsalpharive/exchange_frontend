
/** STORE */
import store from '../redux/store'
import { ALL_STRATEGY, MY_STRATEGY } from "../constant/Index"


export const setAllStrategy = (data) => {
    store.dispatch({
        type: ALL_STRATEGY,
        payload: data
    })
}

export const setMyStrategy = (data) => {
    store.dispatch({
        type: MY_STRATEGY,
        payload: data
    })
}
