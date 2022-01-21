import React from 'react';
import styled from "styled-components";
import KR_Logo from "../../assets/kr_logo.svg"
import colors from "../../styles/colors";
import StyledButton from "../../components/share/StyledButton";

const View = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LoginForm = styled.div`
  width: 340px;
  height: 400px;
  padding: 20px;
  margin: 15% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const KRLogoBox = styled.div`
  width: 200px;
  height: 50px;
  margin-bottom: 55px;
`;
const KRLogo = styled.img`
  width: 100%;
  height: 100%;
`;
const Inputs = styled.input`
  width: 100%;
  height: 55px;
  padding: 5px 10px;
  border:  1px solid ${colors.borderColor};
  border-radius: 5px;
  
  & + & {
    margin: 12px 0;
  }
  
  &::placeholder {
    font-size: 16px;
    color: ${colors.borderColor};
  }
`;
const SignUp = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.blue};
  border-bottom: 1px solid ${colors.blue}
  cursor: pointer;
`;

const LoginPresenter = ({ id, passwd, onInputChange, handleLogin, goSignUp }) => {
    return (
        <View>
            <LoginForm>
                <KRLogoBox>
                    <KRLogo src={KR_Logo} alt="KR_LOGO" />
                </KRLogoBox>
                <Inputs
                    name="id"
                    placeholder="아이디를 입력해주세요."
                    value={id}
                    onChange={onInputChange}
                />
                <Inputs
                    name="passwd"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={passwd}
                    onChange={onInputChange}
                    onKeyUp={e => e.key === "Enter" && handleLogin()}
                />
                <StyledButton
                    title="로 그 인"
                    margin="30px 0"
                    width={300}
                    height={55}
                    fontSize={20}
                    bgColor={colors.blue}
                    fontColor={colors.white}
                    onClick={handleLogin}
                />
                <SignUp onClick={goSignUp}>
                    회원 등록
                </SignUp>
            </LoginForm>
        </View>
    )
}

export default React.memo(LoginPresenter);