import React from 'react';
import styled, { css } from "styled-components";

const Button = styled.button`
  border-radius: 5px;
  font-size: ${({fontSize}) => fontSize ? fontSize : 18}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 600};
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  color: ${({fontColor}) => fontColor};
  border: ${({border}) => border ? border : "none"};
  height: ${({height}) => height}px;
  background-color: ${({bgColor}) => bgColor};
  
  ${({ margin }) => margin && css`
    margin: ${margin};
  `}
`;

const StyledButton = ({
                          title,
                          width,
                          height,
                          bgColor,
                          fontSize,
                          fontColor,
                          border,
                          margin,
                          onClick
                      }) => {
    return (
        <Button
            width={width}
            height={height}
            bgColor={bgColor}
            fontSize={fontSize}
            fontColor={fontColor}
            border={border}
            margin={margin}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

export default StyledButton;