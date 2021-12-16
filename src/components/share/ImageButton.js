import React from 'react';
import styled, {css} from "styled-components";

const Button = styled.button`
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  color: ${({fontColor}) => fontColor};
  border: ${({border}) => border ? border : 'none'};
  height: ${({height}) => height}px;
  background-color: ${({bgColor}) => bgColor};
  padding: ${({ padding }) => padding ? padding : '0 9px'};
  display: flex;
  align-items: center;
  margin-right: 5px;
  
  ${({ margin }) => margin && css`
    margin: ${margin};
  `}
`;
const ImageBox = styled.div`
  width: ${({ imgWidth }) => imgWidth}px;
  height: ${({ imgHeight }) => imgHeight}px;
  margin-right: 6px;
`;
const Image = styled.img``;

const ImageButton = ({
                         title,
                         width,
                         height,
                         padding,
                         bgColor,
                         fontColor,
                         border,
                         margin,
                         onClick,
                         imgSrc
                     }) => {
    return (
        <Button
            width={width}
            height={height}
            bgColor={bgColor}
            fontColor={fontColor}
            padding={padding}
            border={border}
            margin={margin}
            onClick={onClick}
        >
            <ImageBox>
                <Image src={imgSrc} />
            </ImageBox>
            {title}
        </Button>
    )
}

export default ImageButton;