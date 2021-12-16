import React from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import StyledButton from "../share/StyledButton";

const Wrapper = styled.div`
  width: 500px;
  height: 300px;
  padding: 24px;
  margin: 300px auto;
  background-color: ${colors.white};
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text = styled.div`
  font-size: ${({ fontSize }) => fontSize ? fontSize : 16}px;
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : 500};
  color: ${({ fontColor }) => fontColor ? fontColor : colors.lightBlack};
  
  ${({ margin }) => margin && css`
    margin: ${margin};
  `}
  
  ${({ cursor }) => cursor && css`
    cursor: ${cursor};
  `}
`;
const Box = styled.div`
  margin: ${({ margin }) => margin ? margin : "20px 0"};
  ${({ display }) => display && css`
    display: flex;
    align-items: center;
    justify-content: ${display};
  `}
`;

const AutoBidCycleChangeModal = ({
                                     nccKeywordId,
                                     handleModalClose,
                                     autoBidCycle,
                                     onAutoBidCycleChange,
                                     handleChangeAutoBidCycle,
                                 }) => {

    console.info('nccKeywordId', nccKeywordId.length);

    const title = nccKeywordId[0].nccKeywordId.split('__')[1];


    console.info('title', title);


    return (
        <Wrapper>
            <Top>
                <Text fontColor={colors.black} fontSize={24} fontWeight={600}>입찰 주기 변경</Text>
                <Text fontSize={22} cursor="pointer" onClick={handleModalClose}>닫기</Text>
            </Top>
            <Box margin="50px 0 25px" display="flex-start">
                <Text fontSize={18} fontColor={colors.deepGray} fontWeight={600}>대상 키워드 : </Text>
                <Text fontSize={18} fontColor={colors.gray} margin="0 0 0 20px">
                    {nccKeywordId.length > 1 ? `${title} 외 ${nccKeywordId.length -1} 건` : title}
                </Text>
            </Box>
            <Box>
                <RadioGroup row value={autoBidCycle} onChange={onAutoBidCycleChange}>
                    <FormControlLabel value={5} name="bid_cycle" control={<Radio/>} label="5분" />
                    <FormControlLabel value={10} name="bid_cycle" control={<Radio/>} label="10분"/>
                    <FormControlLabel value={30} name="bid_cycle" control={<Radio/>} label="30분"/>
                    <FormControlLabel value={60} name="bid_cycle" control={<Radio/>} label="60분"/>
                </RadioGroup>
            </Box>
            <Box margin="45px 0 0" display="flex-end">
                <StyledButton
                     title="취소"
                    width={86}
                    height={40}
                    fontColor={colors.blue}
                    border={`1px solid ${colors.blue}`}
                    bgColor={colors.white}
                    onClick={handleModalClose}
                />
                <StyledButton
                    title="저장"
                    margin="0 0 0 14px"
                    width={86}
                    height={40}
                    fontColor={colors.white}
                    bgColor={colors.blue}
                    onClick={handleChangeAutoBidCycle}
                />
            </Box>
        </Wrapper>
    )
}

export default AutoBidCycleChangeModal;