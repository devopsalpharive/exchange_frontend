/** Pacakges */
// import axios from "axios"
import { jwtDecode } from 'jwt-decode'
import axios, { setAuthorization, Axios } from '../config/axios';

/** Config */
import config from "../config/env"
import { ApproveTokenList } from "./launchpadTokenReduxAction"

/** Redex-Actions */



export const launchpadList = async (data) => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/list`);
        let respData = await Axios({
            'url': `/launchpad/list`,
            'method': 'get'
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (e) {
        console.log("launchpadList_err", e);
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}


export const getuserLaunchpad = async (data, key) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/userLaunch`,
            'method': 'get',
            'params': data,
            'secretKey': key
        });
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data,
            count: respData.data.count
        }
    } catch (err) {
        console.log("launchpadList_err", err);
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}


export const launchpadCurrencyList = async () => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/launchpad/launchpadCurrencyList`);
        // console.log("currencyList_data", getData.data);
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("launchpadCurrencyList_err", e);
        return { status: false, error: e.response.data.errors }
    }
}

export const launchpadApproveTokenList = async (key) => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/userApprovalTokens`);
        // console.log("launchpadApproveTokenList", getData.data);
        const respData = await Axios({
            'url': `/launchpad/userApprovalTokens`,
            'method': 'get',
            'secretKey': key
        })
        console.log("launchpadApproveTokenList", respData.data);
        ApproveTokenList(respData?.data?.data)
        return {
            status: respData.data.success,
            result: respData.data.data,
        }
    } catch (e) {
        console.log("launchpadCurrencyList_err", e);
        return {
            status: e.response.data.success,
            error: e.response.data.errors
        }
    }
}


export const launchpadCreation = async (data) => {
    try {
        // const getData = await axios.post(`${config.BASE_URL}/launchpad/createLaunchpad`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        const respData = await axios({
            'url': `/launchpad/createLaunchpad`,
            'method': 'post',
            'data': data,
            'headers': { 'Content-Type': 'multipart/form-data' }
        })
        console.log("launchpadCreation_data", respData.data.success);
        // return {
        //     status: true,
        //     // data: getData.data
        // }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data.message
        }
    } catch (e) {
        console.log("launchpadList_err", e);
        return {
            status: e?.response?.data?.success,
            error: e?.response?.data?.error,
            message: e?.response?.data?.message
        }
    }
}



export const launchpadRequestToken = async (data) => {
    try {
        const getData = await axios.post(`${config.BASE_URL}/launchpad/requestToken`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log("launchpadRequestToken_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("launchpadRequestToken_err", e);
        return { status: false, error: e.response.data }
    }
}



export const launchpadSaleFinalise = async (saleId, key) => {
    try {
        console.log("launchpadSaleFinalise", saleId);
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/saleFinalise/${saleId}`);
        // console.log("launchpadSaleFinalise_data", getData.data);
        const respData = await Axios({
            'url': `/launchpad/saleFinalise/${saleId}`,
            'method': 'get',
            'secretKey': key
        });
        console.log("launchpadSaleFinalise_data", respData.data);
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (e) {
        console.log("launchpadSaleFinalise_err", e);
        return {
            status: e.response.data.success,
            errors: e.response.data.error,
            message: e.response.data.message
        }
    }
}

export const launchpadRewardClaimb = async (saleId, key) => {
    try {
        console.log("launchpadRewardClaimb", saleId);
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/claimbRewardTokens/${userId}/${saleId}`);
        // console.log("launchpadRewardClaimb_data", getData.data);
        const respData = await Axios({
            'url': `/launchpad/claimbRewardTokens/${saleId}`,
            'method': 'get',
            'secretKey': key
        });
        console.log("launchpadRewardClaimb_data", respData.data);
        return {
            status: respData.data.success,
            message: respData.data.message
        }
    } catch (e) {
        console.log("launchpadRewardClaimb_err", e);
        return {
            status: e.response.data.success,
            error: e.response?.data?.error,
            message: e.response.data.message,
        }
    }
}


export const launchpadStopsale = async (saleId, userId) => {
    try {
        console.log("launchlaunchpadStopsalepadSaleFinalise", saleId, userId);
        const getData = await axios.get(`${config.BASE_URL}/launchpad/stopSale/${saleId}/${userId}`);
        console.log("launchpadStopsale_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("launchpadStopsale_err", e);
        return { status: false, error: e.response.data }
    }
}


export const launchpadUserpurchase = async (data, key) => {
    try {
        console.log("launchpadUserpurchase_data", data);
        // const getData = await axios.post(`${config.BASE_URL}/launchpad/userPurchase`, data);
        // console.log("launchpadUserpurchase_data", getData.data);
        const respData = await Axios({
            'url': '/launchpad/userPurchase',
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        console.log("launchpadUserpurchase_data", respData.data);
        // return { status: true, data: getData.data }
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (e) {
        console.log("launchpadUserpurchase_err", e);
        return {
            status: e?.response?.data?.success,
            message: e?.response?.data?.message,
            errors: e?.response?.data?.message
        }
    }
}


export const launchpadUserContribution = async (saleId, key) => {
    try {
        // console.log("launchpadUserContribution", saleId, userId);
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/launchpadUserParticipant/${saleId}/${userId}`);
        // console.log("launchpadUserContribution_data", getData.data);
        // return { status: true, data: getData.data.data }
        const respData = await Axios({
            'url': `/launchpad/launchpadUserParticipant/${saleId}`,
            'method': 'get',
            'secretKey': key
        })
        return {
            status: respData.data.success,
            result: respData.data.data
        }
    } catch (e) {
        console.log("launchpadUserContribution_err", e);
        return { status: false, error: e.response.data }
    }
}


export const launchpadRequestTokens = async (data, key) => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/launchpad/userRequestTokensList`);
        // return { status: true, data: getData.data.data }
        const respData = await Axios({
            'url': `/launchpad/userRequestTokensList`,
            'method': 'get',
            'params': data,
            'secretKey': key
        })
        return {
            status: respData.data.success,
            result: respData.data.data,
            count: respData.data.count,
            message: respData?.data?.message
        }
    } catch (e) {
        console.log("launchpadRequestTokens_err", e);
        return {
            status: respData.data.success,
            error: e.response.data.message
        }
    }
}

export const getLaunchpadDetails = async (saleId) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/launchpadetails/${saleId}`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result,
        }
    } catch (err) {
        console.log(err, 'getLaunchpadDetails__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}


export const getLaunchpadList = async (listType, data) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/list/${listType}`,
            'method': 'get',
            'params': data
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data,
            count: respData.data.count
        }
    } catch (err) {
        console.log(err, 'getLaunchpadList__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const AddWhiteListuser = async (saleId, data, key) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/Addwhitelist/${saleId}`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        return {
            status: respData.data.success,
            message: respData.data.message
        }
    } catch (err) {
        console.log(err, 'AddWhiteListuser__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const RemoveWhiteListuser = async (data, key) => {
    try {
        let respData = await Axios({
            'url': `/launchpad/removeWhitelist`,
            'method': 'post',
            'data': data,
            'secretKey': key
        })
        return {
            status: respData.data.success,
            message: respData.data.message
        }
    } catch (err) {
        console.log(err, 'RemoveWhiteListuser__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}


export const sendPost = async (data, key) => {
    try {
        let respData = await Axios({
            url: `/launchpad/addComments`,
            method: 'post',
            data: data,
            secretKey: key
        });
        return {
            status: respData.data.success,
            data: respData.data
        };
    } catch (err) {
        console.log("postcmd_err", err);

        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        };
    }
}




export const editPost = async (data, key) => {
    try {
        let respData = await Axios({
            url: `/launchpad/editComments`,
            method: 'put',
            data: data,
            secretKey: key
        });
        return {
            status: respData.data.success,
            data: respData.data
        };
    } catch (err) {
        console.log("postcmd_err", err);

        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        };
    }
}


export const getPosts = async (data, key) => {
    try {
        let respData = await Axios({
            url: `/launchpad/getUserComments`,
            method: 'post',
            data: data,
            secretKey: key
        });
        return {
            status: respData.data.success,
            data: respData.data.data
        };
    } catch (err) {
        console.log("getPosts_err", err);

        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        };
    }
}




export const getAllPosts = async (data) => {
    try {
        let respData = await axios({
            url: `/launchpad/getAllComments`,
            method: 'get',
            params: data
        });
        return {
            status: respData.data.success,
            data: respData.data
        };
    } catch (err) {
        console.log("getAllComments_err", err);

        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        };
    }
}




export const getRoleName = async (data, key) => {
    try {
        let respData = await Axios({
            url: `/launchpad/getRoleName`,
            method: 'get',
            params: data,
            secretKey: key
        });
        console.log("getRoleName_daats", respData);
        return {
            status: respData.data.success,
            data: respData.data
        };
    } catch (err) {
        console.log("getRoleName_err", err);

        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.error
        };
    }
}




