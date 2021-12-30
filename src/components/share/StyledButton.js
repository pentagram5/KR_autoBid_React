import React from 'react';
import styled, {css} from "styled-components";

const Button = styled.button`
  font-size: ${({fontSize}) => fontSize ? fontSize : 18}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 600};
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  color: ${({fontColor}) => fontColor};
  border: ${({border}) => border ? border : "none"};
  height: ${({height}) => height}px;
  background-color: ${({bgColor}) => bgColor};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : 4}px;
  
  ${({margin}) => margin && css`
    margin: ${margin};
  `}
  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
`;

const StyledButton = ({
                          title,
                          width,
                          height,
                          bgColor,
                          fontSize,
                          fontWeight,
                          fontColor,
                          border,
                          borderRadius,
                          margin,
                          onClick,
                      }) => {
    return (
        <Button
            width={width}
            height={height}
            bgColor={bgColor}
            fontSize={fontSize}
            fontColor={fontColor}
            fontWeight={fontWeight}
            border={border}
            borderRadius={borderRadius}
            margin={margin}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

export default StyledButton;