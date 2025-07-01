/** Pacakges */
import axios, { setAuthToken, Axios } from "../config/axios"

/** Config */
import config from "../config/env"




export const getCms = async (data) => {
    try {
        console.log("getAdminCms_data", data);
        const getData = await Axios({
            'url': '/admin/getCms',
            'method': 'get',
            'params': data
        });
        // await axios.get(`${config.BASE_URL}/admin/getCms`, { params: data });
        console.log("getAdminCms_data", getData.data);
        return { status: true, data: getData.data }
    } catch (e) {
        console.log("getAdminCms_err", e);
        return { status: false, error: e.response.data, data: {} }
    }
}