/** Pacakges */
import { jwtDecode } from 'jwt-decode'
import isEmpty from 'is-empty'

/** Config */
import axios, { Axios, setAuthToken } from "../config/axios"
import config from "../config/env"


export const createApplicant = async (data) => {
    try {
        let respData = await axios({
            'url': `/sumsub/createApplicant`,
            'method': 'post',
            'data': data
        });
        console.log("createApplicant_data", respData);
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (err) {
        console.log(err, 'createApplicant_err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}
