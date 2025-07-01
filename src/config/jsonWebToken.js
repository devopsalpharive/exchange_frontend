import { jwtDecode } from 'jwt-decode';

/** STORE */
import store from '../redux/store';
import { createSocketUser } from './socketConnectivity';

export const decodeJwt = (token) => {
    if (token) {
        token = token.replace('Bearer ', '')
        const decoded = jwtDecode(token);
        if (decoded) {
            createSocketUser(decoded.userId)
        }
    }
}
