/** Packages */
import { Navigate } from 'react-router-dom';
import React from 'react';
import isEmpty from 'is-empty';


export function PrivateRoute({ children }) {
    
    /** the user verification logic is up to your application */
    const rememberMe = localStorage.getItem('token');
    if (!isEmpty(rememberMe)) {
        const page = sessionStorage.getItem('loginFrom');
        if (page == null || page == undefined || page == '') {
            return children; // render the wrapped page
        } else { return <Navigate to={page} /> }
    } else {
        return <Navigate to={'/login'} /> // user not logged in, redirect to the Login page which is unprotected
    }
}