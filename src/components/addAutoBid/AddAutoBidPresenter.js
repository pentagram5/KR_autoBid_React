import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import StyledButton from "../share/StyledButton";
import selectArrow2 from "../../assets/selectArrow2.svg";
import selectArrow3 from "../../assets/selectArrow3.svg";
import rightArrow from "../../assets/rightArrow.svg";
import rightLeftArrow from "../../assets/rightLeftArrow.svg";
import delete_2 from "../../assets/delete_2.svg";
import clock from "../../assets/clock.svg";
import Header from "../share/Header";
import ScheduleCard from "../share/ScheduleCard";
import download from "../../assets/download.svg";
import ImageButton from "../share/ImageButton";

const View = styled.div`
  width: calc(100vw - 300px);
  padding: 30px 50px 400px;
  max-width: 1920px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.lightBlack};
  margin-bottom: 20px;
`;
const SelectForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : 20}px;
`;
const SelectBox = styled.select`
  width: ${({width}) => width}px;
  height: 40px;
  padding: ${({padding}) => padding ? padding : "0 20px"};
  color: ${colors.darkGray};
  border-radius: 3px;
  border: 1px solid ${colors.lightBorderColor};
  background: url(${({bgImg}) => bgImg}) 90% 55% no-repeat;

  & + & {
    margin: 0 10px;
  }
`;
const RightArrowBox = styled.div`
  margin: 0 15px;
`;
const Image = styled.img`
  ${({cursor}) => cursor && css`
    cursor: ${cursor};
  `}
`;
const TableBox = styled.div`
  width: 1470px;
  display: flex;
  align-items: center;
  margin: 10px 0 60px;
`;
const KeywordTable = styled.div`
  width: 45%;
  height: 400px;
  font-size: 14px;
  border-top: 2px solid ${colors.deepGray};
  border-bottom: 1px solid ${colors.deepGray};
  overflow-y: scroll;

  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked {
    color: ${colors.lightBlack};
  }

  thead th:nth-child(1) {
    width: 50px;
  }

  thead th {
    padding: 3px 0;
    box-sizing: border-box;
    color: ${colors.darkBlack};
    border-bottom: 1px solid ${colors.deepGray};
  }

  tbody td {
    height: 70px;
    border-bottom: 1px solid ${colors.lightBorderColor};
  }
`;
const TableRow = styled.div`
  height: ${({height}) => height ? height : 70}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({borderColor}) => borderColor};
`;
const TableCell = styled.div`
  width: ${({width}) => width ? width : 50}px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({fontColor}) => fontColor ? fontColor : colors.darkGray};
`;
const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({margin}) => margin ? margin : "60px 0 160px"};
`;
const SettingTableBox = styled.div`
  width: 100%;
  margin-bottom: 60px;
  border-top: 2px solid ${colors.deepGray};
  border-bottom: 1px solid ${colors.deepGray};
`;
const SettingTable = styled.table`
  width: 100%;

  tbody td {
    width: 35%;
    height: 70px;
    padding: 15px 25px;
    vertical-align: middle;
    border-right: 1px solid ${colors.lightBorderColor};
    border-bottom: 1px solid ${colors.lightBorderColor};

    &:nth-child(1),
    &:nth-child(3) {
      width: 250px !important;
      font-size: 16px;
      font-weight: 700;
      color: ${colors.lightBlack};
      background-color: ${colors.deepWhite};
    }
  }

  .css-ahj2mt-MuiTypography-root {
    color: ${colors.gray};
  }

  .css-1hbvpl3-MuiSvgIcon-root {
    fill: ${colors.gray};
  }
`;
const InputBox = styled.div`
  width: ${({width}) => width ? width : 180}px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({padding}) => padding ? padding : "0 10px"};
  color: ${colors.gray};
  border: 1px solid ${colors.lightBorderColor};
`;
const Input = styled.input`
  border: none;
  width: 90%;
  height: 100%;
`;
const ScheduleCardBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: 20px 0 30px;
`;
const ScheduleGraphBox = styled.div`
  width: 100%;
  display: table;
  border-collapse: collapse;
  border-top: 2px solid ${colors.deepGray};
`;
const Row = styled.div`
  display: table-row;
  background: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
`;
const Cell = styled.div`
  width: ${({width}) => width ? width : "auto"};
  min-width: 40px;
  height: 40px;
  font-size: 14px;
  color: ${colors.deepGray};
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  border: 1px solid ${colors.lightBorderColor};

  ${({bgColor}) => bgColor && css`
    background-color: ${bgColor};
  `}
`;
const ProgressBox = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.black};
  opacity: 0.4;
`;
const SearchForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 10px;
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  // Input Style
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    height: 40px;
    padding: 0 10px;
  }

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 175px;
  }
`;
const StyledSwitch = styled(Switch)`
  padding: 0;
  margin-right: 20px;

  .css-julti5-MuiSwitch-root {
    padding: 4px;
    border-radius: 50%;
  }

  & .MuiSwitch-track {
    border-radius: 22 / 2;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
    }

    & .MuiSwitch-thumb {
      box-Shadow: none;
      width: 16px;
      height: 16px;
      margin: 2px;
    }
  }
`;
const ExcelFileUpload = styled.label`
  height: 29px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.blue};
  border-radius: 3px;
  cursor: pointer;
`;
const FileInput = styled.input`
  display: none;
`;

const AddAutoBidPresenter = ({
                                 POWER_LINK,
                                 SHOPPING_AD,
                                 POWER_CONTENTS,
                                 title,
                                 handleCustomerChange,
                                 handleKeywordSelected,
                                 customer,
                                 customerList,
                                 campaignList,
                                 adGroupList,
                                 adsList,
                                 keywordList,
                                 checked,
                                 isChecked,
                                 handleChecked,
                                 handleAllChecked,
                                 onAddSettingBox,
                                 settingList,
                                 onDeleteKeyword,
                                 keywordOption,
                                 radioState,
                                 handleRadioTab,
                                 onAutoBidChange,
                                 onDateChange,
                                 simpleSchedule,
                                 handleSimpleScheduleSetting,
                                 handleHighScheduleSetting,
                                 scheduleChips,
                                 onAddSchedule,
                                 onScheduleClick,
                                 onAddChips,
                                 onDeleteChips,
                                 onCancel,
                                 onAddAutoBid,
                                 loading,
                                 setSettingList,
                                 setKeywordList,
                                 controlProps,

                                 searchInput,
                                 handleSearchReset,
                                 handleSearchClick,
                                 handleSearchInput,

                                 confirmOpen,
                                 handleConfirmClose,
                                 customerName,
                                 onConfirmChange,
                                 onConfirmCancel,

                                 handleTemplateDownload,
                                 handleTemplateUpload,
                             }) => {
    const {device, bid_cycle, bid_adj_amount, setting: { max_bid, min_bid }} = keywordOption;

    return (
        <View>
            {loading ?
                <ProgressBox>
                    <CircularProgress/>
                </ProgressBox>
                :
                <>
                    <Header
                        title={title}
                        handleCustomerChange={handleCustomerChange}
                        customer={customer}
                        customerList={customerList}
                        setSettingList={setSettingList}
                        setKeywordList={setKeywordList}

                        confirmOpen={confirmOpen}
                        handleConfirmClose={handleConfirmClose}
                        customerName={customerName}
                        onConfirmChange={onConfirmChange}
                        onConfirmCancel={onConfirmCancel}
                    />

                    <Title>입찰 키워드 설정</Title>
                    <SelectForm>
                        <SelectBox
                            width={240}
                            bgImg={selectArrow2}
                            onChange={e => handleKeywordSelected(e, "nccCampaignId")}
                        >
                            <option value="">캠페인명 설정</option>
                            {campaignList.map(list => (
                                <option key={list.nccCampaignId} value={list.nccCampaignId}>{list.name}</option>
                            ))}
                        </SelectBox>
                        <RightArrowBox>
                            <Image src={rightArrow}/>
                        </RightArrowBox>
                        <SelectBox
                            width={260}
                            bgImg={selectArrow2}
                            onChange={e => handleKeywordSelected(e, "nccAdgroupId")}
                        >
                            <option value="">광고그룹명 설정</option>
                            {adGroupList.map(list => <option key={list.nccAdgroupId}
                                                             value={list.nccAdgroupId}>{list.name}</option>)}
                        </SelectBox>
                        {SHOPPING_AD && (
                            <>
                                <RightArrowBox>
                                    <Image src={rightArrow}/>
                                </RightArrowBox>
                                <SelectBox
                                    width={260}
                                    bgImg={selectArrow2}
                                    onChange={e => handleKeywordSelected(e, "nccKeywordId")}
                                >
                                    <option value="">소재명 설정</option>
                                    {adsList.map(list => <option key={list.nccAdId}
                                                                 value={list.nccAdId}>{list.productTitle}</option>)}
                                </SelectBox>
                            </>
                        )}
                    </SelectForm>

                    {/* 검색 */}
                    <SearchForm>
                        <FlexBox>
                            <InputBox width={350} padding="0 10px 0 20px">
                                <Input
                                    value={searchInput}
                                    onChange={handleSearchInput}
                                    onKeyUp={e => e.key === "Enter" && handleSearchClick()}
                                    placeholder="검색할 키워드를 입력해주세요."
                                />
                                <Image src={delete_2} cursor="pointer" onClick={handleSearchReset}/>
                            </InputBox>
                            <StyledButton
                                title="검색"
                                margin="0 0 0 10px"
                                width={80}
                                height={40}
                                fontColor={colors.white}
                                bgColor={colors.black}
                                borderRadius={1}
                                onClick={handleSearchClick}
                            />
                        </FlexBox>
                        {POWER_LINK && (
                            <FlexBox>
                                <ImageButton
                                    title="대량 등록 템플릿 다운로드"
                                    fontColor={colors.blue}
                                    border={`1px solid ${colors.blue}`}
                                    bgColor={colors.white}
                                    imgSrc={download}
                                    height={29}
                                    onClick={handleTemplateDownload}
                                />
                                <ExcelFileUpload>
                                    <FileInput type="file" accept=".xls, .xlsx" onChange={handleTemplateUpload} />
                                    대량 등록 템플릿 업로드
                                </ExcelFileUpload>
                            </FlexBox>
                        )}
                    </SearchForm>

                    <TableBox>
                        <KeywordTable>
                            <TableRow height={50} borderColor={colors.gray}>
                                {SHOPPING_AD ?
                                    <TableCell fontColor={colors.darkBlack}>

                                    </TableCell>
                                    :
                                    <TableCell fontColor={colors.darkBlack}>
                                        <Checkbox
                                            onChange={handleAllChecked}
                                            checked={keywordList.length > 0 && checked.length === keywordList.length}
                                        />
                                    </TableCell>
                                }
                                <TableCell width={80} fontColor={colors.darkBlack}>키워드</TableCell>
                                {SHOPPING_AD ?
                                    <>
                                        <TableCell width={50} fontColor={colors.darkBlack}>노출수</TableCell>
                                        <TableCell width={50} fontColor={colors.darkBlack}>클릭수</TableCell>
                                        <TableCell width={80} fontColor={colors.darkBlack}>총비용</TableCell>
                                        <TableCell width={80} fontColor={colors.darkBlack}>직접전환율</TableCell>
                                    </>
                                    :
                                    <TableCell width={220} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                                }

                            </TableRow>
                            {keywordList && keywordList.map(list => {
                                let isListChecked;

                                if (SHOPPING_AD) {
                                    return (
                                        <TableRow key={list.schKeyword} borderColor={colors.lightBorderColor}>
                                            <TableCell width={50}>
                                                <Radio {...controlProps(list.id)} />
                                            </TableCell>
                                            <TableCell width={80}>{list.schKeyword}</TableCell>
                                            <TableCell width={50}>{list.impCnt}</TableCell>
                                            <TableCell width={50}>{list.clkCnt}</TableCell>
                                            <TableCell width={80}>{list.salesAmt}</TableCell>
                                            <TableCell width={80}>{list.drtCrto}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    isListChecked = isChecked(list.nccKeywordId);
                                    return (
                                        <TableRow key={list.nccKeywordId} borderColor={colors.lightBorderColor}>
                                            <TableCell onClick={e => handleChecked(e, list.nccKeywordId)}>
                                                <Checkbox checked={isListChecked} />
                                            </TableCell>
                                            <TableCell width={80}>{list.Keyword}</TableCell>
                                            <TableCell width={220}>{list.nccKeywordId}</TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </KeywordTable>


                        <StyledButton
                            title={<Image src={rightLeftArrow}/>}
                            margin="0 50px"
                            width={70}
                            height={400}
                            bgColor={colors.gray}
                            fontColor={colors.white}
                            borderRadius={5}
                            onClick={onAddSettingBox}
                        />

                        <KeywordTable>
                            <TableRow height={50} borderColor={colors.gray}>
                                <TableCell width={150} fontColor={colors.darkBlack}>키워드</TableCell>
                                {SHOPPING_AD ?
                                    <TableCell width={80} fontColor={colors.darkBlack}>소재</TableCell>
                                    :
                                    <TableCell width={220} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                                }
                                <TableCell fontColor={colors.darkBlack}>
                                    삭제
                                </TableCell>
                            </TableRow>

                            {settingList && settingList.map(list => {
                                if (SHOPPING_AD) {
                                    return (
                                        <TableRow key={list.id} borderColor={colors.lightBorderColor}>
                                            <TableCell width={150}>{list.schKeyword}</TableCell>
                                            <TableCell width={150}>{list.title}</TableCell>

                                            <TableCell>
                                                <Image src={delete_2} cursor="pointer"
                                                       onClick={() => onDeleteKeyword(list.id)}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={list.nccKeywordId} borderColor={colors.lightBorderColor}>
                                            <TableCell width={150}>{list.Keyword}</TableCell>
                                            <TableCell width={200}>{list.nccKeywordId}</TableCell>
                                            <TableCell>
                                                <Image src={delete_2} cursor="pointer"
                                                       onClick={() => onDeleteKeyword(list.nccKeywordId)}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </KeywordTable>
                    </TableBox>

                    <Title>입찰 전략 설정</Title>
                    <SettingTableBox>
                        <SettingTable>
                            <tbody>
                            <tr>
                                <td>
                                    대상 키워드
                                </td>
                                <td>
                                    {SHOPPING_AD ?
                                        settingList[0] && (settingList.length === 1 ? `${settingList[0].schKeyword}` : `${settingList[0].schKeyword} 외 ${settingList.length - 1}건`)
                                        :
                                        settingList[0] && (settingList.length === 1 ? `${settingList[0].Keyword}` : `${settingList[0].Keyword} 외 ${settingList.length - 1}건`)
                                    }
                                </td>
                                <td>
                                    디바이스
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => onAutoBidChange(e, 'device')}>
                                        <FormControlLabel
                                            label="PC"
                                            value="PC"
                                            name="device"
                                            control={<Radio/>}
                                            checked={device === "PC"}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="Mobile"
                                            value="MOBILE"
                                            name="device"
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                    </RadioGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    주기 설정
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => onAutoBidChange(e, 'bid_cycle')}>
                                        <FormControlLabel
                                            label="5분"
                                            name="bid_cycle"
                                            value={5}
                                            control={<Radio/>}
                                            checked={bid_cycle === 5}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="10분"
                                            name="bid_cycle"
                                            value={10}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="30분"
                                            name="bid_cycle"
                                            value={30}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="60분"
                                            name="bid_cycle"
                                            value={60}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                    </RadioGroup>
                                </td>
                                <td>
                                    입찰 기간 설정
                                </td>
                                <td>
                                    <DateBox>
                                        <StyledSwitch
                                            onChange={e => handleRadioTab(e, "usedDate")}
                                            disabled={!!radioState.simpleHigh}
                                        />

                                        {!!radioState.usedDate && (
                                            <>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        label="시작날짜"
                                                        name="start_Date"
                                                        value={keywordOption.start_Date}
                                                        disabled={!!radioState.simpleHigh}
                                                        // minDate={new Date('2017-01-01')}
                                                        mask="____.__.__"
                                                        inputFormat="yyyy.MM.dd"
                                                        onChange={newValue => onDateChange(newValue, "start_Date")}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                &nbsp;~&nbsp;
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        label="종료날짜"
                                                        name="end_Date"
                                                        value={keywordOption.end_Date}
                                                        disabled={!!radioState.simpleHigh}
                                                        mask="____.__.__"
                                                        inputFormat="yyyy.MM.dd"
                                                        // minDate={new Date('2017-01-01')}
                                                        onChange={newValue => onDateChange(newValue, "end_Date")}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </>
                                        )}
                                    </DateBox>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    최저가 입찰 설정
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => onAutoBidChange(e, 'lowest_Bid_ac')}>
                                        <FormControlLabel value={0} name="lowest_Bid_ac" control={<Radio/>}
                                                          label="미사용" disabled={!!radioState.simpleHigh}
                                                          checked={keywordOption.lowest_Bid_ac === 0}/>
                                        <FormControlLabel value={1} name="lowest_Bid_ac" control={<Radio/>}
                                                          label="사용" disabled={!!radioState.simpleHigh}/>
                                    </RadioGroup>
                                </td>
                                <td>
                                    설정 구분
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => handleRadioTab(e, 'simpleHigh')}>
                                        <FormControlLabel value={0} control={<Radio/>} label="간편 설정"
                                                          checked={radioState.simpleHigh === 0}/>
                                        <FormControlLabel value={1} control={<Radio/>} label="고급 설정"/>
                                    </RadioGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    입찰 조정 금액
                                </td>
                                <td>
                                    <SelectForm marginBottom="0">
                                        <RadioGroup row onChange={e => handleRadioTab(e, 'bid_adj_amount')}>
                                            <FormControlLabel value={0} name="bid_adj_amount" control={<Radio/>}
                                                              label="미사용"
                                                              checked={radioState.bid_adj_amount === 0}
                                                              disabled={!!radioState.simpleHigh}
                                            />
                                            <FormControlLabel value={1} name="bid_adj_amount" control={<Radio/>}
                                                              label="사용"
                                                              disabled={!!radioState.simpleHigh}
                                            />
                                        </RadioGroup>
                                        {radioState.bid_adj_amount !== 0 &&
                                        <InputBox>
                                            <Input
                                                name="bid_adj_amount"
                                                value={bid_adj_amount}
                                                onChange={e => onAutoBidChange(e, 'bid_adj_amount')}
                                            /> 원
                                        </InputBox>}
                                    </SelectForm>
                                </td>
                                <td>
                                    희망 순위
                                </td>
                                <td>
                                    <SelectBox
                                        width={120}
                                        bgImg={selectArrow3}
                                        padding="0 10px"
                                        name="target_Rank"
                                        onChange={e => onAutoBidChange(e, 'target_Rank')}
                                    >
                                        <option value={0}>희망순위</option>
                                        <option value={1}>1 위</option>
                                        <option value={2}>2 위</option>
                                        <option value={3}>3 위</option>
                                        {!POWER_CONTENTS &&
                                        <>
                                            <option value={4}>4 위</option>
                                            <option value={5}>5 위</option>
                                            {device === "PC" &&
                                            <>
                                                <option value={6}>6 위</option>
                                                <option value={7}>7 위</option>
                                                <option value={8}>8 위</option>
                                                <option value={9}>9 위</option>
                                                <option value={10}>10 위</option>
                                            </>}
                                        </>
                                        }

                                    </SelectBox>
                                </td>
                            </tr>
                            {radioState.simpleHigh === 0 &&
                            <tr>
                                <td>요일 설정</td>
                                <td>
                                    <RadioGroup row onChange={e => handleSimpleScheduleSetting(e, 'week')}>
                                        <FormControlLabel value="all" control={<Radio/>} label="매일"
                                                          checked={simpleSchedule.week === 'all'}/>
                                        <FormControlLabel value="weekDays" control={<Radio/>} label="주중"/>
                                        <FormControlLabel value="weekend" control={<Radio/>} label="주말"/>
                                    </RadioGroup>
                                </td>
                                <td>시간 설정</td>
                                <td>
                                    <RadioGroup row onChange={e => handleSimpleScheduleSetting(e, 'time')}>
                                        <FormControlLabel value="0~23" control={<Radio/>} label="00시~24시"
                                                          checked={simpleSchedule.time === '0~23'}/>
                                        <FormControlLabel value="9~18" control={<Radio/>} label="09시~18시"/>
                                    </RadioGroup>
                                </td>
                            </tr>
                            }
                            <tr>
                                <td>
                                    최소 입찰가
                                </td>
                                <td>
                                    <InputBox>
                                        <Input
                                            name="min_bid"
                                            value={min_bid}
                                            onChange={e => onAutoBidChange(e, 'min_bid')}
                                        /> 원
                                    </InputBox>
                                </td>
                                <td>
                                    최대 입찰가
                                </td>
                                <td>
                                    <InputBox>
                                        <Input
                                            name="max_bid"
                                            value={max_bid}
                                            onChange={e => onAutoBidChange(e, 'max_bid')}
                                        /> 원
                                    </InputBox>
                                </td>
                            </tr>
                            </tbody>
                        </SettingTable>
                    </SettingTableBox>


                    {radioState.simpleHigh === 1 &&
                    <>
                        <ButtonGroup margin="20px 0 30px">
                            <StyledButton
                                title="스케줄 추가"
                                width={110}
                                height={40}
                                borderRadius={3}
                                fontSize={14}
                                fontWeight={400}
                                fontColor={colors.white}
                                bgColor={colors.blue}
                                onClick={onAddSchedule}
                            />
                        </ButtonGroup>

                        <Title>입찰 관리 스케줄 설정</Title>
                        <ScheduleCardBox>
                            {scheduleChips.map((chip, index) => (
                                <ScheduleCard
                                    key={chip.id}
                                    bgColor={chip.bgColor}
                                    targetRank={chip.targetRank}
                                    maxBid={chip.maxBid}
                                    minBid={chip.minBid}
                                    active={chip.active}
                                    onDeleteChips={() => onDeleteChips(chip.id)}
                                    onScheduleClick={() => onScheduleClick(chip.id)}
                                />
                            ))}
                        </ScheduleCardBox>


                        <SelectForm>
                            <SelectBox width={140} bgImg={selectArrow3} name="week"
                                       onChange={handleHighScheduleSetting}>
                                <option value="">요일선택</option>
                                <option value="mon">월요일</option>
                                <option value="tue">화요일</option>
                                <option value="wed">수요일</option>
                                <option value="thu">목요일</option>
                                <option value="fri">금요일</option>
                                <option value="sat">토요일</option>
                                <option value="sun">일요일</option>
                                <option value="weekDays">주중</option>
                                <option value="weekend">주말</option>
                                <option value="all">매일</option>
                            </SelectBox>
                            <SelectBox width={140} bgImg={clock} name="start" onChange={handleHighScheduleSetting}>
                                <option value="">시작 시간</option>
                                {[...Array(24)].map((none, index) => {
                                    return (
                                        <option key={index < 10 ? `0${index}` : index}
                                                value={index < 10 ? `0${index}` : index}>{index < 10 ? `0${index}` : index}시</option>
                                    )
                                })}
                            </SelectBox>
                            ~
                            <SelectBox width={140} bgImg={clock} name="finish" onChange={handleHighScheduleSetting}>
                                <option value="">종료 시간</option>
                                {[...Array(24)].map((none, index) => {
                                    return (
                                        <option key={index < 9 ? `0${index}` : index}
                                                value={index < 9 ? `0${index}` : index}>{index < 9 ? `0${index + 1}` : index + 1}시</option>
                                    )
                                })}
                            </SelectBox>

                            <StyledButton
                                title="시간 설정"
                                width={100}
                                height={40}
                                bgColor={colors.blue}
                                borderRadius={3}
                                fontSize={14}
                                fontWeight={400}
                                fontColor={colors.white}
                                onClick={onAddChips}
                            />
                        </SelectForm>


                        <ScheduleGraphBox>
                            <Row bgColor={colors.bgColor}>
                                <Cell width="150px"/>
                                <Cell>00 시</Cell>
                                <Cell>01 시</Cell>
                                <Cell>02 시</Cell>
                                <Cell>03 시</Cell>
                                <Cell>04 시</Cell>
                                <Cell>05 시</Cell>
                                <Cell>06 시</Cell>
                                <Cell>07 시</Cell>
                                <Cell>08 시</Cell>
                                <Cell>09 시</Cell>
                                <Cell>10 시</Cell>
                                <Cell>11 시</Cell>
                                <Cell>12 시</Cell>
                                <Cell>13 시</Cell>
                                <Cell>14 시</Cell>
                                <Cell>15 시</Cell>
                                <Cell>16 시</Cell>
                                <Cell>17 시</Cell>
                                <Cell>18 시</Cell>
                                <Cell>19 시</Cell>
                                <Cell>20 시</Cell>
                                <Cell>21 시</Cell>
                                <Cell>22 시</Cell>
                                <Cell>23 시</Cell>
                            </Row>
                            <Row>
                                <Cell width="150px">월요일</Cell>

                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['mon'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">화요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['tue'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">수요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['wed'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">목요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['thu'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">금요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['fri'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">토요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['sat'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                            <Row>
                                <Cell width="150px">일요일</Cell>
                                {[...Array(24)].map((none, index) => {
                                    let schedule = scheduleChips.map(a => ({
                                        bgColor: a.bgColor,
                                        time: a['sun'].find(b => b === index && true)
                                    }));
                                    let cell = schedule.find(c => c.time === index && true);
                                    return <Cell key={index} bgColor={cell ? cell.bgColor : undefined}/>
                                })}
                            </Row>
                        </ScheduleGraphBox>
                    </>
                    }

                    <ButtonGroup>
                        <StyledButton
                            title="취소"
                            width={200}
                            height={65}
                            fontSize={18}
                            fontWeight={500}
                            bgColor={colors.white}
                            fontColor={colors.blue}
                            border={`1px solid ${colors.blue}`}
                            onClick={onCancel}
                        />
                        <StyledButton
                            title="입찰 등록"
                            margin="0 0 0 12px"
                            width={200}
                            height={65}
                            fontSize={18}
                            fontWeight={500}
                            bgColor={colors.blue}
                            fontColor={colors.white}
                            onClick={onAddAutoBid}
                        />
                    </ButtonGroup>
                </>
            }
        </View>
    )
}

export default React.memo(AddAutoBidPresenter);