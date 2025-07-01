/** STORE */
import store from '../redux/store';

export const launchpadLists = (data) => {
    store.dispatch({
        type: "LAUNCHPAD_LIST",
        payload: data
    })
}