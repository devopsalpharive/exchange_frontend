/** STORE */
import store from '../redux/store';


export const stakingPools = (data) => {
    store.dispatch({
        type: "GET_POOLS",
        payload: data
    })
}

export const stakingCurrencies = (data) => {
    store.dispatch({
        type: "GET_STAKING_CURRENCY",
        payload: data
    })
}