import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StyledButton from "../share/StyledButton";
import selectArrow2 from "../../assets/selectArrow2.svg";
import selectArrow3 from "../../assets/selectArrow3.svg";
import rightArrow from "../../assets/rightArrow.svg";
import rightLeftArrow from "../../assets/rightLeftArrow.svg";
import delete_2 from "../../assets/delete_2.svg";

const View = styled.div`
  width: calc(100vw - 300px);
  padding: 30px 50px 400px;
`;
const MainTitle = styled.div`
  height: 52px;
  color: ${colors.lightBlack};
  line-height: 1.5;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
`;
const Title = styled.div`
  font-size: 18px;
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
  color: ${colors.darkGray};
  border-radius: 3px;
  border: 1px solid ${colors.lightBorderColor};
  background: url(${({bgImg}) => bgImg}) 95% 50% no-repeat;
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
  display: flex;
  align-items: center;
  margin: 10px 0 40px;
`;
const KeywordTable = styled.div`
  width: 650px;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingTableBox = styled.div`
  width: 100%;
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
  color: ${colors.gray};
  border: 1px solid ${colors.borderColor};
`;

const AddAutoBidPresenter = ({ title }) => {
    return (
        <View>
            <MainTitle>{title}</MainTitle>
            <Title>입찰 키워드 설정</Title>
            <SelectForm>
                <SelectBox
                    width={240}
                    bgImg={selectArrow2}
                >
                    <option>키워드</option>
                </SelectBox>
                <RightArrowBox>
                    <Image src={rightArrow}/>
                </RightArrowBox>
                <SelectBox
                    width={240}
                    bgImg={selectArrow2}
                >
                    <option>키워드</option>
                </SelectBox>
            </SelectForm>
            <TableBox>
                <KeywordTable>
                    <TableRow height={50} borderColor={colors.gray}>
                        <TableCell fontColor={colors.darkBlack}>
                            <Checkbox/>
                        </TableCell>
                        <TableCell width={80} fontColor={colors.darkBlack}>키워드</TableCell>
                        <TableCell width={220} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                    </TableRow>

                    <TableRow borderColor={colors.lightBorderColor}>
                        <TableCell>
                            <Checkbox/>
                        </TableCell>
                        <TableCell width={80}>키워드</TableCell>
                        <TableCell width={220}>키워드 아이디</TableCell>
                    </TableRow>

                </KeywordTable>
                <StyledButton
                    title={<Image src={rightLeftArrow}/>}
                    margin="0 50px"
                    width={70}
                    height={400}
                    bgColor={colors.gray}
                    fontColor={colors.white}
                    borderRadius={5}
                />

                <KeywordTable>
                    <TableRow height={50} borderColor={colors.gray}>
                        <TableCell width={150} fontColor={colors.darkBlack}>키워드</TableCell>
                        <TableCell width={200} fontColor={colors.darkBlack}>키워드 아이디</TableCell>
                        <TableCell fontColor={colors.darkBlack}>
                            삭제
                        </TableCell>
                    </TableRow>

                    <TableRow borderColor={colors.lightBorderColor}>
                        <TableCell width={150}>키워드</TableCell>
                        <TableCell width={200}>키워드 아이디</TableCell>
                        <TableCell>
                            <Image src={delete_2} cursor="pointer"/>
                        </TableCell>
                    </TableRow>
                </KeywordTable>
            </TableBox>

            <ButtonGroup>
                <StyledButton
                    title="입찰 전략 설정"
                    margin="40px 0 60px"
                    width={200}
                    height={65}
                    bgColor={colors.blue}
                    fontColor={colors.white}
                    borderRadius={1}
                />
            </ButtonGroup>

            <Title>입찰 전략 설정</Title>
            <SettingTableBox>
                <SettingTable>
                    <tbody>
                        <tr>
                            <td>
                                대상 키워드
                            </td>
                            <td>

                            </td>
                            <td>
                                디바이스
                            </td>
                            <td>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel value="PC" control={<Radio />} label="PC" />
                                    <FormControlLabel value="MOBILE" control={<Radio />} label="Mobile" />
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                주기 설정
                            </td>
                            <td colSpan={3}>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel value={5} control={<Radio />} label="5분" />
                                    <FormControlLabel value={10} control={<Radio />} label="10분" />
                                    <FormControlLabel value={20} control={<Radio />} label="20분" />
                                    <FormControlLabel value={30} control={<Radio />} label="30분" />
                                    <FormControlLabel value={60} control={<Radio />} label="60분" />
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                설정 구분
                            </td>
                            <td colSpan={3}>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel value="PC" control={<Radio />} label="간편 설정" />
                                    <FormControlLabel value="MOBILE" control={<Radio />} label="고급 설정" />
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                입찰 조정 금액
                            </td>
                            <td>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel value={0} control={<Radio />} label="미사용" />
                                    <FormControlLabel value={1} control={<Radio />} label="사용" />
                                </RadioGroup>
                            </td>
                            <td>
                                희망 순위
                            </td>
                            <td>
                                <SelectBox
                                    width={120}
                                    bgImg={selectArrow3}
                                >
                                    <option>희망순위</option>
                                </SelectBox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                최대 입찰가
                            </td>
                            <td>
                                <InputBox>
                                </InputBox>
                                원
                            </td>
                            <td>
                                최소 입찰가
                            </td>
                            <td>
                                <InputBox>
                                </InputBox>
                                원
                            </td>
                        </tr>
                    </tbody>
                </SettingTable>
            </SettingTableBox>
        </View>
    )
}

export default AddAutoBidPresenter;