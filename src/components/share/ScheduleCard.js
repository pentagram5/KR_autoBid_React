import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import chipDelete from "../../assets/chipDelete.svg";
import blueUpArrow from "../../assets/blueUpArrow.svg";
import redDownArrow from "../../assets/redDownArrow.svg";

const Wrapper = styled.div`
  width: 220px;
  height: 116px;
  border-radius: 6px;
  border: 1px solid ${colors.lightBorderColor};
`;
const Top = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px 8px 20px;
  background-color: ${({bgColor}) => bgColor};
`;
const Text = styled.div`
  padding-top: 2px;
  font-weight: 500;
  color: ${({fontColor}) => fontColor ? fontColor : colors.darkBlack};
  ${({marginRight}) => marginRight && css`
    margin-right: ${marginRight}px;
  `}
`;
const DeleteButton = styled.div`
  width: 18px;
  height: 18px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;

  &:first-child {
    margin-top: 2px;
  }
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;

const ScheduleCard = ({bgColor, onDeleteChips}) => {
    return (
        <Wrapper>
            <Top bgColor={bgColor}>
                <Text>1위</Text>
                <DeleteButton onClick={onDeleteChips}>
                    <Image src={chipDelete}/>
                </DeleteButton>
            </Top>
            <Body>
                <Row>
                    <Box>
                        <Text marginRight={6}>최대</Text>
                        <Image src={blueUpArrow}/>
                    </Box>
                    <Box>
                        {2220} 원
                    </Box>
                </Row>

                <Row>
                    <Box>
                        <Text marginRight={6}>최소</Text>
                        <Image src={redDownArrow}/>
                    </Box>
                    <Box>
                        {2220} 원
                    </Box>
                </Row>
            </Body>
        </Wrapper>
    )
}

export default ScheduleCard;