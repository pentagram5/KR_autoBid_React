import React from 'react';
import styled from "styled-components";
import MaterialTable from "./MaterialTable";
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Header from "../share/Header";
import colors from "../../styles/colors";
import ImageButton from "../../components/share/ImageButton";
import timer from "../../assets/timer.svg";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import gear from "../../assets/gear.svg";
import trashCan from "../../assets/delete.svg";
import download from "../../assets/download.svg";
import AutoBidCycleChangeModal from "./AutoBidCycleChangeModal";
import StyledButton from "../share/StyledButton";

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 100px);
  padding: 30px 50px;
`;
const Text = styled.span`
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
  color: ${({fontColor}) => fontColor ? fontColor : colors.lightBlack};
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
  position: relative;
`;
const TableBox = styled.div`
  
`;
const Progress = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1111;
  background: ${colors.black};
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FilterWrapper = styled.div`
  width: 500px;
  height: 300px;
  position: absolute;
  z-index: 50;
  top: 50px;
  right: 0;
  background-color: ${colors.white};
`;

const KeywordPresenter = ({
                              title,
                              loading,
                              data,
                              error,
                              customer,
                              customerList,
                              handleCustomerChange,
                              handleAutoBidActive,
                              handleDeleteAutoBid,
                              checked,
                              isChecked,
                              handleChecked,
                              handleAllChecked,
                              handleDownload,

                              orderBy,
                              order,
                              handleRequestSort,
                              getComparator,

                              page,
                              rowsPerPage,
                              handleChangePage,
                              handleChangeRowsPerPage,

                              cycleChangeOpen,
                              handleModalOpen,
                              handleModalClose,

                              autoBidCycle,
                              onAutoBidCycleChange,
                              handleChangeAutoBidCycle,
                              nccKeywordId
                          }) => {


    if (error) return null;
    if (loading || !data || customerList.length === 0) return <Progress><CircularProgress/></Progress>
    const {keywords, cycle_count} = data;

    return (
        <>
            <Wrapper>
                <Header
                    title={title}
                    handleCustomerChange={handleCustomerChange}
                    customer={customer}
                    customerList={customerList}
                />
                <KeywordInfoBox>
                    <Text fontColor={colors.deepGray} fontSize={14} fontWeight={700}>등록된 주기별 키워드 수</Text>
                    <InfoList>
                        <InfoBox padding="10px 25px 10px 0">
                            <Text fontSize={24} fontWeight={700}>5분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._5} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>10분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._10} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>30분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._30} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>60분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._60} 개)
                            </Text>
                        </InfoBox>
                    </InfoList>
                </KeywordInfoBox>

                <Text fontSize={18} fontWeight={700}>키워드 관리</Text>
                <TableTop>
                    <Box>
                        <ImageButton
                            title="입찰 주기 변경"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={timer}
                            height={29}
                            onClick={handleModalOpen}
                        />
                        <ImageButton
                            title="자동입찰 사용"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={play}
                            height={29}
                            onClick={() => handleAutoBidActive("active")}
                        />
                        <ImageButton
                            title="자동입찰 중지"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={pause}
                            height={29}
                            onClick={() => handleAutoBidActive()}
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
                            onClick={handleDeleteAutoBid}
                        />
                    </Box>
                    <Box>
                        <StyledButton
                            title="조회필터"
                            width={78}
                            fontSize={13}
                            fontWeight={400}
                            fontColor={colors.white}
                            bgColor={colors.blue}
                            margin="0 10px 0 0"
                            height={29}
                            type="filter"
                            // onClick={handleDownload}
                        />
                        <ImageButton
                            title="다운로드"
                            fontColor={colors.blue}
                            border={`1px solid ${colors.blue}`}
                            bgColor={colors.white}
                            imgSrc={download}
                            height={29}
                            onClick={handleDownload}
                        />
                        <FilterWrapper>

                        </FilterWrapper>
                    </Box>
                </TableTop>
                <TableBox>
                    <MaterialTable
                        tableLists={keywords}
                        checked={checked}
                        isChecked={isChecked}
                        handleChecked={handleChecked}
                        handleAllChecked={handleAllChecked}

                        orderBy={orderBy}
                        order={order}
                        handleRequestSort={handleRequestSort}
                        getComparator={getComparator}

                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableBox>


                <Modal
                    open={cycleChangeOpen}
                    onClose={handleModalClose}
                    aria-labelledby="입찰 주기 변경"
                >
                    <>
                        <AutoBidCycleChangeModal
                            nccKeywordId={nccKeywordId}
                            handleModalClose={handleModalClose}
                            autoBidCycle={autoBidCycle}
                            onAutoBidCycleChange={onAutoBidCycleChange}
                            handleChangeAutoBidCycle={handleChangeAutoBidCycle}
                        />
                    </>
                </Modal>
            </Wrapper>
        </>
    )
}

export default KeywordPresenter;