import React from 'react';
import styled from "styled-components";
import ShoppingTable from "./ShoppingTable";
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
                              SHOPPING,
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

    const {campaignName, adgroupName, keyword, device, activate, targetRank, maxBid, bidCycle, opt} = searchFilter;

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
                    <Text fontColor={colors.deepGray} fontSize={14} fontWeight={700}>????????? ????????? ????????? ???</Text>
                    <InfoList>
                        <InfoBox padding="10px 25px 10px 0">
                            <Text fontSize={24} fontWeight={700}>5???</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._5 ? cycle_count._5 : 0} ???)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>10???</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._10 ? cycle_count._10 : 0} ???)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>30???</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._30 ? cycle_count._30 : 0} ???)
                            </Text>
                        </InfoBox>
                        <InfoBox>
                            <Text fontSize={24} fontWeight={700}>60???</Text>&nbsp;&nbsp;
                            <Text fontSize={18} fontColor={colors.darkGray}>
                                ({cycle_count._60 ? cycle_count._60 : 0} ???)
                            </Text>
                        </InfoBox>
                    </InfoList>
                </KeywordInfoBox>

                <Text fontSize={18} fontWeight={700}>????????? ??????</Text>
                <TableTop>
                    <Box>
                        <ImageButton
                            title="?????? ?????? ??????"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={timer}
                            height={29}
                            onClick={handleModalOpen}
                        />
                        <ImageButton
                            title="???????????? ??????"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={play}
                            height={29}
                            onClick={() => handleAutoBidActive("active")}
                        />
                        <ImageButton
                            title="???????????? ??????"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={pause}
                            height={29}
                            onClick={() => handleAutoBidActive()}
                        />
                        <ImageButton
                            title="??????"
                            fontColor={colors.skyBlue}
                            border={`1px solid ${colors.skyBlue}`}
                            bgColor={colors.white}
                            imgSrc={gear}
                            height={29}
                            onClick={handleUpdateAutoBid}
                        />
                        <ImageButton
                            title="??????"
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
                            title="????????????"
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
                            title="????????????"
                            fontColor={colors.blue}
                            border={`1px solid ${colors.blue}`}
                            bgColor={colors.white}
                            imgSrc={download}
                            height={29}
                            onClick={handleDownload}
                        />
                        {/* ???????????? Dropdown */}
                        {searchFilterOpen &&
                        <FilterWrapper>
                            <CloseButton onClick={handleFilterClose}>
                                <Image name="close" src={close}/>
                            </CloseButton>
                            <FilterBox>
                                <FilterInput
                                    radio
                                    title="????????????"
                                    name="opt"
                                    value={opt}
                                    onChange={onFilterChange}
                                />
                                <FilterInput
                                    input
                                    title="????????????"
                                    name="campaignName"
                                    value={campaignName}
                                    onChange={onFilterChange}
                                />
                                <FilterInput
                                    input
                                    title="???????????????"
                                    name="adgroupName"
                                    value={adgroupName}
                                    onChange={onFilterChange}

                                />
                                <FilterInput
                                    input
                                    title="????????????"
                                    name="keyword"
                                    value={keyword}
                                    onChange={onFilterChange}

                                />
                            </FilterBox>
                            <FilterBox>
                                <FilterInput
                                    select
                                    title="????????????"
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
                                    title="???????????? ?????? ??????"
                                    name="activate"
                                    value={activate}
                                    onChange={onFilterChange}
                                    options={[
                                        {
                                            name: "?????????",
                                            value: "1"
                                        },
                                        {
                                            name: "????????????",
                                            value: "0"
                                        }
                                    ]}
                                />
                                <FilterInput
                                    select
                                    title="????????????"
                                    name="targetRank"
                                    value={targetRank}
                                    onChange={onFilterChange}
                                    options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                                />
                                <FilterInput
                                    input
                                    title="?????? ?????????"
                                    name="maxBid"
                                    value={maxBid}
                                    onChange={onFilterChange}
                                />
                                <FilterInput
                                    select
                                    title="??????"
                                    name="bidCycle"
                                    value={bidCycle}
                                    onChange={onFilterChange}
                                    options={["5", "10", "30", "60"]}
                                />
                            </FilterBox>
                            <BottomBox>
                                <ImageButton
                                    title="?????????"
                                    width={100}
                                    height={40}
                                    bgColor={colors.skyBlue}
                                    imgSrc={refresh}
                                    fontColor={colors.white}
                                    fontSize={16}
                                    onClick={onFilterReset}
                                />
                                <StyledButton
                                    title="????????????"
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
                    {SHOPPING ?
                        <ShoppingTable
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
                        :
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
                    }
                </TableBox>


                <Modal
                    open={cycleChangeOpen}
                    onClose={handleModalClose}
                    aria-labelledby="?????? ?????? ??????"
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