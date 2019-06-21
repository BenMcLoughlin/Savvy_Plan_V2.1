import React from 'react'
import FontAwesome from "react-fontawesome"


//STYLES
import {RangeBarStyled, 
        RangebarContainerStyled, 
        RangeBarValueStyled, 
        RangeBarLabelStyled, 
        QuestionBoxStyled, 
        QuestionExplanationStyled} 
        from "./RangeBarStyles"


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
            <FontAwesome style ={{color: "blue"}} name="question-circle"/>
            <QuestionExplanationStyled>
            <div className="question__explanation--title">{`${props.label} Explained`}</div>
            <div className="question__explanation--text">{props.explanation}</div>
            </QuestionExplanationStyled>
        </QuestionBoxStyled>
    </RangebarContainerStyled>
    )
}


export default RangeBar