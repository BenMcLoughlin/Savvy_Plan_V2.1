import React, { Component } from 'react'
import styled from "styled-components"



class RangeBarInput extends Component {


    render() {
        return (
            <Input
                type="range"
                onChange={this.props.handleChange}
                value={this.props.rangeBarProps.rangeBarValue}
                max={100}
                step={0.1}
                id={this.props.rangeBarProps.id}
                percentage={`${(this.props.rangeBarProps.rangeBarValue/100)*100}%`}
                category={this.props.rangeBarProps.category}
                autoComplete="off"
            />
        )
    }
}
//renders the slide bar. Percentage is calcuated here and pass to styled components to have the slide bar be 
//two different colors as it moves. 

export default RangeBarInput

//-----------------------------------------------STYLES-----------------------------------------------//




const Input = styled.input`

    width: 200px;
    height: 3px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, 
        ${props => props.category === "assets" ? props.theme.color.sandy : props.theme.color.salmon} ${props => props.percentage}, 
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
            top: 3rem;
            left: 100%;
            height:.3rem;
            width: 9rem;
            background: transparent;
            position: absolute;
            z-index: 3;
    }
    &:active   {
        &:after{
            background: ${props => props.category === "assets" ? props.theme.color.sandy : props.theme.color.salmon};
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
    background: ${props => props.category === "assets" ? props.theme.color.sandy : props.theme.color.salmon};
}

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The actual slider bar. 