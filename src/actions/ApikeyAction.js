/** Pacakges */
import axios, { setAuthorization } from '../config/axios';

/** Redex-Actions */
import isEmpty from "is-empty";


export const CreateNewKey = async (data) => {
    try {
        let respData = await axios({
            'url': `/key/createkey`,
            'method': 'post',
            'data': data
        })
        console.log(respData?.data, 'CreateNewKey', data)
        return {
            success: respData.data.success,
            status: respData.data.status,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        console.log("CreateNewKey_err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const EditApikey = async (data) => {
    try {
        let respData = await axios({
            'url': `/key/edit`,
            'method': 'post',
            'data': data
        })
        console.log(respData?.data, 'EditApikey', data)
        return {
            success: respData.data.success,
            status: respData.data.status,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        console.log("EditApikey__err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getApikeyList = async () => {
    try {
        let respData = await axios({
            'url': `/key/list`,
            'method': 'get'
        })
        console.log(respData?.data, 'getApikeyList')
        return {
            status: respData.data.success,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        console.log("getApikeyList__err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const changeStatus = async (id) => {
    try {
        let respData = await axios({
            'url': `/key/changeStatus/${id}`,
            'method': 'patch'
        })
        console.log(respData?.data, 'changeStatus', data)
        return {
            status: respData.data.success,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        console.log("changeStatus__err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const DeleteApikey = async (id) => {
    try {
        let respData = await axios({
            'url': `/key/remove/${id}`,
            'method': 'delete'
        })
        console.log(respData?.data, 'DeleteApikey', data)
        return {
            status: respData.data.success,
            result: respData.data.result,
            message: respData.data.message
        }
    } catch (err) {
        console.log("DeleteApikey__err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}