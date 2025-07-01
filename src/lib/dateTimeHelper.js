// import package
import moment from 'moment';

// import lib
import { isEmpty } from './isEmpty';

export const dateTimeFormat = (dateTime, format = 'YYYY-MM-DD HH:mm:ss') => {
    try {
        if (!isEmpty(dateTime)) {
            let newDateTime = new Date(dateTime);
            if (format.includes('YYYY')) {
                format = format.replace('YYYY', newDateTime.getFullYear())
            }

            if (format.includes('MM')) {
                let month = newDateTime.getMonth() + 1;
                month = month > 9 ? month : `0${month}`
                format = format.replace('MM', month)
            }

            if (format.includes('DD')) {
                let date = newDateTime.getDate();
                date = date > 9 ? date : `0${date}`
                format = format.replace('DD', date)
            }

            if (format.includes('HH')) {
                let hour = newDateTime.getHours();
                hour = hour > 9 ? hour : `0${hour}`
                format = format.replace('HH', hour)
            }

            if (format.includes('mm')) {
                let minute = newDateTime.getMinutes();
                minute = minute > 9 ? minute : `0${minute}`
                format = format.replace('mm', minute)
            }

            return format

        } else {
            return ''
        }
    } catch (err) {
        return ''
    }
}

export const momentFormat = (dateTime, format = 'DD-MM-YYYY HH:mm:ss') => {
    try {
        if (!isEmpty(dateTime)) {
            let newDateTime = new Date(dateTime);
            return moment(newDateTime).format(format)
        }
        return ''
    } catch (err) {
        console.log(err, 'momentFormat__err')
        return ''
    }
}

export const strategyAge = (createdDate) => {
    try {

        let diffTime = Math.abs(new Date(createdDate).getTime() - new Date().getTime());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
        console.log(days + 'days', hours + 'h', minutes + 'm', secs + 's');
        var age = days == 0 ? `${hours} hours` : `${days} days ${hours} hours`
        return age
    } catch (e) {
        console.log('strategyAge_err', e)
    }
}