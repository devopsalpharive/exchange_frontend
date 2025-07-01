/** Packages */
import axios from "axios";

/** Config */
import config from "./env";

/** Add token refersh every time */
axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};


export const priceConversion = async (base, convert) => {
    try {
        const value = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${convert}&api_key=${config.cryptocompare}`);
        if (value.data?.[`${convert}`]) {
            console.log("marketPriceUSD : ", value.data[`${convert}`])
            return value.data[`${convert}`]
        }
    } catch (e) {
        console.log("priceConversion__err", e)
        return 0
    }
}

/** Whole the number  */
export const toFixedNumber = (x) => {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}

/** Days Calculation */
export const overNightCalculation = (createdDate, endDate) => {
    try {
        // For day calculation
        let startDate = new Date(createdDate)
        startDate.setSeconds(0);
        startDate.setMinutes(0);
        startDate.setHours(0);
        let newDate = new Date(endDate)
        newDate.setSeconds(0);
        newDate.setMinutes(0);
        newDate.setHours(0);
        let differ = startDate.getTime() - newDate.getTime();
        var daydiff = Math.abs(differ / (1000 * 60 * 60 * 24), 0).toFixed(4);
        // var hrsdiff = Math.abs(differ / (1000 * 60 * 60), 0).toFixed(0) % 24;
        // var daySplit = daydiff.toString().split('.')
        // var dateDiffer = new Date().getDate() - new Date(createdDate).getDate();
        var age = daydiff
        age = Math.ceil(parseFloat(age))
        // console.log(age,'age__overNightCalculation',createdDate,differ,daydiff,hrsdiff,dateDiffer,new Date(createdDate).getTime(),new Date().getTime())
        return age
    } catch (e) {
        console.log("overNightCalculation_err", e)
        return 0
    }
}


export const capitalize = (s) => {
    try {
        if (typeof s !== 'string') {
            return ''
        }
        let val = s.split('_')
        if (val.length > 1) {
            return val[0].charAt(0).toUpperCase() + val[0].slice(1) + " " + val[1].charAt(0).toUpperCase() + val[1].slice(1)
        } else {
            // //console.log(s.charAt(0).toUpperCase(),s.slice(1),'s.charAt(0).toUpperCase()')
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    } catch (err) {
        //console.log(err,'capitalize')
    }
}
export default axios