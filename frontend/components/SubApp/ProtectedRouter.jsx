import React from 'react';
import {useAuth} from "../../context/AuthContext";
import {Outlet,Navigate} from "react-router-dom";

export const ProtectedRoute = () => {
    const {isLoggedIn,loading} = useAuth();
    if(loading){
        return <div>loading...</div>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}