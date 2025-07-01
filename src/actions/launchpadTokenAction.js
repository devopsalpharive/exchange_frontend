/** Pacakges */
import axios, { setAuthorization, Axios } from '../config/axios';

/** Config */
import config from "../config/env"


export const TokenCreateRequest = async (data, key) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/tokenCreateRequest`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data.message
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            errors: err.response.data.error
        }
    }
}
