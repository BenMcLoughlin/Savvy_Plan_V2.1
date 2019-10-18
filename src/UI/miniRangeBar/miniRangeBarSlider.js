import React, { Component } from 'react'
import styled from "styled-components"



class MiniRangeBarSlider extends Component {



    render() {
      
        return (
            <Wrapper>
            <Input
                type="range"
                name={this.props.rangeBarProps.name}
                onChange={(e) => this.props.handleSetParentRangeBarAndFinancialValue(e.target.name, null, Number(e.target.value))}
                value={this.props.rangeBarProps.rangeBarValue}
                max={this.props.rangeBarProps.max}
                min={this.props.rangeBarProps.min}
                step={this.props.rangeBarProps.step}
                percentage={`${((this.props.rangeBarProps.rangeBarValue-this.props.rangeBarProps.min)/(this.props.rangeBarProps.max-this.props.rangeBarProps.min))*100}%`}
            />
            </Wrapper>
        )
    }
}
//renders the slide bar. Percentage is calcuated here and pass to styled components to have the slide bar be 
//two different colors as it moves. 


export default MiniRangeBarSlider

//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper = styled.div`
   text-align: center;
`

const Input = styled.input`

    width: 12rem;
    height: 3px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, 
        ${props => props.theme.color.salmon} ${props => props.percentage}, 
        ${props => props.theme.color.contrastBackground3} ${props => props.percentage});
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    border-radius: 12px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    transition: all 1s ease;

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.color.contrastBackground3};
    border-radius: 50%;
    cursor: pointer;
}

&:active::-webkit-slider-thumb
{
    background: ${props => props.theme.color.salmon};
}

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The actual slider bar. 