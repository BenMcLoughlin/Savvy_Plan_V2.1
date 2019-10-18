import React, { Component } from 'react'
import styled from "styled-components"
import {logslider, roundNumber} from "../../services/logorithmicFunctions"


class RangeBarSlider extends Component {

    state = {
        logValue: 0,
        rangeBarValue: 0
    }

    setLocalRangeandLogValue = (e) => {
        const logValue = logslider(e.target.value)
        this.setState({
            logValue: roundNumber(logValue), 
            rangeBarValue: Number(e.target.value)
        })
        this.props.handleSetParentRangeBarAndFinancialValue(e.target.name, this.state.logValue, this.state.rangeBarValue, this.props.rangeBarProps)
    }

    render() {

        return (
            <Input
                type="range"
                name={this.props.rangeBarProps.name}
                onChange={(e) => this.setLocalRangeandLogValue(e)}
                value={this.props.rangeBarProps.rangeBarValue}
                max={100}
                step={1}
                percentage={`${(this.props.rangeBarProps.rangeBarValue/100)*100}%`}
            />
        )
    }
}
//renders the slide bar. Percentage is calcuated here and pass to styled components to have the slide bar be 
//two different colors as it moves. 

export default RangeBarSlider

//-----------------------------------------------STYLES-----------------------------------------------//




const Input = styled.input`

    width: 18rem;
    height: 3px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, 
        ${props => props.theme.color.sandy} ${props => props.percentage}, 
        ${props => props.theme.color.dullSteelBlue} ${props => props.percentage});
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    border-radius: 12px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    transition: all 1s ease;
    &:after {
        content: "";
            top: 3.3rem;
            left: 95%;
            height:.3rem;
            width: 8rem;
            background: transparent;
            position: absolute;
            z-index: 3;
    }
    &:active   {
        &:after{
            background: ${props => props.theme.color.sandy};
        }
 
        }

    

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.color.dullSteelBlue};
    border-radius: 50%;
    cursor: pointer;
}

&:active::-webkit-slider-thumb
{
    background: ${props => props.theme.color.sandy};
}

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The actual slider bar. 