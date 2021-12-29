import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import selectArrow from "../../assets/selectArrow.svg";

const View = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;`;
const Title = styled.div`
  color: ${colors.lightBlack};
  font-size: 36px;
  font-weight: 700;
`;
const AdvertiserSelector = styled.div`
  display: flex;
  align-items: center;`;
const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.lightBlack};
`;
const SelectBox = styled.select`
  width: 200px;
  height: 35px;
  font-size: 16px;
  color: ${colors.white};
  margin-left: 24px;
  padding: 0 20px;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  border-radius: 18px;
  cursor: pointer;
  background: url(${selectArrow}) 95% 50% no-repeat ${colors.graySkyblue};
`;



const Header = ({
                    title,
                    handleCustomerChange,
                    customer,
                    customerList,
                    update,
}) => {
    return (
        <View>
            <Title>{title}</Title>
            {!update &&
                <AdvertiserSelector>
                    <Text>광고주</Text>
                    <SelectBox
                        onChange={handleCustomerChange}
                        value={customer.CUSTOMER_ID}
                    >
                        {customerList.map(list => (
                            <option key={list.CUSTOMER_ID} value={list.CUSTOMER_ID}>{list.show_login}</option>
                        ))}
                    </SelectBox>
                </AdvertiserSelector>
            }
        </View>
    )
}

export default Header;