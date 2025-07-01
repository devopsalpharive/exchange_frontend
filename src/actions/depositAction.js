/** Pacakges */
import axios from "axios"
import { jwtDecode } from 'jwt-decode'

/** Config */
import config from "../config/env"

/** Redex-Actions */



export const depositRequest = async (data) => {
    try {
        const respData = await axios.post(`${config.BASE_URL}/escroWallet/depositRequest`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log("depositRequest_data", respData.data);
        return {
            status: respData.data.success,
            message: respData.data.message
        }
    } catch (e) {
        console.log("depositRequest_err", e);
        return {
            status: e.response.data.success,
            error: e.response.data.errors,
            message: e.response.data.message
        }
    }
}


export const DepositRequestList = async (data) => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/escroWallet/deposit-request-list`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log("depositRequest_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("depositRequest_err", e);
        return { status: false, error: e.response.data }
    }
}


export const createVirtualAccount = async (id) => {
    try {
        console.log("axios_createVirtualAccountcreateVirtualAccount", id);
        const respData = await axios.get(`${config.BASE_URL}/escroWallet/createVirtualAccount`, { params: { id } });
        return {
            status: respData.data.success,
            message: respData.data.message,
            data: respData.data.data
        }
    } catch (e) {
        console.log("createVirtualAccount_err", e);
        return {
            status: e.response.data.success,
            error: e.response.data.errors,
            message: e.response.data.message
        }
    }
}