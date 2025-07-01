/** Pacakges */
// import axios from "axios"
import { jwtDecode } from 'jwt-decode'

/** Config */
import config from "../config/env"
import { SetPriceConversionData, setCurrencyData } from "./currencyReduxAction";
import { Axios } from "../config/axios";
// import { Axios } from "../../../admin/src/config/axios";

/** Redex-Actions */



export const currencyList = async () => {
    try {
        let respData = await Axios({
            'url': `/currency/currencyList`,
            'method': 'get',
        })
        setCurrencyData(respData.data.data)
        return { status: true, data: respData.data.data }
    } catch (e) {
        console.log("currencyList_err", e);
        return { status: false, error: e.response.data.errors }
    }
}

export const getpriceConversionList = async () => {
    try {
        let respData = await Axios({
            'url': `/currency/priceConversionList`,
            'method': 'get',
        })

        if (respData.data.data) {
            SetPriceConversionData(respData.data.data)
        }
    } catch (err) {
        console.log(err, 'priceConversionList__err')
        return {
            status: err?.response?.data?.success,
            message: err?.response?.data?.message
        }
    }
}
