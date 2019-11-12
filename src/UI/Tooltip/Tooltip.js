import React from "react"
import styled from "styled-components"

const Tooltip = ({header, x, y, text, className}) => {

    return (
    <TooltipWrapper style={{top: y, left: x}} className={className}>
            <TooltipHeader>{header}</TooltipHeader>
            <TooltipText>
                       {text}
            </TooltipText>
    </TooltipWrapper>
    )
}

export default Tooltip
//-----------------------------------------------STYLES-----------------------------------------------//

const TooltipWrapper = styled.div`
    background: #F7F7F5;
    position: absolute;
    height: 18rem;
    width: 24rem;
    border-radius: 5px;
    color:#556976;
    z-index: 20;
    border: 1px solid #556976;
    text-align: left;
    opacity: 0;
    visibility: hidden;
    font-size: ${props => props.theme.fontSize.small};
`
const TooltipHeader = styled.div`
    width: 100%;
    height: 18%;
    background: #556976;
    display: flex;
    justify-content: space-between;
    color: #F7F7F5;
    font-size: 1.2rem;
    padding: .6rem;
    font-weight: bold;

    &::before {
    content: "";
    height: 15px;
    width: 15px;
    background: #556976;
    position: absolute;
    top: 16px;
    left: -7px;
    transform: rotate(45deg);
    z-index: 1;

}
`
const TooltipText = styled.div`
    padding: 1rem;
`
