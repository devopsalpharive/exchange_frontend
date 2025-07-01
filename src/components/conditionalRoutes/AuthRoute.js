/** packages */
import React from 'react';
import { Navigate } from 'react-router-dom';
import isEmpty from 'is-empty';

export function AuthRoute({ children }) {
    // the user verification logic is up to your applicatione 
    const rememberMe = localStorage.getItem('token');
    if (isEmpty(rememberMe)) {
        return children; // render the wrapped page
    } else {
        const page = sessionStorage.getItem('loginFrom');
        console.log("THES SESSION", page);
        if (page == null || page == undefined || page == '') {
            console.log("THES SESSION1", page);
            return <Navigate to={'/wallet'} /> // user not logged in, redirect to the Login page which is unprotected
        } else {
            console.log("THES SESSION11", page);
            return <Navigate to={page} /> // user not logged in, redirect to the Login page which is unprotected
        }
    }
}