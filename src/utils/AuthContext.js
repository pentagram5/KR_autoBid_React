import React, {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, customerList: customerListProp,  children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
    const [customerList, setCustomerList] = useState(customerListProp);
    const navigate = useNavigate();

    const userLogin = async data => {
        const { token, id_info } = data;

        try {
            await localStorage.setItem("KR_Marketing_token", token);
            await localStorage.setItem("customer", JSON.stringify(id_info));
            setIsLoggedIn(true);
            navigate('/powerLinkKeyword');
            window.location.reload();
        } catch(e) {
            throw new Error(e);
        }
    }

    const userLogout = async () => {
        try {
            localStorage.removeItem("KR_Marketing_token");
            localStorage.removeItem("customer");
            setIsLoggedIn(false);
            window.location.href = '/';
        } catch(e) {
            throw new Error(e);
        } finally {
            localStorage.clear();
        }
    }

    useEffect(() => setIsLoggedIn(isLoggedInProp), [isLoggedInProp]);
    useEffect(() => setCustomerList(customerListProp), [customerListProp]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, customerList, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}