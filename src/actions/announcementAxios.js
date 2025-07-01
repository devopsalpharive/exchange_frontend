/** Pacakges */
import axios, { setAuthToken } from "../config/axios"

export const announcements = async () => {
    try {
        console.log("innn");
        const getData = await axios({
            'url':'/announcement/announcementListForUser',
            'method':'get'
        })
        console.log("getdat-->",getData);
        return {
            status:getData.data.success,
            message:getData.data.message,
            data:getData.data.data,
        }
    } catch (error) {
        console.log("announcements_err",error);
        return {
            status:error.data?.success,
            error:error.response?.message
        }
    }
}