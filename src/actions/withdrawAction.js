/** Config */
import axios, { Axios, setAuthToken } from "../config/axios"
import config from "../config/env"



export const userWithdrawal = async (data, secretKey) => {
    try {
        const respData = await Axios({
            url: '/withdraw/userWithdraw',
            method: 'post',
            data: data,
            secretKey: secretKey
        })
        // const getData = await axios.post(`${config.BASE_URL}/withdraw/userWithdraw`, data);
        console.log("userWithdrawalr_data", respData.data);
        return {
            success: respData.data.success,
            status: respData.data.status,
            message: respData.data.message,
            errors: respData.data.errors
        }
    } catch (e) {
        console.log("userWithdrawalr_err", e);
        return {
            success: false,
            status: false,
            error: e.toString()
        }
    }
}


export const resendWithdraw2faCode = async () => {
    try {
        const respData = await axios({
            url: '/withdraw/resendWithdraw2faCode',
            method: 'get'
        })
        console.log("resendWithdraw2faCode_data", respData.data);
        return {
            status: respData.data.success,
            data: respData.data,
            message: respData.data.message
        }
    } catch (e) {
        console.log("resendWithdraw2faCode_err", e);
        return {
            status: e.response.data.success,
            error: e.response.data
        }
    }
}
