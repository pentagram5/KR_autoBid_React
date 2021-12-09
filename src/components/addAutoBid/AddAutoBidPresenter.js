import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import StyledButton from "../share/StyledButton";
import selectArrow2 from "../../assets/selectArrow2.svg";
import selectArrow3 from "../../assets/selectArrow3.svg";
import rightArrow from "../../assets/rightArrow.svg";
import rightLeftArrow from "../../assets/rightLeftArrow.svg";
import delete_2 from "../../assets/delete_2.svg";
import chipDelete from "../../assets/chipDelete.svg";
import clock from "../../assets/clock.svg";
import Header from "../share/Header";

const View = styled.div`
  width: calc(100vw - 300px);
  padding: 30px 50px 400px;
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
  margin: 60px 0 160px;
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
const ChipBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 10px;
`;
const StyledChip = styled(Chip)`
  padding-right: 5px !important;
  margin-right: 10px !important;
  background-color: ${colors.lightYellow} !important;

  span {
    color: ${colors.lightBlack};
  }
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
  height: 40px;
  font-size: 14px;
  color: ${colors.deepGray};
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  border: 1px solid ${colors.lightBorderColor};
`;

const AddAutoBidPresenter = ({
                                 title,
                                 handleCustomerChange,
                                 handleKeywordSelected,
                                 customer,
                                 customerList,
                                 campaignList,
                                 adGroupList,
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
                                 onAutoBidChange
                             }) => {
    const { device, bid_cycle, bid_adj_amount } = keywordOption;

    console.info(bid_adj_amount);
    return (
        <View>
            <Header
                title={title}
                handleCustomerChange={handleCustomerChange}
                customer={customer}
                customerList={customerList}
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
            </SelectForm>
            <TableBox>
                <KeywordTable>
                    <TableRow height={50} borderColor={colors.gray}>
                        <TableCell fontColor={colors.darkBlack}>
                            <Checkbox
                                onChange={handleAllChecked}
                                checked={keywordList.length > 0 && checked.length === keywordList.length}
                            />
                        </TableCell>
                        <TableCell width={80} fontColor={colors.darkBlack}>키워드</TableCell>
                        <TableCell width={220} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                    </TableRow>


                    {keywordList && keywordList.map(list => {
                        const isListChecked = isChecked(list.nccKeywordId);

                        return (
                            <TableRow key={list.nccKeywordId} borderColor={colors.lightBorderColor}>
                                <TableCell onClick={e => handleChecked(e, list.nccKeywordId)}>
                                    <Checkbox
                                        checked={isListChecked}
                                    />
                                </TableCell>
                                <TableCell width={80}>{list.Keyword}</TableCell>
                                <TableCell width={220}>{list.nccKeywordId}</TableCell>
                            </TableRow>
                        )
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
                        <TableCell width={200} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                        <TableCell fontColor={colors.darkBlack}>
                            삭제
                        </TableCell>
                    </TableRow>

                    {settingList && settingList.map(list => {
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
                            {settingList[0] && (settingList.length === 1 ? `${settingList[0].Keyword}` : `${settingList[0].Keyword} 외 ${settingList.length - 1}건`)}
                        </td>
                        <td>
                            디바이스
                        </td>
                        <td>
                            <RadioGroup row onChange={e => onAutoBidChange(e, 'device')}>
                                <FormControlLabel value="PC" name="device" control={<Radio/>} label="PC" checked={device === "PC"} />
                                <FormControlLabel value="MOBILE" name="device" control={<Radio/>} label="Mobile" />
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            주기 설정
                        </td>
                        <td colSpan={3}>
                            <RadioGroup row onChange={e => onAutoBidChange(e, 'bid_cycle')}>
                                <FormControlLabel value={5} name="bid_cycle" control={<Radio/>} label="5분" checked={bid_cycle === 5} />
                                <FormControlLabel value={10} name="bid_cycle"  control={<Radio/>} label="10분"/>
                                <FormControlLabel value={20} name="bid_cycle"  control={<Radio/>} label="20분"/>
                                <FormControlLabel value={30} name="bid_cycle"  control={<Radio/>} label="30분"/>
                                <FormControlLabel value={60} name="bid_cycle"  control={<Radio/>} label="60분"/>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            설정 구분
                        </td>
                        <td colSpan={3}>
                            <RadioGroup row onChange={e => handleRadioTab(e, 'simpleHigh')}>
                                <FormControlLabel value={0} control={<Radio/>} label="간편 설정" checked={radioState.simpleHigh === 0} />
                                <FormControlLabel value={1} control={<Radio/>} label="고급 설정" />
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            입찰 조정 금액
                        </td>
                        <td>
                            <SelectForm>
                                <RadioGroup row onChange={e => handleRadioTab(e, 'bid_adj_amount')}>
                                    <FormControlLabel value={0} name="bid_adj_amount" control={<Radio/>} label="미사용" checked={radioState.bid_adj_amount === 0} />
                                    <FormControlLabel value={1} name="bid_adj_amount" control={<Radio/>} label="사용"/>
                                </RadioGroup>
                                {radioState.bid_adj_amount !== 0  &&
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
                            >
                                {device === "PC" ? 
                                    <>
                                        <option value={0}>희망순위</option>
                                        <option value={1}>1 위</option>
                                        <option value={2}>2 위</option>
                                        <option value={3}>3 위</option>
                                        <option value={4}>4 위</option>
                                        <option value={5}>5 위</option>
                                        <option value={6}>6 위</option>
                                        <option value={7}>7 위</option>
                                        <option value={8}>8 위</option>
                                        <option value={9}>9 위</option>
                                        <option value={10}>10 위</option>
                                    </>
                                    :
                                    <>
                                        <option value={0}>희망순위</option>
                                        <option value={1}>1 위</option>
                                        <option value={2}>2 위</option>
                                        <option value={3}>3 위</option>
                                        <option value={4}>4 위</option>
                                        <option value={5}>5 위</option>
                                    </>
                                }
                                
                            </SelectBox>
                        </td>
                    </tr>
                    {radioState.simpleHigh === 0 &&
                        <tr>
                            <td>요일 설정</td>
                            <td>
                                <RadioGroup row>
                                    <FormControlLabel value={0} control={<Radio/>} label="매일"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="주중"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="주말"/>
                                </RadioGroup>
                            </td>
                            <td>시간 설정</td>
                            <td>
                                <RadioGroup row>
                                    <FormControlLabel value={0} control={<Radio/>} label="00시~23시"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="09시~18시"/>
                                </RadioGroup>
                            </td>
                        </tr>
                    }
                    <tr>
                        <td>
                            최대 입찰가
                        </td>
                        <td>
                            <InputBox>
                                <Input/> 원
                            </InputBox>
                        </td>
                        <td>
                            최소 입찰가
                        </td>
                        <td>
                            <InputBox>
                                <Input/> 원
                            </InputBox>
                        </td>
                    </tr>
                    </tbody>
                </SettingTable>
            </SettingTableBox>

            <Title>입찰 관리 스케줄 설정</Title>
            <SelectForm>
                <SelectBox width={140} bgImg={selectArrow3}>
                    <option value="">요일선택</option>
                    <option value="mon">월요일</option>
                    <option value="tue">화요일</option>
                    <option value="web">수요일</option>
                    <option value="thu">목요일</option>
                    <option value="fri">금요일</option>
                    <option value="sat">토요일</option>
                    <option value="sun">일요일</option>
                </SelectBox>
                <SelectBox width={140} bgImg={clock}>
                    <option>시작 시간</option>
                    <option>00 AM</option>
                    <option>01 AM</option>
                </SelectBox>
                ~
                <SelectBox width={140} bgImg={clock}>
                    <option>종료 시간</option>
                    <option>01 PM</option>
                </SelectBox>
            </SelectForm>

            <ChipBox>
                <StyledChip
                    label="Clickable Deletable"
                    onDelete={() => console.info('')}
                    deleteIcon={<Image src={chipDelete}/>}
                />
            </ChipBox>
            <ScheduleGraphBox>
                <Row bgColor={colors.bgColor}>
                    <Cell width="150px"/>
                    <Cell>00 AM</Cell>
                    <Cell>01 AM</Cell>
                    <Cell>02 AM</Cell>
                    <Cell>03 AM</Cell>
                    <Cell>04 AM</Cell>
                    <Cell>05 AM</Cell>
                    <Cell>06 AM</Cell>
                    <Cell>07 AM</Cell>
                    <Cell>08 AM</Cell>
                    <Cell>09 AM</Cell>
                    <Cell>10 AM</Cell>
                    <Cell>11 AM</Cell>
                    <Cell>12 PM</Cell>
                    <Cell>01 PM</Cell>
                    <Cell>02 PM</Cell>
                    <Cell>03 PM</Cell>
                    <Cell>04 PM</Cell>
                    <Cell>05 PM</Cell>
                    <Cell>06 PM</Cell>
                    <Cell>07 PM</Cell>
                    <Cell>08 PM</Cell>
                    <Cell>09 PM</Cell>
                    <Cell>10 PM</Cell>
                    <Cell>11 PM</Cell>
                </Row>
                <Row>
                    <Cell width="150px">월요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">화요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">수요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">목요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">금요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">토요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
                <Row>
                    <Cell width="150px">일요일</Cell>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                    <Cell/>
                </Row>
            </ScheduleGraphBox>

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
                />
            </ButtonGroup>
        </View>
    )
}

export default AddAutoBidPresenter;