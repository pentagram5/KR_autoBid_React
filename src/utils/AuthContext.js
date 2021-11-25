import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
    // const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);


    const userLogin = async token => {
        console.info('token', token);
        try {
            localStorage.setItem("KR_Marketing_token", token);
            setIsLoggedIn(true);
            setTimeout(() => {
                window.location.reload();
            }, [700]);
        } catch(e) {
            throw new Error(e);
        }
    }

    const userLogout = async () => {

    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const userLogin = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let { userLogin } = useContext(AuthContext);
    return userLogin;
}