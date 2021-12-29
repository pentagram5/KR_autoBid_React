import React from 'react';
import styled, {css} from "styled-components";
import kr_logo from "../../assets/kr_logo.svg";
import colors from "../../styles/colors";
import StyledButton from "../../components/share/StyledButton";

const View = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginForm = styled.div`
  width: 300px;
`;
const LogoImage = styled.div`
  margin-bottom: 32px;
`;
const AppImage = styled.img``;

const Text = styled.div`
  color: ${colors.lightBlack};
  font-size: ${({fontSize}) => fontSize ? fontSize : 14}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
  ${({textAlign}) => textAlign && css`
    text-align: ${textAlign};
  `};
  margin: ${({margin}) => margin ? margin : "0 0 5px 0"};
`;
const InputBox = styled.div`
  height: 55px;
  border: 1px solid ${colors.borderColor};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;

  &::placeholder {
    color: ${colors.lightBorderColor};
    font-size: 16px;
  }
`;

const SignUpPresenter = ({
                             signUpInputs,
                             handleInputChange,
                             onSignUp
                         }) => {
    return (
        <View>
            <LoginForm>
                <LogoImage>
                    <AppImage src={kr_logo}/>
                </LogoImage>
                <Text fontSize={24} fontWeight={700} textAlign="center" margin="0 0 12px 0">회원등록</Text>

                <Text>ID</Text>
                <InputBox>
                    <Input
                        name="id"
                        placeholder="아이디를 입력해주세요."
                        value={signUpInputs.id}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <Text>Password</Text>
                <InputBox>
                    <Input
                        name="passwd"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={signUpInputs.passwd}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <Text>API Key</Text>
                <InputBox>
                    <Input
                        name="API_KEY"
                        placeholder="API Key를 입력해주세요."
                        value={signUpInputs.API_KEY}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <Text>Secret Key</Text>
                <InputBox>
                    <Input
                        name="SECRET_KEY"
                        placeholder="Secret Key를 입력해주세요."
                        value={signUpInputs.SECRET_KEY}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <Text>Customer ID</Text>
                <InputBox>
                    <Input
                        name="CUSTOMER_ID"
                        placeholder="Customer ID를 입력해주세요."
                        value={signUpInputs.CUSTOMER_ID}
                        onChange={handleInputChange}
                    />
                </InputBox>

                <StyledButton
                    title="등 록"
                    margin="30px 0"
                    width={300}
                    height={55}
                    fontSize={20}
                    bgColor={colors.blue}
                    fontColor={colors.white}
                    onClick={onSignUp}
                />
            </LoginForm>
        </View>
    )
}

export default SignUpPresenter;