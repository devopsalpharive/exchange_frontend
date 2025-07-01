/** Pacakges */
import axios from "axios"

/** Config */
import config from "../config/env"

/** Redex-Actions */



export const supportTicket = async (data) => {
    try{
        let respData = await axios({
            'url': `/user/supportTicket`,
            'method': 'post',
            'data':data
        })
        return {
            status: respData.data.success,
            result : respData.data.result,
            message : respData.data.message,
        }
    }catch(err){
        console.log(err,'getOrderBook__err')
        return {
            status: err.response.data.success,
            message: err.response.data.message
        }
    }
}