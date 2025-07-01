// import packages
import axios from 'axios';

// import lib
import config from './env';
import { getAuthToken } from '../lib/localStorage'
import { encryptObject, decryptObject } from '../lib/CryptoJs';
import { isEmpty } from '../lib/isEmpty';
import { userLogout } from '../actions/userAction';

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.common['Authorization'] = getAuthToken();

axios.defaults.headers.common['Content-Security-Policy'] =
    "default-src 'self'; " +
    `script-src 'self' ${config.FRONT_URL} 'unsafe-inline' 'unsafe-eval'; ` +
    `style-src 'self'  ${config.FRONT_URL} 'unsafe-inline'; ` +
    `img-src 'self' data:  ${config.FRONT_URL}; ` +
    `font-src 'self'  ${config.FRONT_URL}; ` +
    `connect-src 'self'  ${config.FRONT_URL}; ` +
    `media-src 'self'  ${config.FRONT_URL}; ` +
    `frame-src 'self'  ${config.FRONT_URL}; ` +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "upgrade-insecure-requests; " +
    "block-all-mixed-content;";

export const Axios = async (reqData) => {
    try {
        // console.log("Axios+reqDatareqData", reqData);
        if (!isEmpty(reqData.data)) {
            let token = encryptObject(reqData.data, !isEmpty(reqData.secretKey) ? reqData.secretKey : config.SERCERT_KEY)
            delete reqData.data
            console.log(token, 'Axios')
            reqData['data'] = { token: token }
        }
        const response = await axios(reqData);
        console.log(response.data, 'response')
        if (!isEmpty(response)) {
            let respData = decryptObject(response.data, !isEmpty(reqData.secretKey) ? reqData.secretKey : config.SERCERT_KEY)
            console.log(respData, 'Axios')
            return { data: respData }
        }
    } catch (err) {
        console.log(err, 'Axios__err', err.response?.data, err.response?.status, err?.response?.data?.statusCode)
        if (err?.response?.data?.statusCode == 401) {
            userLogout()
        } if (err?.response?.status == 429) {
            return { data: err?.response?.data }
        }
        let respData = decryptObject(err.response.data, !isEmpty(reqData.secretKey) ? reqData.secretKey : config.SERCERT_KEY)
        console.log(respData, 'respData_Axios')
        return { data: respData }
    }
}

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default axios