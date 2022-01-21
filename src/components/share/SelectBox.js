import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import selectArrow from "../../assets/selectArrow.svg";
import {useRef} from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
`;
const CustomSelect = styled.div`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  color: ${({fontColor}) => fontColor};
  background-color: ${({bgColor}) => bgColor};
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({border}) => border};
  border-radius: ${({borderRadius}) => borderRadius}px;
  cursor: pointer;

  &:focus {
    border: 1px solid ${colors.skyBlue};
  }
`;
const Text = styled.div`
  width: 80%;
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight};
  color: ${colors.ultraLightSkyBlue};
  text-align: center;
`;
const OptionBox = styled.div`
  width: ${({width}) => width}px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding: 12px 12px;
  position: absolute;
  right: 0;
  overflow-y: scroll;
  background-color: ${colors.white};
  border: 4px solid ${colors.ultraLightSkyBlue};
  //border: 10px solid red;
  border-radius: ${({borderRadius}) => borderRadius}px;

  ${({boxHeight}) => (boxHeight !== 0) && css`
    height: ${boxHeight}px
  `}
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OptionText = styled.div`
  padding: 20px 28px;
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight};
  color: ${colors.ultraLightSkyBlue};
  cursor: pointer;

  &:hover {
    color: ${colors.darkBlack};
  }
`;
const Image = styled.img``;

function SelectBox({
                       width,
                       height,
                       border,
                       borderRadius,
                       fontSize,
                       fontColor,
                       bgColor,
                       fontWeight,
                       options = [],
                       onChange = () => null,
                       value = "",
                   }) {

    console.info(border);

    const boxRef = useRef();
    const [optionVisible, setOptionVisible] = useState(false);
    const boxHeight = options.length * 50;
    const clickOption = (props) => {
        onChange(props);
        setOptionVisible(false);
    };

    const handleClickOutside = ({target}) => {
        if (
            optionVisible &&
            boxRef &&
            boxRef.current &&
            boxRef.current.target !== target
        ) {
            setOptionVisible(false);
            onChange(value);
        } else if (boxRef && boxRef.current && boxRef.current.target == null) {
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    });

    return (
        <Wrapper>
            <CustomSelect
                width={width}
                height={height}
                border={border}
                fontColor={fontColor}
                borderRadius={borderRadius}
                bgColor={bgColor}
                onClick={() => setOptionVisible(!optionVisible)}
            >
                <Text fontSize={fontSize} fontWeight={fontWeight}>{value}</Text>
                <Image src={selectArrow}/>
            </CustomSelect>
            {optionVisible && options.length !== 0 && (
                <OptionBox
                    width={width}
                    boxHeight={boxHeight}
                    border={border}
                    borderRadius={borderRadius}
                    ref={boxRef}
                >
                    {options.map(list => (
                        <OptionText
                            key={list.CUSTOMER_ID}
                            onClick={() => clickOption(list.CUSTOMER_ID)}
                            fontSize={fontSize}
                            fontWeight={fontWeight}
                        >
                            {list.show_login}
                        </OptionText>
                    ))}
                </OptionBox>
            )}
        </Wrapper>
    );
}

export default React.memo(SelectBox);