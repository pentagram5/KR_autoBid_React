import React from 'react';
import styled from "styled-components";
import ContentWrapper from "../../components/share/ContentWrapper";
import colors from "../../styles/colors";
import selectArrow from "../../assets/selectArrow.svg";
import ImageButton from "../../components/share/ImageButton";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import gear from "../../assets/gear.svg";
import trashCan from "../../assets/delete.svg";
import download from "../../assets/download.svg";
import MaterialTable from "../../components/Keyword/MaterialTable";
import CircularProgress from '@mui/material/CircularProgress';

const AdvertiserSelector = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`;
const Text = styled.span`
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
  color: ${({fontColor}) => fontColor ? fontColor : colors.lightBlack};
`;
const SelectBox = styled.select`
  width: 180px;
  height: 35px;
  font-size: 16px;
  color: ${colors.white};
  margin-left: 24px;
  padding: 0 15px;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  border-radius: 18px;
  cursor: pointer;
  background: url(${selectArrow}) 95% 50% no-repeat ${colors.graySkyblue};
`;
const KeywordInfoBox = styled.div`
  width: 90%;
  height: 113px;
  margin: 30px 0 62px;
  padding: 22px 33px;
  border-left: 5px solid ${colors.blue};
  background-color: ${colors.ultraLightSkyBlue};
`;
const InfoList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;
const InfoBox = styled.div`
  position: relative;
  padding: ${({padding}) => padding ? padding : "10px 25px"};

  &::after {
    content: "";
    width: 1px;
    height: 24px;
    position: absolute;
    right: 0;
    background-color: ${colors.lightBorderColor};
  }

  &:last-child {
    &:after {
      content: none;
    }
  }
`;
const TableTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 16px;
`;
const Box = styled.div`
  display: flex;
`;
const TableBox = styled.div`
    
`;
const Progress = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: ${colors.black};
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PowerLinkKeywordPresenter = ({
                                       customer,
                                        state,
                                   }) => {
    const { loading, data: keywordData, error } = state;

    if (loading) return <Progress><CircularProgress /></Progress>
    if (error) return null;


    return (
        <ContentWrapper
            title="파워링크 자동입찰관리"
        >
            <AdvertiserSelector>
                <Text fontSize={24} fontWeight={700}>광고주</Text>
                <SelectBox>
                    {customer.map(list => (
                        <option key={list.CUSTOMER_ID} value={list.CUSTOMER_ID}>{list.show_login}</option>
                    ))}
                </SelectBox>
            </AdvertiserSelector>
            <KeywordInfoBox>
                <Text fontColor={colors.deepGray} fontSize={14} fontWeight={700}>등록된 주기별 키워드 수</Text>
                <InfoList>
                    <InfoBox padding="10px 25px 10px 0">
                        <Text fontSize={24} fontWeight={700}>5분</Text>&nbsp;&nbsp;
                        <Text fontSize={18} fontColor={colors.darkGray}>
                            ({keywordData && keywordData.cycle_count && keywordData.cycle_count._5} 개)
                        </Text>
                    </InfoBox>
                    <InfoBox>
                        <Text fontSize={24} fontWeight={700}>10분</Text>&nbsp;&nbsp;
                        <Text fontSize={18} fontColor={colors.darkGray}>
                            ({keywordData && keywordData.cycle_count && keywordData.cycle_count._10} 개)
                        </Text>
                    </InfoBox>
                    <InfoBox>
                        <Text fontSize={24} fontWeight={700}>30분</Text>&nbsp;&nbsp;
                        <Text fontSize={18} fontColor={colors.darkGray}>
                            ({keywordData && keywordData.cycle_count && keywordData.cycle_count._30} 개)
                        </Text>
                    </InfoBox>
                    <InfoBox>
                        <Text fontSize={24} fontWeight={700}>60분</Text>&nbsp;&nbsp;
                        <Text fontSize={18} fontColor={colors.darkGray}>
                            ({keywordData && keywordData.cycle_count && keywordData.cycle_count._60} 개)
                        </Text>
                    </InfoBox>
                </InfoList>
            </KeywordInfoBox>

            <Text fontSize={18} fontWeight={700}>키워드 관리</Text>
            <TableTop>
                <Box>
                    <ImageButton
                        title="자동입찰 사용"
                        fontColor={colors.skyBlue}
                        border={`1px solid ${colors.skyBlue}`}
                        bgColor={colors.white}
                        imgSrc={play}
                        height={29}
                    />
                    <ImageButton
                        title="자동입찰 중지"
                        fontColor={colors.skyBlue}
                        border={`1px solid ${colors.skyBlue}`}
                        bgColor={colors.white}
                        imgSrc={pause}
                        height={29}
                    />
                    <ImageButton
                        title="설정"
                        fontColor={colors.skyBlue}
                        border={`1px solid ${colors.skyBlue}`}
                        bgColor={colors.white}
                        imgSrc={gear}
                        height={29}
                    />
                    <ImageButton
                        title="삭제"
                        fontColor={colors.skyBlue}
                        border={`1px solid ${colors.skyBlue}`}
                        bgColor={colors.white}
                        imgSrc={trashCan}
                        height={29}
                    />
                </Box>
                <ImageButton
                    title="다운로드"
                    fontColor={colors.blue}
                    border={`1px solid ${colors.blue}`}
                    bgColor={colors.white}
                    imgSrc={download}
                    height={29}
                />
            </TableTop>
            <TableBox>
                <MaterialTable
                    tableLists={keywordData && keywordData.data}
                />
            </TableBox>
        </ContentWrapper>
    )
}

export default PowerLinkKeywordPresenter;