/** Pacakges */
import { jwtDecode } from 'jwt-decode'

/** Config */
import axios, { Axios, setAuthToken } from "../config/axios"
import config from "../config/env"

/** Redex-Actions */
import { setIsAuth, userAction, userAssetAction } from "./userRedexActions"
import { createSocketUser } from '../config/socketConnectivity'
import isEmpty from 'is-empty'


export const userRegister = async (data) => {
    try {
        // const getData = await axios.post(`${config.BASE_URL}/user/userRegistration`, data);
        console.log("datadata", data);
        const getData = await Axios({
            url: `${config.BASE_URL}/user/userRegistration`,
            method: "post",
            data
        })
        console.log("userRegister_data", getData.data.success);
        return { status: getData?.data?.success, data: getData?.data, message: getData?.data?.message }
    } catch (e) {
        console.log("userRegister_err", e);
        return { status: false, error: e.response.data.errors }
    }
}

export const userVerifiedMobile = async (data) => {
    try {
        // const getData = await axios.post(`${config.BASE_URL}/user/checkVerifiedMobile`, data);
        const getData = await Axios({
            url: `${config.BASE_URL}/user/checkVerifiedMobile`,
            method: "post",
            data
        })
        console.log("userVerifiedMobile_data", getData);
        return { status: getData?.data?.success, data: getData?.data, error: getData?.data?.error }
    } catch (e) {
        console.log("userVerifiedMobile_err", e);
        return { status: false, error: e.response.data.errors }
    }
}


export const userActivation = async (data) => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/user/userActivation/${data}`);
        console.log("userActivation_data", getData.data);
        return { status: getData.data.success, data: getData.data }
    } catch (e) {
        console.log("userActivation_err", e);
        return { status: false, error: e.response.data }
    }
}


export const userLogin = async (data, url) => {
    try {
        const getData = await Axios({
            url: `${config.BASE_URL}/user/${url}`,
            method: 'post',
            data: data
        });
        // axios.post(`${config.BASE_URL}/user/${url}`, data);
        console.log("userLogin_data1", getData);

        if (!isEmpty(getData.data.token)) {
            localStorage.setItem('token', getData.data.token)
            setAuthToken(getData.data.token);
            console.log(getData.data.token, 'getData.data.token')
            setIsAuth(true)
            const decoded = jwtDecode(getData.data.token);
            createSocketUser(decoded.userId)
            userData(); // Initially calls the user Data
        }

        return {
            status: getData.data.success,
            error: getData.data.errors,
            message: getData.data.message,
            data: getData.data.status,
            type: getData.data.type,
            mobileNumber: getData.data.data
        }

    } catch (e) {
        console.log("userLogin_err", e);
        return { status: false, error: e.response.data }
    }
}


export const userLogout = async () => {
    try {
        const getData = await axios({
            url: `/user/userLogout`,
            method: 'get'
        });
        console.log("userData_data", getData.data);
        localStorage.removeItem("token");
        setAuthToken(false);
        window.location.href = `${window.location.origin}/login`;

    } catch (e) {
        console.log("userLogout_err", e);
        localStorage.removeItem("token");
        setAuthToken(false);
        // console.log("codesssssss", code);
        window.location.href = `${window.location.origin}/login`;
    }
}


export const userData = async () => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/user/userDetails`);
        const getData = await Axios({
            url: `${config.BASE_URL}/user/userDetails`,
            method: 'get'
        });
        console.log("userData_data", getData.data);
        userAction(getData.data.data)
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("userData_err", e);
    }
}


export const userAssets = async (data) => {
    try {
        const getData = await Axios({
            url: `/user/userAssetData/${data.userId}`,
            method: 'get',
            params: data
        });
        console.log("userUpdateBankDetails_data", getData);
        userAssetAction(getData.data.data)
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData.data.data
        }

        // axios.get(`${config.BASE_URL}/user/userAssetData/${data.userId}`, { params: data });
        // return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("userAssets_err", e);
        return {
            status: false,
            message: 'Error on submit'
        }
    }
}


export const userKycSubmit = async (data) => {
    try {
        const getData = await axios.post(`${config.BASE_URL}/user/userKycSubmit`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log("userKycSubmit_data", getData.data);
        return { status: true, message: getData.data.message }
    } catch (e) {
        console.log("userKycSubmit_err", e);
    }
}


export const usergenerateUserSessionId = async (type) => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/user/generateUserSessionId/${type}`);
        const getData = await Axios({
            url: `${config.BASE_URL}/user/generateUserSessionId/${type}`,
            method: 'get',
        });
        console.log("usergenerateUserSessionId_data", getData.data);
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("usergenerateUserSessionId_err", e);
    }
}

export const userWalletTransfer = async (data, key) => {
    try {
        const getData = await Axios({
            url: `${config.BASE_URL}/user/walletTransfer`,
            method: 'post',
            data: data,
            secretKey: key
        });
        // await axios.post(`${config.BASE_URL}/user/walletTransfer`, data);
        console.log("userWalletTransfer_data", getData.data);
        // return { status: true, data: getData.data }
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData.data.data
        }
    } catch (e) {
        console.log("   ", e);
        return { status: false, error: e.response.data }
    }
}



export const userAddBankDetails = async (data) => {
    try {
        const getData = await axios.post(`${config.BASE_URL}/user/addBankDetails`, data);
        console.log("userWalletTransfer_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log(" userAddBankDetails_err  ", e);
        return { status: false, error: e.response.data }
    }
}



export const userUpdateBankDetails = async (data) => {
    try {
        const getData = await axios.post(`${config.BASE_URL}/user/updateUserBankDetails`, data);
        console.log("userUpdateBankDetails_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("userUpdateBankDetails_err", e);
        return { status: false, error: e.response.data }
    }
}

export const userDeleteBankDetails = async (data) => {
    try {
        const getData = await axios.post(`${config.BASE_URL}/user/deleteUserBankDetails`, data);
        console.log("userUpdateBankDetails_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("userUpdateBankDetails_err", e);
        return { status: false, error: e.response.data }
    }
}


export const getSynapsStatus = async () => {
    try {
        let respData = await axios({
            'url': `/user/getsynapsStatus`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
        }
    } catch (err) {
        console.log(err, 'getSynapsStatus__err')
        // return {
        //     status: err?.response?.data?.success,
        //     message: err?.response.data?.message
        // }
    }
}
export const userKyc = async (data) => {
    try {
        const kyc = await Axios({
            url: `/user/userKycVerification`,
            method: 'post',
            data: data
        });
        console.log("userUpdateBankDetails_data", kyc.data);
        return {
            status: kyc?.data?.success,
            message: kyc?.data?.message,
            errors: kyc?.data?.errors
        }
    } catch (e) {
        console.log("userKyc_err", e);
        return {
            status: false,
            message: 'Error on submit'
        }
    }
}


export const updateUserProfile = async (data) => {
    try {
        const profile = await axios.post(`${config.BASE_URL}/user/updateUserProfile`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        // const profile = await Axios({
        //     url:`${config.BASE_URL}/user/updateUserProfile`,
        //     method:"post",
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     data
        // })
        console.log("userUpdateBankDetails_data", profile);
        return { status: profile.data.success, data: profile.data }
    } catch (e) {
        console.log("updateUserProfile_err", e);
        return { status: false, error: e.response.data }
    }
}


export const updateUserEmail = async (data, key) => {
    try {
        console.log("updateUserEmail", data, key);

        const profile = await Axios({
            url: `/user/updateEmail`,
            method: 'post',
            data: data,
            secretKey: key
        });
        // await axios.post(`${config.BASE_URL}/user/updateEmail`, data);
        return {
            status: profile?.data?.success,
            message: profile?.data?.message,
            errors: profile?.data?.errors
        }
    } catch (e) {
        console.log("updateUserEmail_err", e);
        return { status: false, error: e.response.data }
    }
}

export const updateVerificationEmail = async (data) => {
    try {
        const profile = await axios.put(`${config.BASE_URL}/user/updateEmail`, data);
        console.log("updateVerificationEmail", profile.data);
        return { status: true, data: profile.data }
    } catch (e) {
        console.log("updateVerificationEmail_err", e);
        return { status: false, error: e.response.data }
    }
}

export const updateVerificationActivate = async (data) => {
    try {
        const profile = await axios.patch(`${config.BASE_URL}/user/updateEmail`, data);
        console.log("updateVerificationEmail", profile.data);
        return { status: true, data: profile.data }
    } catch (e) {
        console.log("updateVerificationEmail_err", e);
        return { status: false, error: e.response.data }
    }
}


export const forgotPassword = async (data) => {
    try {
        const getData = await Axios({
            url: `/user/forgotPassword`,
            method: 'post',
            data: data
        });
        // await axios.post(`${config.BASE_URL}/user/forgotPassword`, data);
        console.log("forgotPassword", getData);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData.data.data
        }
    } catch (e) {
        console.log("forgotPassword_err", e);
        return { status: false, error: e.response.data }
    }
}

export const checkExpireForgotPassword = async (data) => {
    try {
        const forgotPass = await axios.post(`${config.BASE_URL}/user/expireForgotToken`, data);
        console.log("checkExpireForgotPassword", forgotPass.data);
        return { status: true, data: forgotPass.data }
    } catch (e) {
        console.log("checkExpireForgotPassword_err", e);
        return { status: false, error: e.response.data }
    }
}

export const resetPassword = async (data) => {
    try {
        const getData = await Axios({
            url: `/user/resetPassword`,
            method: 'post',
            data: data
        });

        // await axios.post(`${config.BASE_URL}/user/resetPassword`, data);
        console.log("resetPassword", getData.data);
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData.data.data
        }
    } catch (e) {
        console.log("resetPassword_err", e);
        return { status: false, error: e.response.data }
    }
}


export const updateUserSettings = async (data, key) => {
    try {
        const getData = await Axios({
            url: `/user/updateUserSettings`,
            method: 'post',
            data: data,
            secretKey: key
        });
        // await axios.post(`${config.BASE_URL}/user/updateUserSettings`, data);
        console.log("updateUserSettings", getData.data);
        // return { status: true, data: updateSettings.data }
        return {
            status: getData?.data?.success,
            message: getData?.data?.message,
            errors: getData?.data?.errors,
            data: getData.data.data
        }
    } catch (e) {
        console.log("updateUserSettings_err", e);
        return { status: false, error: e.response.data }
    }
}


export const closeAccount = async (key) => {
    try {
        const userClose = await Axios({
            url: `${config.BASE_URL}/user/closeAccount`,
            method: 'post',
            secretKey: key
        });
        return {
            status: userClose?.data?.success,
            message: userClose?.data?.message
        }
    } catch (e) {
        console.log("closeAccount_err", e);
        return { status: false, error: e.response.data }
    }
}


export const recentTranscations = async (data) => {
    try {
        const userClose = await axios.post(`${config.BASE_URL}/escroWallet/recentTranscations`, data);
        return { status: true, data: userClose.data }
    } catch (e) {
        console.log("recentTranscations_err", e);
        return { status: false, error: e.response.data }
    }
}

export const getUserOption = async (data) => {
    try {
        let respData = await axios({
            'url': `/user/whitelistoption`,
            'method': 'post',
            'data': data,
            // 'secretKey': key
        })
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message
        }
    } catch (err) {
        console.log(err, 'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            result: err.response.data.data,
        }
    }
}
export const verifyMobileNumber = async (data) => {
    try {
        // const getOtp = await axios.post(`${config.BASE_URL}/user/sendOtp`, data);
        const respData = await Axios({
            'url': `${config.BASE_URL}/user/sendOtp`,
            'method': 'post',
            data
        })
        console.log("getOtpgetOtpgetOtpgetOtp", respData);
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.error
        }
    } catch (e) {
        console.log("verifyMobileNumber_err", e);
        return { status: false, error: e.response.data }
    }
}

export const verifyMobileNumberOtp = async (data) => {
    try {
        // const getOtp = await axios.post(`${config.BASE_URL}/user/verifyOtp`, data);
        const getOtp = await Axios({
            url: `${config.BASE_URL}/user/verifyOtp`,
            method: "post",
            data
        })
        console.log("getOtpgetOtpgetOtpgetOtp1", getOtp);
        return { status: getOtp?.data?.success, data: getOtp.data }
    } catch (e) {
        console.log("verifyMobileNumber_err", e);
        return { status: false, error: e.response.data }
    }
}


export const update2faType = async (data, key) => {
    try {
        const respData = await Axios({
            url: `${config.BASE_URL}/user/update2faType`,
            method: "get",
            params: data,
            secretKey: key
        })
        console.log("update2faTypeupdate2faType", respData);
        // await axios.get(`${config.BASE_URL}/user/update2faType`, { params: data });
        // return { status: true, data: getOtp.data }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.error
        }
    } catch (e) {
        console.log("update2faType_err", e);
        return { status: false, error: e.response.data }
    }
}



export const oldMobileOtp = async () => {
    try {
        const getOtp = await axios.get(`${config.BASE_URL}/user/updateMobileNumber`);
        return { status: true, data: getOtp.data }
    } catch (e) {
        console.log("oldMobileOtp_err", e);
        return { status: false, error: e.response.data }
    }
}

export const verifyOldMobileOtp = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `${config.BASE_URL}/user/updateMobileNumber`,
            'method': 'post',
            'data': data,
            'secretKey': key
        });
        // axios.post(`${config.BASE_URL}/user/updateMobileNumber`, data);
        // return { status: true, data: getOtp.data }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.error
        }
    } catch (e) {
        console.log("verifyOldMobileOtp_err", e);
        return { status: false, error: e.response.data }
    }
}

export const newMobileOtp = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `${config.BASE_URL}/user/updateMobileNumber`,
            'method': 'put',
            'data': data,
            'secretKey': key
        });
        // await axios.put(`${config.BASE_URL}/user/updateMobileNumber`, data);
        // return { status: true, data: getOtp.data }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.errors
        }
    } catch (e) {
        console.log("newMobileOtp_err", e);
        return { status: false, error: e.response.data }
    }
}

export const updateMobileNumber = async (data, key) => {
    try {
        const respData = await Axios({
            'url': `${config.BASE_URL}/user/updateMobileNumber`,
            'method': 'patch',
            'data': data,
            'secretKey': key
        });
        console.log("updateMobileNumber_data", respData);
        //  await axios.patch(`${config.BASE_URL}/user/updateMobileNumber`, data);
        // return { status: true, data: getOtp.data }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.errors
        }
    } catch (e) {
        console.log("updateMobileNumber_err", e);
        return { status: false, error: e.response.data }
    }
}


export const refferalDetails = async (secretKey) => {
    try {
        const getData = await Axios({
            'url': `${config.BASE_URL}/user/getRefferalDetails`,
            'method': 'get',
            'secretKey': secretKey
        });

        // await axios.get(`${config.BASE_URL}/user/getRefferalDetails`);
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("refferalDetails_err", e);
        return { status: false, error: e.response.data }
    }
}


export const getRefferalTranscations = async (data, secretKey) => {
    try {
        const respData = await Axios({
            'url': `${config.BASE_URL}/user/getRefferalTranscations`,
            'method': 'get',
            'params': data,
            'secretKey': secretKey
        });
        console.log("getReferral_datadatadatadatadatadata", respData);

        // await axios.get(`${config.BASE_URL}/user/getRefferalTranscations`, { params: data });
        // return { status: true, data: getData.data.data }
        return {
            status: respData.data.success,
            result: respData.data.data,
            message: respData.data?.message,
            errors: respData?.data?.error,
            count: respData?.data?.count
        }
    } catch (e) {
        console.log("getRefferalTranscations_err", e);
        return { status: false, error: e.response.data }
    }
}

export const getsiteSettings = async () => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/admin/getSiteSettings`);
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("siteSettings_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}

export const getActivities = async (data, key) => {
    try {
        // const getData = await axios.get(`${config.BASE_URL}/user/getUserActivity`, { params: data });
        const getData = await Axios({
            url: `${config.BASE_URL}/user/getUserActivity`,
            method: "get",
            params: data,
            secretKey: key
        });
        return { status: getData?.data?.success, data: getData.data }
        // return { status: true, data: getData.data }
    } catch (e) {
        console.log("siteSettings_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}


// getPassBookHistory ------------------>

export const passBookHistory = async (data) => {
    try {
        console.log("data", data);
        const getData = await axios.get(`${config.BASE_URL}/escroWallet/passBookHistory`, { params: data });
        console.log('getData', getData);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("siteSettings_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}

// contact Us  ------------------>

export const saveContactUs = async (data) => {
    try {
        console.log("data", data);
        const getData = await axios.post(`${config.BASE_URL}/contactUs/saveContactUsMsg`, data);
        console.log('getData', getData)
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("siteSettings_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}

// getTopGainers ------------------>

export const getTopGainers = async () => {
    try {
        const getData = await axios.get(`${config.BASE_URL}/pair/getTopGainer`);
        console.log('getData', getData)
        return { status: true, data: getData.data.data }
    } catch (e) {
        console.log("siteSettings_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}

export const get2faCode = async (key) => {
    try {
        let respData = await Axios({
            'url': `/user/security/2fa`,
            'method': 'get',
            "secretKey": key
        })
        return {
            status: respData.data.success,
            result: respData.data.result,
        }
    } catch (err) {
        console.log(err, 'get2faCode__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}

export const Enable2fa = async (data, key) => {
    try {
        let respData = await Axios({
            'url': `/user/security/2fa`,
            'method': 'put',
            'data': data,
            "secretKey": key
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result
        }
    } catch (err) {
        console.log(err, 'Enable2fa__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const Disable2fa = async (data, key) => {
    try {
        let respData = await Axios({
            'url': `/user/security/2fa`,
            'method': 'patch',
            'data': data,
            "secretKey": key
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result
        }
    } catch (err) {
        console.log(err, 'Disable2fa__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}



export const userKycRatelimit = async () => {
    try {
        let respData = await axios({
            'url': `/user/userKycRatelimit`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.result
        }
    } catch (err) {
        console.log(err, 'Disable2fa__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const SetApplicantIdaction = async (data) => {
    try {
        let respData = await axios({
            'url': `/user/updateApplicantId`,
            'method': 'post',
            'data': data
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (err) {
        console.log(err, 'SetApplicantIdaction_err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getAccessToken = async () => {
    try {
        let respData = await axios({
            'url': `/user/creatingAccessToken`,
            'method': 'get',
        })
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (err) {
        console.log(err, 'getAccessToken_err')
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}



export const getConvertEstimate = async (data) => {
    try {
        const respData = await axios({
            'url': '/user/convertEstimate',
            'method': 'post',
            data
        })
        console.log("respData", respData)
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (error) {
        console.log("getConvertEstimate_err", error)
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}


export const getConvertConfirm = async (data) => {
    try {
        const respData = await axios({
            'url': '/user/convertConfirm',
            'method': 'post',
            data
        })
        console.log("respData", respData)
        return {
            status: respData.data.success,
            message: respData.data.message,
            result: respData.data.data
        }
    } catch (error) {
        console.log("getConvertConfirm_err", error)
        return {
            status: err.response.data.success,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}