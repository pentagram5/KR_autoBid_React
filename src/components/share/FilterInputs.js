import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import selectArrow3 from "../../assets/selectArrow3.svg";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Wrapper = styled.div`
  width: 300px;
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.lightBlack};
  margin-bottom: 8px;
`;
const InputBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid ${colors.lightBorderColor};
`;
const Input = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  &::placeholder {
    font-size: 16px;
    color: ${colors.lightBorderColor};
  }
`;
const SelectBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 15px;
  border: 1px solid ${colors.lightBorderColor};
  background: url(${selectArrow3}) no-repeat 95% 50%;
`;
const Select = styled.select`
  width: 80%;
  height: 100%;
  border: none;
  padding: 0;
  &::placeholder {
    font-size: 16px;
    color: ${colors.lightBorderColor};
  }
`;

const FilterInput = ({title, name, onChange, value, radio, input, select, options}) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            {radio &&
            <RadioGroup row name={name} onChange={onChange} value={value}>
                <FormControlLabel value={0} control={<Radio />} label="포함" />
                <FormControlLabel value={1} control={<Radio />} label="일치" />
            </RadioGroup>
            }
            {input &&
            <InputBox>
                <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={`${title}${title === "최대 입찰가" ? "를" : "을"} 입력하세요.`}
                />
            </InputBox>
            }
            {select &&
            <SelectBox>
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <option value="">전체</option>
                    {options.map(opt => opt.name ? (
                        <option value={opt.value} key={opt.value}>{opt.name}</option>
                    ) : (
                        <option value={opt} key={opt}>{opt}</option>
                    ))}
                </Select>
            </SelectBox>
            }
        </Wrapper>
    )
}

export default React.memo(FilterInput);