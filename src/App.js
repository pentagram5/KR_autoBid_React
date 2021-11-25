import React, {useState, useEffect} from 'react';
import {ThemeProvider} from "styled-components";
import {AuthProvider} from "./utils/AuthContext";
import colors from "./styles/colors";
import GlobalStyles from "./styles/GlobalStyles";
import {ToastContainer, toast} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import Router from "./Router";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const previousLoading = async () => {
        try {
            const token = await localStorage.getItem("KR_Marketing_token");
            console.info('???', token);
            if (!!token) setIsLoggedIn(true);
            else setIsLoggedIn(false);
        } catch(e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        previousLoading();
    }, []);


    return (
        <ThemeProvider theme={colors}>
            <AuthProvider>
                <GlobalStyles/>
                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                <BrowserRouter>
                    <Router isLoggedIn={isLoggedIn} />
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
