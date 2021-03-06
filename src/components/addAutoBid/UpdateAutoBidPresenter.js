import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import StyledButton from "../share/StyledButton";
import selectArrow3 from "../../assets/selectArrow3.svg";
import delete_2 from "../../assets/delete_2.svg";
import clock from "../../assets/clock.svg";
import Header from "../share/Header";
import ScheduleCard from "../share/ScheduleCard";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

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
// const RightArrowBox = styled.div`
//   margin: 0 15px;
// `;
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
  justify-content: space-around;
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
  width: 180px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
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

const UpdateAutoBidPresenter = ({
                                    POWER_CONTENTS,
                                    SHOPPING_AD,
                                    title,

                                    handleCustomerChange,
                                    onDateChange,
                                    keywordList,

                                    onDeleteKeyword,
                                    keywordOption,
                                    radioState,
                                    handleRadioTab,
                                    onAutoBidChange,
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

                                }) => {

    const {device, bid_cycle, setting: { max_bid, min_bid, target_Rank, bid_adj_amount }} = keywordOption;

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
                        update
                    />

                    <TableBox>
                        <KeywordTable>
                            <TableRow height={50} borderColor={colors.gray}>
                                <TableCell width={100} fontColor={colors.darkBlack}>?????????</TableCell>
                                {SHOPPING_AD ?
                                    <TableCell width={200} fontColor={colors.darkBlack}>??????</TableCell>
                                    :
                                    <TableCell width={200} fontColor={colors.darkBlack}>????????? ?????????</TableCell>
                                }
                                <TableCell fontColor={colors.darkBlack}>
                                    ??????
                                </TableCell>
                            </TableRow>

                            {keywordList && keywordList.map(list => {
                                if (SHOPPING_AD) {
                                    return (
                                        <TableRow key={list.nccKeywordId} borderColor={colors.lightBorderColor}>
                                            <TableCell width={100}>{list.schKeyword}</TableCell>
                                            <TableCell width={200}>{list.nccKeywordId}</TableCell>

                                            <TableCell>
                                                <Image src={delete_2} cursor="pointer"
                                                       onClick={() => onDeleteKeyword(list.nccKeywordId, list.schKeyword)}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={list.nccKeywordId} borderColor={colors.lightBorderColor}>
                                            <TableCell width={100}>{list.Keyword}</TableCell>
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

                    <Title>?????? ?????? ??????</Title>
                    <SettingTableBox>
                        <SettingTable>
                            <tbody>
                            <tr>
                                <td>
                                    ?????? ?????????
                                </td>
                                <td>
                                    {SHOPPING_AD ?
                                        keywordList[0] && (keywordList.length === 1 ? `${keywordList[0].schKeyword}` : `${keywordList[0].schKeyword} ??? ${keywordList.length - 1}???`)
                                        :
                                        keywordList[0] && (keywordList.length === 1 ? `${keywordList[0].Keyword}` : `${keywordList[0].Keyword} ??? ${keywordList.length - 1}???`)
                                    }
                                </td>
                                <td>
                                    ????????????
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
                                            checked={device === "MOBILE"}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                    </RadioGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ?????? ??????
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => onAutoBidChange(e, 'bid_cycle')}>
                                        <FormControlLabel
                                            label="5???"
                                            name="bid_cycle"
                                            value={5}
                                            control={<Radio/>}
                                            checked={bid_cycle === 5}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="10???"
                                            name="bid_cycle"
                                            value={10}
                                            checked={bid_cycle === 10}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="30???"
                                            name="bid_cycle"
                                            value={30}
                                            checked={bid_cycle === 30}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                        <FormControlLabel
                                            label="60???"
                                            name="bid_cycle"
                                            value={60}
                                            checked={bid_cycle === 60}
                                            control={<Radio/>}
                                            disabled={!!radioState.simpleHigh}
                                        />
                                    </RadioGroup>
                                </td>
                                <td>
                                    ?????? ?????? ??????
                                </td>
                                <td>
                                    <DateBox>
                                        <StyledSwitch
                                            onChange={e => handleRadioTab(e, "usedDate")}
                                            disabled={!!radioState.simpleHigh}
                                            checked={!!radioState.usedDate}
                                        />

                                        {!!radioState.usedDate && (
                                            <>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        label="????????????"
                                                        name="start_Date"
                                                        value={keywordOption.start_Date}
                                                        // minDate={new Date('2017-01-01')}
                                                        disabled={!!radioState.simpleHigh}
                                                        mask="____.__.__"
                                                        inputFormat="yyyy.MM.dd"
                                                        onChange={newValue => onDateChange(newValue, "start_Date")}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                &nbsp;~&nbsp;
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        label="????????????"
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
                                    ????????? ?????? ??????
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => onAutoBidChange(e, 'lowest_Bid_ac')}>
                                        <FormControlLabel
                                            value={0}
                                            name="lowest_Bid_ac"
                                            control={<Radio/>}
                                            label="?????????"
                                            disabled={!!radioState.simpleHigh}
                                            checked={keywordOption.lowest_Bid_ac === 0}
                                        />
                                        <FormControlLabel
                                            value={1}
                                            name="lowest_Bid_ac"
                                            control={<Radio/>}
                                            label="??????"
                                            disabled={!!radioState.simpleHigh}
                                            checked={keywordOption.lowest_Bid_ac === 1}
                                        />
                                    </RadioGroup>
                                </td>
                                <td>
                                    ?????? ??????
                                </td>
                                <td>
                                    <RadioGroup row onChange={e => handleRadioTab(e, 'simpleHigh')}>
                                        <FormControlLabel value={0} control={<Radio/>} label="?????? ??????"
                                                          checked={radioState.simpleHigh === 0}/>
                                        <FormControlLabel value={1} control={<Radio/>} label="?????? ??????" checked={radioState.simpleHigh === 1}/>
                                    </RadioGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ?????? ?????? ??????
                                </td>
                                <td>
                                    <SelectForm marginBottom="0">
                                        <RadioGroup row onChange={e => handleRadioTab(e, 'bid_adj_amount')}>
                                            <FormControlLabel value={0} name="bid_adj_amount" control={<Radio/>}
                                                              label="?????????"
                                                              checked={radioState.bid_adj_amount === 0}
                                                              disabled={!!radioState.simpleHigh}
                                            />
                                            <FormControlLabel value={1} name="bid_adj_amount" control={<Radio/>}
                                                              label="??????"
                                                              checked={radioState.bid_adj_amount === 1}
                                                              disabled={!!radioState.simpleHigh}
                                            />
                                        </RadioGroup>
                                        {radioState.bid_adj_amount !== 0 &&
                                        <InputBox>
                                            <Input
                                                name="bid_adj_amount"
                                                value={bid_adj_amount}
                                                onChange={e => onAutoBidChange(e, 'bid_adj_amount')}
                                                disabled={radioState.simpleHigh}
                                            /> ???
                                        </InputBox>}
                                    </SelectForm>
                                </td>
                                <td>
                                    ?????? ??????
                                </td>
                                <td>
                                    <SelectBox
                                        width={120}
                                        bgImg={selectArrow3}
                                        padding="0 10px"
                                        name="target_Rank"
                                        value={target_Rank}
                                        onChange={e => onAutoBidChange(e, 'target_Rank')}
                                    >
                                        <option value={0}>????????????</option>
                                        <option value={1}>1 ???</option>
                                        <option value={2}>2 ???</option>
                                        <option value={3}>3 ???</option>
                                        {!POWER_CONTENTS &&
                                        <>
                                            <option value={4}>4 ???</option>
                                            <option value={5}>5 ???</option>
                                            {device === "PC" &&
                                            <>
                                                <option value={6}>6 ???</option>
                                                <option value={7}>7 ???</option>
                                                <option value={8}>8 ???</option>
                                                <option value={9}>9 ???</option>
                                                <option value={10}>10 ???</option>
                                            </>}
                                        </>
                                        }

                                    </SelectBox>
                                </td>
                            </tr>
                            {radioState.simpleHigh === 0 &&
                            <tr>
                                <td>?????? ??????</td>
                                <td>
                                    <RadioGroup row onChange={e => handleSimpleScheduleSetting(e, 'week')}>
                                        <FormControlLabel value="all" control={<Radio/>} label="??????"
                                                          checked={simpleSchedule.week === 'all'}/>
                                        <FormControlLabel value="weekDays" control={<Radio/>} label="??????"
                                                          checked={simpleSchedule.week === 'weekDays'}/>
                                        <FormControlLabel value="weekend" control={<Radio/>} label="??????"
                                                          checked={simpleSchedule.week === 'weekend'}/>
                                    </RadioGroup>
                                </td>
                                <td>?????? ??????</td>
                                <td>
                                    <RadioGroup row onChange={e => handleSimpleScheduleSetting(e, 'time')}>
                                        <FormControlLabel value="0~23" control={<Radio/>} label="00???~24???"
                                                          checked={simpleSchedule.time === '0~23'}/>
                                        <FormControlLabel value="9~18" control={<Radio/>} label="09???~18???" checked={simpleSchedule.time === '9~18'}/>
                                    </RadioGroup>
                                </td>
                            </tr>
                            }
                            <tr>
                                <td>
                                    ?????? ?????????
                                </td>
                                <td>
                                    <InputBox>
                                        <Input
                                            name="min_bid"
                                            value={min_bid}
                                            onChange={e => onAutoBidChange(e, 'min_bid')}
                                        /> ???
                                    </InputBox>
                                </td>
                                <td>
                                    ?????? ?????????
                                </td>
                                <td>
                                    <InputBox>
                                        <Input
                                            name="max_bid"
                                            value={max_bid}
                                            onChange={e => onAutoBidChange(e, 'max_bid')}
                                        /> ???
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
                                title="????????? ??????"
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

                        <Title>?????? ?????? ????????? ??????</Title>
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
                                <option value="">????????????</option>
                                <option value="mon">?????????</option>
                                <option value="tue">?????????</option>
                                <option value="wed">?????????</option>
                                <option value="thu">?????????</option>
                                <option value="fri">?????????</option>
                                <option value="sat">?????????</option>
                                <option value="sun">?????????</option>
                                <option value="weekDays">??????</option>
                                <option value="weekend">??????</option>
                                <option value="all">??????</option>
                            </SelectBox>
                            <SelectBox width={140} bgImg={clock} name="start" onChange={handleHighScheduleSetting}>
                                <option value="">?????? ??????</option>
                                {[...Array(24)].map((none, index) => {
                                    return (
                                        <option key={index < 10 ? `0${index}` : index}
                                                value={index < 10 ? `0${index}` : index}>{index < 10 ? `0${index}` : index}???</option>
                                    )
                                })}
                            </SelectBox>
                            ~
                            <SelectBox width={140} bgImg={clock} name="finish" onChange={handleHighScheduleSetting}>
                                <option value="">?????? ??????</option>
                                {[...Array(24)].map((none, index) => {
                                    return (
                                        <option key={index < 9 ? `0${index}` : index}
                                                value={index < 9 ? `0${index}` : index}>{index < 9 ? `0${index + 1}` : index + 1}???</option>
                                    )
                                })}
                            </SelectBox>

                            <StyledButton
                                title="?????? ??????"
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
                                <Cell>00 ???</Cell>
                                <Cell>01 ???</Cell>
                                <Cell>02 ???</Cell>
                                <Cell>03 ???</Cell>
                                <Cell>04 ???</Cell>
                                <Cell>05 ???</Cell>
                                <Cell>06 ???</Cell>
                                <Cell>07 ???</Cell>
                                <Cell>08 ???</Cell>
                                <Cell>09 ???</Cell>
                                <Cell>10 ???</Cell>
                                <Cell>11 ???</Cell>
                                <Cell>12 ???</Cell>
                                <Cell>13 ???</Cell>
                                <Cell>14 ???</Cell>
                                <Cell>15 ???</Cell>
                                <Cell>16 ???</Cell>
                                <Cell>17 ???</Cell>
                                <Cell>18 ???</Cell>
                                <Cell>19 ???</Cell>
                                <Cell>20 ???</Cell>
                                <Cell>21 ???</Cell>
                                <Cell>22 ???</Cell>
                                <Cell>23 ???</Cell>
                            </Row>
                            <Row>
                                <Cell width="150px">?????????</Cell>

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
                                <Cell width="150px">?????????</Cell>
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
                                <Cell width="150px">?????????</Cell>
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
                                <Cell width="150px">?????????</Cell>
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
                                <Cell width="150px">?????????</Cell>
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
                                <Cell width="150px">?????????</Cell>
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
                                <Cell width="150px">?????????</Cell>
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
                            title="??????"
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
                            title="?????? ??????"
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

export default React.memo(UpdateAutoBidPresenter);