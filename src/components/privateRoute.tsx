import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import tokenService from '../services/token.service';

export const PrivateRoute = ({ children }: any) => {
    let history: any = useLocation();
    const token = tokenService.getUser();
    if (!token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }
    // authorized so return child components
    return children;
};
