import React from "react";
import { Route, Routes } from "react-router-dom";
import {AuthProvider} from "./utils/AuthContext";
import Login from "./pages/Login";
import Main from "./pages/Main";

const LoggedInRoutes = () => (
    <Routes>
        <Route path="/" element={<Main />} />
    </Routes>
)

const LoggedOutRoutes = () => (
    <Routes>
        <Route path="/" element={<Login/>} exact />
    </Routes>
)

const Router = ({ isLoggedIn }) => {
    console.info('router', isLoggedIn)
    return (
        <AuthProvider>
            {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
        </AuthProvider>
    )
}

export default Router;