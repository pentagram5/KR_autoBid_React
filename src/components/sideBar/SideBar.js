import React, {useContext} from 'react';
import styled, {css} from "styled-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../utils/AuthContext";
import colors from "../../styles/colors";
import KR_Logo from "../../assets/kr_logo_sideBar.svg";
import logoutGear from "../../assets/logout_gear.svg";

const View = styled.div`
  min-width: 300px;
  height: 100vh;
  background-color: ${colors.blue};
  position: fixed;
  top: 0;
  z-index: 100;
`;
const KRLogoBox = styled.div`
  padding: 38px 0 44px 30px;
`;
const KRLogo = styled.div`
  width: 150px;
  height: 50px;
`;
const Image = styled.img`
  //width: 100%;
  height: 100%;
`;
const BottomArrow = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
`;
const MenuBox = styled.div`
  width: 100%;
  position: relative;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  cursor: pointer;
  border-top: 1px solid ${colors.lightBlue};
  transform: rotate(0deg);

  ${({active}) => active && css`
    background-color: ${colors.white};

    ${BottomArrow} {
      transform: rotate(-90deg);
    }
  `}
`;
const Text = styled.div`
  height: 100%;
  line-height: 1.5;
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight};
  color: ${({fontColor}) => fontColor};
`;
const SubMenuBox = styled.div`
  height: 0;
  overflow: hidden;
  transition: 0.5s;
  background-color: ${colors.deepWhite};

  ${({active}) => active && css`
    height: 170px;
    padding: 0 0 16px;
  `}
  &:last-child {
    border-bottom: 1px solid ${colors.lightBlue};
  }
`;
const SubMenu = styled.div`
  height: 50px;
  padding: 13px 0 13px 40px;
  cursor: pointer;
`;
const LogoutBox = styled.div`
  width: 130px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 48px;
  cursor: pointer;
`;

const SideBar = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);

    return (
        <View>
            <KRLogoBox>
                <KRLogo>
                    <Image src={KR_Logo}/>
                </KRLogo>
            </KRLogoBox>
            {/* 자동입찰관리 */}
            <MenuBox
                active={
                    pathname === "/powerLinkKeyword" ||
                    pathname === "/shoppingADKeyword" ||
                    pathname === "/powerContentsKeyword" ||
                    pathname === "/powerLinkUpdate" ||
                    pathname === "/shoppingAdUpdate" ||
                    pathname === "/powerContentsUpdate"
                }
                onClick={() => navigate("/powerLinkKeyword")}
            >
                <Text
                    fontSize={18}
                    fontWeight={600}
                    fontColor={
                        pathname === "/powerLinkKeyword" ||
                        pathname === "/shoppingADKeyword" ||
                        pathname === "/powerContentsKeyword" ||
                        pathname === "/powerLinkUpdate" ||
                        pathname === "/shoppingAdUpdate" ||
                        pathname === "/powerContentsUpdate"
                            ? colors.blue : colors.white
                    }
                >
                    자동입찰관리
                </Text>
                <BottomArrow>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16.5L6 10.5H18L12 16.5Z"
                              fill={pathname === "/powerLinkKeyword" ||
                              pathname === "/shoppingADKeyword" ||
                              pathname === "/powerContentsKeyword" ||
                              pathname === "/powerLinkUpdate" ||
                              pathname === "/shoppingAdUpdate" ||
                              pathname === "/powerContentsUpdate"
                                  ? colors.blue : colors.white}
                        />
                    </svg>
                </BottomArrow>
            </MenuBox>
            <SubMenuBox
                active={
                    pathname === "/powerLinkKeyword" ||
                    pathname === "/shoppingADKeyword" ||
                    pathname === "/powerContentsKeyword" ||
                    pathname === "/powerLinkUpdate" ||
                    pathname === "/shoppingAdUpdate" ||
                    pathname === "/powerContentsUpdate"
                }
            >
                <Link to="/powerLinkKeyword">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/powerLinkKeyword" || pathname === "/powerLinkUpdate" ? colors.black : colors.gray}
                        >
                            - 파워링크 입찰 등록 키워드
                        </Text>
                    </SubMenu>
                </Link>
                <Link to="/shoppingADKeyword">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/shoppingADKeyword" || pathname === "/shoppingAdUpdate"? colors.black : colors.gray}>
                            - 쇼핑광고 입찰 등록 키워드
                        </Text>
                    </SubMenu>
                </Link>
                <Link to="/powerContentsKeyword">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/powerContentsKeyword" || pathname === "/powerContentsUpdate" ? colors.black : colors.gray}
                        >
                            - 파워컨텐츠 입찰 등록 키워드
                        </Text>
                    </SubMenu>
                </Link>
            </SubMenuBox>

            {/* 자동입찰등록 */}
            <MenuBox
                active={
                    pathname === "/powerLinkAutoBid" ||
                    pathname === "/shoppingADAutoBid" ||
                    pathname === "/powerContentsAutoBid"
                }
                onClick={() => navigate("/powerLinkAutoBid")}
            >
                <Text
                    fontSize={18}
                    fontWeight={600}
                    fontColor={
                        pathname === "/powerLinkAutoBid" ||
                        pathname === "/shoppingADAutoBid" ||
                        pathname === "/powerContentsAutoBid"
                            ? colors.blue : colors.white
                    }
                >
                    자동입찰등록
                </Text>
                <BottomArrow>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16.5L6 10.5H18L12 16.5Z"
                              fill={
                                  pathname === "/powerLinkAutoBid" ||
                                  pathname === "/shoppingADAutoBid" ||
                                  pathname === "/powerContentsAutoBid"
                                      ? colors.blue : colors.white}
                        />
                    </svg>
                </BottomArrow>
            </MenuBox>
            <SubMenuBox
                active={
                    pathname === "/powerLinkAutoBid" ||
                    pathname === "/shoppingADAutoBid" ||
                    pathname === "/powerContentsAutoBid"
                }
            >
                <Link to="/powerLinkAutoBid">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/powerLinkAutoBid" ? colors.black : colors.gray}
                        >
                            - 파워 링크 자동입찰 등록
                        </Text>
                    </SubMenu>
                </Link>
                <Link to="/shoppingADAutoBid">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/shoppingADAutoBid" ? colors.black : colors.gray}
                        >
                            - 쇼핑광고 자동입찰 등록
                        </Text>
                    </SubMenu>
                </Link>
                <Link to="/powerContentsAutoBid">
                    <SubMenu>
                        <Text
                            fontSize={16}
                            fontColor={pathname === "/powerContentsAutoBid" ? colors.black : colors.gray}
                        >
                            - 파워컨텐츠 자동입찰 등록
                        </Text>
                    </SubMenu>
                </Link>
            </SubMenuBox>

            {/* 광고주 등록 */}
            <MenuBox
                active={pathname === "/advertiser"}
                onClick={() => navigate("/advertiser")}
            >
                <Text
                    fontSize={18}
                    fontWeight={600}
                    fontColor={pathname === "/advertiser" ? colors.blue : colors.white}
                >
                    광고주 등록
                </Text>
                <BottomArrow>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16.5L6 10.5H18L12 16.5Z"
                              fill={pathname === "/advertiser" ? colors.blue : colors.white}
                        />
                    </svg>
                </BottomArrow>
            </MenuBox>



            <LogoutBox onClick={userLogout}>
                <Image src={logoutGear}/>
                <Text fontSize={18} fontColor={colors.white}>Logout</Text>
            </LogoutBox>
        </View>
    )
}

export default SideBar;