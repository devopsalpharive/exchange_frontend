/** Pacakges */
import axios from "axios";
import { Axios } from "../config/axios";
import { jwtDecode } from 'jwt-decode';

/** Config */
import config from "../config/env";




export const poolsDetails = async (data) => {
    try {
        console.log("poolsDetails_datapoolsDetails_data", data);
        const getData = await Axios({
            'url': `/staking/pools`,
            'method': 'post',
            'data': data
        })
        // return {
        //     status: respData.data.success,
        //     message: respData.data.message,
        //     result: respData.data.result
        // }
        // await axios.post(`${config.BASE_URL}/staking/pools`, data);
        return { status: getData.data.success, data: getData.data }
    } catch (e) {
        console.log("poolsDetails_err", e);
        return { status: false, error: e.response.data.errors }
    }
}


export const stakingCurrency = async () => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/staking/getCurrency`);
        // console.log("poolsDetails_data", getData.data);
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("stakingCurrency_err", e);
        return { status: false, error: e.response.data.errors }
    }
}


export const stakingUser = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `/staking/userStake`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        // await axios.post(`${config.BASE_URL}/staking/userStake`, data);
        // console.log("stakingUser", getData.data);
        // return { status: true, data: getData.data }
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result,
            errors: respData.data.errors,

        }
    } catch (e) {
        console.log("stakingUser_err", e);
        return { status: false, error: e.response.data.errors }
    }
}


export const unStakingUser = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `/staking/userUnstake`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        // await axios.post(`${config.BASE_URL}/staking/userUnstake`, data);
        console.log("stakingUser", respData.data);
        // return { status: true, data: getData.data }
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result,
            errors: respData.data.errors,
        }
    } catch (e) {
        console.log("unStakingUser_err", e);
        return { status: false, error: e.response.data }
    }
}


export const stakingClaimb = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `/staking/userClaim`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        // await axios.post(`${config.BASE_URL}/staking/userClaim`, data);
        console.log("stakingClaimb_data", respData.data);
        // return { status: true, data: getData.data }
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result,
            errors: respData.data.errors,
        }
    } catch (e) {
        console.log("stakingClaimb_err", e);
        return { status: false, error: e.response.data }
    }
}


export const stakingTranscationDetails = async (data, key) => {
    try {
        const getData = await Axios({
            'url': `/staking/userStakingTranscation`,
            'method': 'get',
            'params': data,
            'secretKey': key
        })
        // await axios.get(`${config.BASE_URL}/staking/userStakingTranscation`, { params: data });
        // console.log("stakingClaimb_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("stakingTranscationDetails_err", e);
    }
}