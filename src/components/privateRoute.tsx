import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { selectToken } from '../slice/token';

export const PrivateRoute = ({ children }: any) => {
    let history: any = useLocation();
    const token = useSelector(selectToken)
    if (!token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }
    // authorized so return child components
    return children;
};
