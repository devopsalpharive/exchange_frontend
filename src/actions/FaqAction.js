/** Pacakges */
import axios, { setAuthToken } from "../config/axios"

/** Config */
import config from "../config/env"



/** Axios call for getActiveFaq */
  export const getAllFaq = async (data) => {
    try {
        const respData = await axios({
            url: `${config.BASE_URL}/faq/getActiveFaq`,
            method: 'get',
            params: data
        });
        console.log("getAllFaq_data", respData.data);
        return {
            status: true,
            data: respData.data,
            count: respData.data.count 
        };
    } catch (err) {
        console.log("getAllFaq_err", err);
        return {
            status: false,
            error: err.response.data,            
        };
    }
};