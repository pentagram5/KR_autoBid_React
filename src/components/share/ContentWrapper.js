import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";

const View = styled.div`
  width: calc(100vw - 300px);
  height: 100vh;
  padding: 30px 50px;
`;
const Title = styled.div`
  height: 52px;
  color: ${colors.lightBlack};
  line-height: 1.5;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const ContentWrapper = ({ title, children }) => {
    return (
        <View>
            <Title>{title}</Title>
            {children}
        </View>
    )
}

export default ContentWrapper;