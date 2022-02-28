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
import {Switch} from "antd";
import 'antd/dist/antd.css';

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const View = styled.div`
  min-height: 94px;
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
const RowBox = styled.div`
  min-width: 286px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  & + & {
    margin-top: 10px;
  }
`;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
const SwitchBox = styled.div`
  width: 100px;
  text-align: right;
  .ant-switch-inner {
    line-height: 1.5;
  }
`;

const Header = ({
                    title,
                    handleCustomerChange,
                    customer,
                    customerList,
                    update,

                    confirmOpen = false,
                    handleConfirmClose,
                    customerName = "",
                    onConfirmChange,
                    onConfirmCancel
                }) => {

    const { identifier, setIdentifier } = useContext(AuthContext);
    const [percent, setPercent] = useState(0);
    const [done, setDone] = useState(0);
    const [activeModal, setActiveModal] = useState(false);
    const [activate, setActivate] = useState(false);

    const getProgressPercent = useCallback(async () => {
        try {
            const res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/status__/${identifier}`);

            if (res.data && res.data.identifier && res.data.identifier.status) {
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

    const handleIdActiveModalOpen = useCallback(() => setActiveModal(true), []);

    const onClickActive = useCallback(async () => {
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/id/autoActive?CUSTOMER_ID=${customer.CUSTOMER_ID}&activate=${!activate}`);

            if (data.done) {
                localStorage.setItem("customer", JSON.stringify(data.id_info));
                setActivate(!activate);
                setActiveModal(false);
                toast.info("처리가 완료되었습니다.");
                window.location.reload();
            }
        } catch(e) {
            throw new Error(e);
        }
    }, [activate]);
    const onClickInactive = useCallback(() => setActiveModal(false), []);

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

    useEffect(() => {
        setActivate(customer.autoActive);
    }, [customer]);


    useEffect(() => {
        console.info('customer', customer);
    }, [customer]);

    return (
        <View>
            <Title>{title}</Title>
            <Box>
                {!update && (
                    <>
                        <RowBox>
                            <Text>광고주</Text>
                            <SelectForm
                                onChange={handleCustomerChange}
                                value={`${customer.CUSTOMER_ID}__${customer.show_login}`}
                            >
                                {customerList.map(list => (
                                    <option key={list.CUSTOMER_ID} value={`${list.CUSTOMER_ID}__${list.show_login}`}>{list.show_login}</option>
                                ))}
                            </SelectForm>
                        </RowBox>
                        <RowBox>
                            <Text fontSize={16} fontWeight={400}>자동입찰 기능 사용</Text>
                            <SwitchBox>
                                <Switch
                                    checkedChildren="ON"
                                    unCheckedChildren="OFF"
                                    checked={activate}
                                    onClick={handleIdActiveModalOpen}
                                />
                            </SwitchBox>
                        </RowBox>
                    </>
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

            <Modal
                open={activeModal}
                onClose={() => setActiveModal(false)}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <>
                    <ConfirmModal>
                        <InfoBox>
                            <Text fontSize={20} fontWeight={600} fontColor={colors.lightBlack}>
                                <ActiveText>{customer.show_login}</ActiveText> 의 <br/>
                                계정을 {customer.autoActive ? "비활성화" : "활성화"} 하시겠습니까 ?
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
                                onClick={onClickInactive}
                            />
                            <StyledButton
                                title="확인"
                                width={170}
                                height={60}
                                bgColor={colors.skyBlue}
                                fontColor={colors.white}
                                borderRadius={1}
                                onClick={onClickActive}
                            />
                        </ButtonBox>
                    </ConfirmModal>
                </>
            </Modal>
        </View>
    )
}

export default React.memo(Header);
