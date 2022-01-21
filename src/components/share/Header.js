import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import selectArrow from "../../assets/selectArrow.svg";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import {toast} from "react-toastify";
import Modal from '@mui/material/Modal';
import * as constants from "../../utils/constants";
import StyledButton from "./StyledButton";
import SelectBox from "./SelectBox";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const View = styled.div`
  height: 94px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Title = styled.div`
  color: ${colors.lightBlack};
  font-size: 36px;
  font-weight: 700;
`;
const AdvertiserSelector = styled.div`
  display: flex;
  align-items: center;`;
const Text = styled.div`
  font-size: ${({ fontSize }) => fontSize ? fontSize : 24}px;
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : 700};
  color:  ${({ fontColor }) => fontColor ? fontColor : colors.lightBlack};
`;
const SelectForm = styled.select`
  width: 200px;
  height: 35px;
  font-size: 16px;
  color: ${colors.white};
  margin-left: 24px;
  padding: 0 20px;
  cursor: pointer;
  background: url(${selectArrow}) 95% 50% no-repeat ${colors.graySkyblue};
  -webkit-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  border-radius: 18px;
`;
const Box = styled.div`
  ${({display}) => display && css`
    display: ${display};
    justify-content: center;
    align-items: center;
  `}
`;
const ProgressBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  progress {
    -webkit-appearance: none;
    transition: 0.8s;
  }

  progress::-webkit-progress-bar {
    border-radius: 20px;
    border: 1px solid ${colors.lightBorderColor};
    background-color: ${colors.ultraLightGray};
  }

  progress::-webkit-progress-value {
    border-radius: 20px;
    background-color: ${colors.blue};
  }
`;
const ConfirmModal = styled.div`
  width: 340px;
  height: 200px;
  background-color: ${colors.white};
  border-radius: 20px;
`;
const InfoBox = styled.div`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.5;
`;
const ButtonBox = styled.div`
  height: 30%;
  border-top: 1px solid ${colors.lightBorderColor};
  border-bottom-right-radius: 18px;
  border-bottom-left-radius:  18px;
  overflow: hidden;
`;
const ActiveText = styled.span`
  font-size: 26px;
  font-weight: 800;
  color: ${colors.yellow};
`;

const Header = ({
                    title,
                    handleCustomerChange,
                    customer,
                    customerList,
                    update,

                    confirmOpen,
                    handleConfirmClose,
                    customerName,
                    onConfirmChange,
                    onConfirmCancel
                }) => {
    const { identifier, setIdentifier } = useContext(AuthContext);
    const [percent, setPercent] = useState(0);
    const [done, setDone] = useState(0);

    const getProgressPercent = useCallback(async () => {
        try {
            const res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/status__/${identifier}`);

            if (res.data.identifier.status) {
                setPercent(res.data.identifier.percentage);
                setDone(res.data.identifier.status);
                setTimeout(() => getProgressPercent(), 1000);
            } else {
                toast.info("키워드 등록이 완료되었습니다.", {
                    toastId: identifier,
                });
                setDone(0);
                setIdentifier("");
            }
        } catch(e) {
            throw new Error(e);
        }
    }, []);

    useEffect(() => {
        if (identifier !== "") getProgressPercent();
    }, [identifier]);

    useEffect(() => {
        return () => {
            setPercent(0);
            setDone(0);
            clearTimeout(getProgressPercent);
        }
    }, []);

    return (
        <View>
            <Title>{title}</Title>
            <Box>
                {!update && (
                    <AdvertiserSelector>
                        <Text>광고주</Text>
                        <SelectForm
                            onChange={e => {
                                console.info(e);
                                handleCustomerChange(e);
                            }}
                            value={customer.CUSTOMER_ID}
                        >
                            {customerList.map(list => (
                                <option key={list.CUSTOMER_ID} value={`${list.CUSTOMER_ID}__${list.show_login}`}>{list.show_login}</option>
                            ))}
                        </SelectForm>
                        <SelectBox
                            width={200}
                            height={35}
                            borderRadius={18}
                            fontSize={16}
                            fontColor={colors.white}
                            bgColor={colors.graySkyblue}
                            border={`10px solid ${colors.ultraLightSkyBlue}`}
                            options={customerList}
                        >

                        </SelectBox>
                        
                        
                    </AdvertiserSelector>
                )}
                {!!done && (
                    <ProgressBox>
                        <Text fontSize={18} fontWeight={400}>
                            등록진행률
                        </Text>
                        <Text fontSize={14} fontColor={colors.darkGray} fontWeight={400}>{percent}%</Text>
                        <progress value={percent} max={100} />
                    </ProgressBox>
                )}
            </Box>
            <Modal
                open={confirmOpen}
                onClose={handleConfirmClose}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <>
                    <ConfirmModal>
                        <InfoBox>
                            <Text fontSize={20} fontWeight={600} fontColor={colors.lightBlack}>
                                <ActiveText>{customerName}</ActiveText> 로 <br/>
                                광고주를 변경하시겠습니까 ?
                            </Text>
                        </InfoBox>
                        <ButtonBox>
                            <StyledButton
                                title="취소"
                                width={170}
                                height={60}
                                borderRadius={1}
                                fontColor={colors.lightBlack}
                                bgColor={colors.white}
                                onClick={onConfirmCancel}
                            />
                            <StyledButton
                                title="변경"
                                width={170}
                                height={60}
                                bgColor={colors.skyBlue}
                                fontColor={colors.white}
                                borderRadius={1}
                                onClick={onConfirmChange}
                            />
                        </ButtonBox>
                    </ConfirmModal>
                </>
            </Modal>
        </View>
    )
}

export default React.memo(Header);
