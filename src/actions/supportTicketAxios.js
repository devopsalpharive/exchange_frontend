/** Pacakges */
import axios, { setAuthToken } from "../config/axios"
import { Axios } from "../config/axios"

/** Config */
import config from "../config/env"

// Get Reply List User----->

export const userReplyList = async (data) => {
    try {
        const getData = await axios({
            'url': `/support/getAllReplyByAdmin`,
            'method': 'get',
            'params': data
        })
        console.log("getData", getData);
        return {
            status: getData.data.success,
            data: getData.data.data,
            message: getData.data.message
        }
    } catch (error) {
        console.log("raiseTicket_err", error);
        return {
            status: error.data.success,
            error: error.response.message,
            data: {}
        }
    }
}

// getTicketList User ---->

export const userTicketList = async (data) => {
    try {
        const getData = await axios({
            'url': `/support/getTicketList`,
            'method': 'get',
            'params': data
        })
        return {
            status: getData.data.success,
            data: getData.data.data,
            message: getData.data.message,
            count: getData.data.count
        }
    } catch (error) {
        console.log("UserTicket_err", error);
        return {
            status: error.response.success,
            error: error.response.message,
            data: {}
        }
    }
}

// rise Ticket ------>

export const raiseTicket = async (data) => {
    try {
        // const getData = await axios.post(`${config.BASE_URL}/support/raiseTicket`,  data )
        const getData = await axios({
            'url': `/support/raiseTicket`,
            'method': 'post',
            data
        })
        console.log("getData", getData);
        return {
            status: getData.data.success,
            message: getData.data.message
        }
    } catch (error) {
        console.log("raiseTicket_err", error);
        return {
            status: error.response.data.success,
            error: error.response.data.error,
            message: error.response.data.message,
            data: {}
        }
    }
}

// Send user message ----->

export const sendUserMessage = async (data) => {
    try {

        const getData = await axios({
            'url': `/support/sendUserMessage`,
            'method': 'post',
            data
        })
        console.log("getData", getData);
        return {
            status: getData.data.success,
            message: getData.data.message
        }
    } catch (error) {
        console.log("raiseTickett_err", error.response.data.success);
        return {
            status: error.response.data.success,
            error: error.response.data.message,
            data: {}
        }
    }
}

