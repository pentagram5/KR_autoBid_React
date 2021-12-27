import React from "react";
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import PowerLinkKeyword from "./pages/PowerLink/PowerLinkKeywordContainer";
import PowerLinkAutoBid from "./pages/PowerLink/PowerLinkAutoBidContainer";
import ShoppingADKeyword from "./pages/ShoppingAD/ShoppingADKeywordContainer";
import ShoppingAAutoBid from "./pages/ShoppingAD/ShoppingADAutoBidContainer";
import PowerContentsKeyword from "./pages/PowerContents/PowerContentsKeywordContainer";
import PowerContentsAutoBid from "./pages/PowerContents/PowerContentsAutoBidContainer";
import PowerLinkUpdate from "./pages/PowerLink/PowerLinkUpdateContainer";

const ComponentBox = styled.div`
  padding-left: 300px;
`;

const LoggedInRoutes = () => (
    <Routes>
        {/* 키워드 */}
        <Route path="/powerLinkKeyword" element={<PowerLinkKeyword/>}/>
        <Route path="/shoppingADKeyword" element={<ShoppingADKeyword/>}/>
        <Route path="/powerContentsKeyword" element={<PowerContentsKeyword/>}/>
        {/* 자동 입찰 */}
        <Route path="/powerLinkAutoBid" element={<PowerLinkAutoBid/>}/>
        <Route path="/shoppingADAutoBid" element={<ShoppingAAutoBid/>}/>
        <Route path="/powerContentsAutoBid" element={<PowerContentsAutoBid/>}/>
        {/* 수정 */}
        <Route path="/powerLinkUpdate" element={<PowerLinkUpdate />}/>
    </Routes>
)

const LoggedOutRoutes = () => (
    <Routes>
        <Route path="/" element={<Login/>}/>
    </Routes>
)

const Router = ({isLoggedIn}) => {
    return (
        <>
            {isLoggedIn
                ? <ComponentBox><LoggedInRoutes/></ComponentBox>
                : <LoggedOutRoutes/>
            }
        </>
    )
}

export default Router;