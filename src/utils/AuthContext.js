import React, {createContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

    const userLogin = async data => {
        const { token, id_info } = data;

        try {
            await localStorage.setItem("KR_Marketing_token", token);
            await localStorage.setItem("customer", JSON.stringify(id_info));
            setIsLoggedIn(true);
            window.location.href = '/powerLinkKeyword';
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

    return (
        <AuthContext.Provider value={{ isLoggedIn, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}