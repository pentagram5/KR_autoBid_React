import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  width: 220px;
  height: 182px;
  border-radius: 6px;
  border: 1px solid ${colors.lightBorderColor};
`;
const Top = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ bgColor }) => bgColor};
`;
const Text = styled.div``;

const ScheduleCard = () => {
    return (
        <Wrapper>
            <Top>

            </Top>
        </Wrapper>
    )
}

export default ScheduleCard;