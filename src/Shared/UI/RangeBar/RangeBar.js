import React from 'react'
import styled from "styled-components"
import FontAwesome from "react-fontawesome"
import { connect } from 'react-redux'
import {setAge, setRetirementAge} from "../../../actions"

//STYLES
import {RangeBarStyled, 
        RangebarContainerStyled, 
        RangeBarValueStyled, 
        RangeBarLabelStyled, 
        QuestionBoxStyled, 
        QuestionExplanationStyled} 
        from "./RangeBarStyles"

export const Age = styled.div`
font-size: 2rem;
color: blue;
`
function RangeBar(props) {
    return (
        <RangebarContainerStyled>
        <RangeBarStyled
            type="range"
            currency={props.currency}
            name={props.name}
            value={props.age}
            onChange={(event) => setAge(event.target.value)}
            step={props.step}
            min={props.min}
            max={props.max}/>
        <RangeBarValueStyled>
                {props.type === "percentage" ? `${(props.value * 100).toFixed(2)} %` :
                props.type === "currency" ? `$${Number(props.value).toLocaleString()}` :
                props.value}</RangeBarValueStyled>
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



const mapStateToProps = (state) => {
    return {
        age: state.age
    }
}
export default connect (mapStateToProps,
    {setAge, setRetirementAge}
    )(RangeBar)