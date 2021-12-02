import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import {AuthProvider} from "./utils/AuthContext";
import Login from "./pages/Login";
import PowerLinkKeyword from "./pages/PowerLinkKeyword";
import ShoppingADKeyword from "./pages/ShoppingADKeyword";
import PowerContentsKeyword from "./pages/PowerContentsKeyword";
import PowerLinkAutoBid from "./pages/PowerLinkAutoBid";
import ShoppingAAutoBid from "./pages/ShoppingADAutoBid";
import PowerContentsAutoBid from "./pages/PowerContentsAutoBid";

const ComponentBox = styled.div`
  padding-left: 300px;
`;

const LoggedInRoutes = () => (
    <Routes>
        <Route path="/powerLinkKeyword" element={<PowerLinkKeyword />} />
        <Route path="/shoppingADKeyword" element={<ShoppingADKeyword/>} />
        <Route path="/powerContentsKeyword" element={<PowerContentsKeyword/>} />
        <Route path="/powerLinkAutoBid" element={<PowerLinkAutoBid/>} />
        <Route path="/shoppingADAutoBid" element={<ShoppingAAutoBid/>} />
        <Route path="/powerContentsAutoBid" element={<PowerContentsAutoBid/>} />
    </Routes>
)

const LoggedOutRoutes = () => (
    <Routes>
        <Route path="/" element={<Login/>} />
    </Routes>
)

const Router = ({ isLoggedIn }) => {
    return (
        <AuthProvider>
            {isLoggedIn
                ? <ComponentBox><LoggedInRoutes /></ComponentBox>
                : <LoggedOutRoutes />
            }
        </AuthProvider>
    )
}

export default Router;