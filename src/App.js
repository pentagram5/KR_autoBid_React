import React, {useState, useEffect} from 'react';
import styled, {ThemeProvider} from "styled-components";
import colors from "./styles/colors";
import GlobalStyles from "./styles/GlobalStyles";
import {ToastContainer, toast} from "react-toastify";
import Router from "./Router";
import SideBar from "./components/sideBar/SideBar";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./utils/AuthContext";

const ComponentsBox = styled.div`
  display: flex;
  align-items: center;
`;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const previousLoading = async () => {
        try {
            const token = await localStorage.getItem("KR_Marketing_token");

            if (!!token) setIsLoggedIn(true);
            else setIsLoggedIn(false);
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        previousLoading();
    }, []);

    return (

            <ThemeProvider theme={colors}>
                <AuthProvider isLoggedIn={isLoggedIn}>
                    <GlobalStyles/>
                    <ToastContainer position={toast.POSITION.TOP_RIGHT}/>

                    <ComponentsBox>
                        {isLoggedIn && <SideBar/>}
                        <Router isLoggedIn={isLoggedIn}/>
                    </ComponentsBox>
                </AuthProvider>
            </ThemeProvider>

    );
}

export default App;
