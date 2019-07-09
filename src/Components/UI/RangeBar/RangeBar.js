import React from 'react'
import FontAwesome from "react-fontawesome"
import styled, {css} from "styled-components"
import {setFlex} from "../../../Shared/Styles"

function RangeBar(props) {
    return (
        <RangebarContainerStyled>
        <RangeBarStyled
            type="range"
            classType={props.classType}
            currency={props.currency}
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            step={props.step}
            min={props.min}
            max={props.max}/>
        <RangeBarValueStyled>{props.value}</RangeBarValueStyled>
        <div className="rangebar__arrow"></div>
        <RangeBarLabelStyled> {props.label} </RangeBarLabelStyled>
        <QuestionBoxStyled>
            <FontAwesome name="question-circle"/>
            <QuestionExplanationStyled>
            <div className="question__explanation--title">{`${props.label} Explained`}</div>
            <div className="question__explanation--text">{props.explanation}</div>
            </QuestionExplanationStyled>
        </QuestionBoxStyled>
    </RangebarContainerStyled>
    )
}


export default RangeBar

export const RangebarContainerStyled = styled.div `
    ${setFlex({align: "center", justify: "space-around"})}
    margin-top: 2rem;
    position: relative;
    padding-left: 1rem;
    width: 35rem;
` 


export const RangeBarStyled = styled.input`

    height: 2.8rem;
    -webkit-appearance: none;
    outline: none;
    background-color: transparent;
    transition: all .3s;
    -webkit-appearance: none;
    width: 18rem;
    &:active + &__value {
        box-sizing: border-box;
        border-bottom: 4px solid ${props => props.theme.color.highlight1}};
        z-index: 1;
    }


&::-webkit-slider-runnable-track{

    background-color: ${props => props.theme.color.highlight2};
    height: 3px; //track width
    border-radius: 4px;
    z-index: 2;
}

&:active::-webkit-slider-runnable-track {
    background-color: ${props => props.theme.color.highlight1};
    z-index: 2;
}

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: ${props => props.theme.color.highlight2};
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin-top: -1rem; //thumbheight
    cursor: pointer;
    border: 2px solid #fff;
    transition: .3s;
    z-index: 2;
}
&:active::-webkit-slider-thumb  {
    background-color: ${props => props.theme.color.highlight1};
    z-index: 2;;
}

`

export const RangeBarValueStyled = styled.div`
        position: absolute;
        top: -2rem;
        left: 21rem;
        border-radius: 1px;
        background-color: ${props => props.theme.color.background2};
        padding: .8rem;
        height: 3rem;
        font-size: ${props => props.theme.fontSize.small};
        width: 6rem;
        align-content: center;
        text-align: center;
        right: 4rem;
        z-index: 1;

`

export const RangeBarLabelStyled = styled.label`
        color: grey;
        font-size: ${props => props.theme.fontSize.small};
        position: absolute;
        top: -1.2rem;
        left: 3rem;
`

export const QuestionBoxStyled = styled.div`
        position: absolute;
        top: -.5rem;
        right: 4rem;
        height: 2rem;
        width: 2rem;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: ${props => props.theme.fontSize.small};
`

export const QuestionExplanationStyled = styled.div`
        display: none;
        height: 15rem;
        width: 32rem;
        border-radius: 4px;
        position: absolute;
        font-size: ${props => props.theme.fontSize.small};
        z-index: 1000;
        padding: 2rem;
        text-align: left;
        top: 4rem;
        right: -2.8rem;
        line-height: 1.9rem;



        &:after {
            content: "";
            position: absolute;
            width: 2rem;
            height: 2rem;
            right: 3rem;
            top: -1rem;
            transform: rotate(45deg);
            z-index: -1;
        }
`