import React, {useState, useEffect} from 'react';
import {ThemeProvider} from "styled-components";
import colors from "./styles/colors";
import GlobalStyles from "./styles/GlobalStyles";
import {ToastContainer, toast} from "react-toastify";
import Router from "./Router";
import SideBar from "./components/sideBar/SideBar";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./utils/AuthContext";
import SendRequest from "./utils/SendRequest";
import * as constants from "./utils/constants";
import { useNavigate } from "react-router-dom";
import {tokenValidate} from "./utils/tokenValidate";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

function App() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [customerList, setCustomerList] = useState([]);

    const previousLoading = async () => {
        try {
            const token = await localStorage.getItem("KR_Marketing_token");

            if (!!token) {
                const {data: {id_info}} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);
                setIsLoggedIn(true);
                setCustomerList(id_info);
            } else {
                setIsLoggedIn(false);
                navigate('/');
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        tokenValidate();
        previousLoading();
    }, []);

    return (

        <ThemeProvider theme={colors}>
            <AuthProvider isLoggedIn={isLoggedIn} customerList={customerList}>
                <GlobalStyles/>
                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>

                {isLoggedIn && <SideBar/>}
                <Router isLoggedIn={isLoggedIn}/>

            </AuthProvider>
        </ThemeProvider>

    );
}

export default App;
