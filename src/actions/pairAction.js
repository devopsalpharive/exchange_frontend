/** Pacakges */
import axios, { setAuthorization } from '../config/axios';

/** Config */
import config from "../config/env"

/** Redex-Actions */
import { setPairList } from "./pairReduxAction";
import { setMarginPairList } from './MarginReduxAction';
import isEmpty from "is-empty";


export const getPairList = async (data) => {
    try {
        let respData = await axios({
            'url': `/pair/pairList`,
            'method': 'get',
            'params': data
        })
        console.log(respData?.data?.data, 'getPairList', data)
        // const respData = await axios.get(`${config.BASE_URL}/pair/pairList`);
        if (!isEmpty(respData?.data?.data) && !data.isMargin) {
            let ActivePairlist = respData.data.data.filter((val) => { return val.status == 'active' })
            setPairList(ActivePairlist)
        } else if (!isEmpty(respData?.data?.data) && data.isMargin) {
            let ActivePairlist = respData.data.data.filter((val) => { return val.status == 'active' })
            setMarginPairList(ActivePairlist)
        }
        return { status: true, data: respData.data.data }
    } catch (e) {
        console.log("currencyListddddd_err", e);
        return { status: false, error: e.response.data.errors }
    }
}