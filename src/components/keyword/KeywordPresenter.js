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
import FilterInput from "../share/FilterInputs";
import refresh from "../../assets/refresh.svg";
import close from "../../assets/close.svg";

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 100px);
  max-width: 1920px;
  padding: 30px 50px;
`;
const Text = styled.span`
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
  color: ${({fontColor}) => fontColor ? fontColor : colors.lightBlack};
`;
const KeywordInfoBox = styled.div`
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
  width: 720px;
  height: 560px;
  padding: 30px 0 105px;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 50;
  top: 50px;
  right: 100px;
  border: 1px solid ${colors.skyBlue};
  background-color: ${colors.white};
  box-shadow: 0 0 26px ${colors.ultraLightGray};
`;
const FilterBox = styled.div`
  width: 50%;
  padding: 0 30px;

  &:first-child {
    border-right: 1px solid ${colors.ultraLightGray};
  }
`;
const BottomBox = styled.div`
  padding: 18px 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75px;
  background-color: ${colors.skyBlue};
`;
const CloseButton = styled.div`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;
const Image = styled.img``;


const KeywordPresenter = ({
                              title,
                              loading,
                              data,
                              error,
                              customer,
                              customerList,
                              handleCustomerChange,
                              handleAutoBidActive,
                              handleUpdateAutoBid,
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
                              nccKeywordId,

                              filterRef,
                              searchFilterOpen,
                              handleFilterOpen,
                              handleFilterClose,
                              searchFilter,
                              onFilterChange,
                              onFilterReset,
                              onSearchFilter,

                              confirmOpen,
                              handleConfirmClose,
                              customerName,
                              onConfirmChange,
                              onConfirmCancel,
                          }) => {

    const { campaignName, adgroupName, keyword, device, activate, targetRank, maxBid, bidCycle, opt } = searchFilter;

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

                    confirmOpen={confirmOpen}
                    handleConfirmClose={handleConfirmClose}
                    customerName={customerName}
                    onConfirmChange={onConfirmChange}
                    onConfirmCancel={onConfirmCancel}
                />
                <KeywordInfoBox>
                    <Text fontColor={colors.deepGray} fontSize={14} fontWeight={700}>등록된 주기별 키워드 수</Text>
                    <InfoList>
                        <InfoBox padding="10px 25px 10px 0">
                            <Text fontSize={24} fontWeight={700}>5분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._5 ? cycle_count._5 : 0} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>10분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._10 ? cycle_count._10 : 0} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>30분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._30 ? cycle_count._30 : 0} 개)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>60분</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._60 ? cycle_count._60 : 0} 개)
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
                            onClick={handleUpdateAutoBid}
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
                    <Box ref={filterRef}>
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
                            onClick={handleFilterOpen}
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
                        {/* 조회필터 Dropdown */}
                        {searchFilterOpen &&
                            <FilterWrapper >
                                <CloseButton onClick={handleFilterClose}>
                                    <Image name="close" src={close}/>
                                </CloseButton>
                                <FilterBox>
                                    <FilterInput
                                        radio
                                        title="조회필터"
                                        name="opt"
                                        value={opt}
                                        onChange={onFilterChange}
                                    />
                                    <FilterInput
                                        input
                                        title="캠페인명"
                                        name="campaignName"
                                        value={campaignName}
                                        onChange={onFilterChange}
                                    />
                                    <FilterInput
                                        input
                                        title="광고그룹명"
                                        name="adgroupName"
                                        value={adgroupName}
                                        onChange={onFilterChange}

                                    />
                                    <FilterInput
                                        input
                                        title="키워드명"
                                        name="keyword"
                                        value={keyword}
                                        onChange={onFilterChange}

                                    />
                                </FilterBox>
                                <FilterBox>
                                    <FilterInput
                                        select
                                        title="디바이스"
                                        name="device"
                                        value={device}
                                        onChange={onFilterChange}
                                        options={[
                                            {
                                                name: "PC",
                                                value: "PC"
                                            },
                                            {
                                                name: "MOBILE",
                                                value: "MOBILE"
                                            }
                                        ]}
                                    />
                                    <FilterInput
                                        select
                                        title="자동입찰 사용 여부"
                                        name="activate"
                                        value={activate}
                                        onChange={onFilterChange}
                                        options={[
                                            {
                                                name: "활성화",
                                                value: "1"
                                            },
                                            {
                                                name: "비활성화",
                                                value: "0"
                                            }
                                        ]}
                                    />
                                    <FilterInput
                                        select
                                        title="희망순위"
                                        name="targetRank"
                                        value={targetRank}
                                        onChange={onFilterChange}
                                        options={["1","2","3","4","5","6","7","8","9","10"]}
                                    />
                                    <FilterInput
                                        input
                                        title="최대 입찰가"
                                        name="maxBid"
                                        value={maxBid}
                                        onChange={onFilterChange}
                                    />
                                    <FilterInput
                                        select
                                        title="주기"
                                        name="bidCycle"
                                        value={bidCycle}
                                        onChange={onFilterChange}
                                        options={["5", "10", "30", "60"]}
                                    />
                                </FilterBox>
                                <BottomBox>
                                    <ImageButton
                                        title="초기화"
                                        width={100}
                                        height={40}
                                        bgColor={colors.skyBlue}
                                        imgSrc={refresh}
                                        fontColor={colors.white}
                                        fontSize={16}
                                        onClick={onFilterReset}
                                    />
                                    <StyledButton
                                        title="조회하기"
                                        width={100}
                                        height={40}
                                        bgColor={colors.skyBlue}
                                        fontColor={colors.white}
                                        border={`1px solid ${colors.white}`}
                                        onClick={onSearchFilter}
                                    />
                                </BottomBox>
                            </FilterWrapper>
                        }
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

export default React.memo(KeywordPresenter);