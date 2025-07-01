// import lib
import { isEmpty } from '../lib/isEmpty';

export const validation = (value) => {
    let errors = {};
    if (isEmpty(value.secret)) {
        errors.secret = "Secret is required"
    }

    if (isEmpty(value.uri)) {
        errors.uri = "URI is required"
    }

    if (isEmpty(value.code)) {
        errors.code = "Code is required"
    } else if (isNaN(value.code) || value.code.length > 6) {
        errors.code = "Invalid code"
    }

    if (value.checkValue == false) {
        errors.checkValue = "Please check option"
    }

    return errors;
}