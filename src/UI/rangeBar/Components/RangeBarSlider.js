import React, { useState} from 'react'
import styled from "styled-components"
import {logslider} from "services/general/logorithmic_functions"

const RangeBarSlider = ({setValue, rangeBarProps, color}) => {                                                                        //destructure essential props

                                                                           //log value is the larger value resulting from a logorithmic function, enabling the bar to range between 1 and 1 million
    const [rangeBarValue, setRangeBarValue] = useState(0)                                                                      //rangeBar value is the actual value of the rangebar, from 1 - 100

    const setLocalRangeandLogValue = (e) => {
        const logValue = Math.round(logslider(e.target.value)/100)*100

        setRangeBarValue(e.target.value)
        setValue(logValue, rangeBarValue, rangeBarProps)
    }  
    const sliderValue = rangeBarProps.rangeBarValue > 0 ? rangeBarProps.rangeBarValue : 0

        return (
            <Input
                type="range"
                name={rangeBarProps.name}
                onChange={(e) => setLocalRangeandLogValue(e)}
                value={rangeBarProps.rangeBarValue}
                max={100}
                step={0.1}
                percentage={`${(sliderValue/100)*100}%`}
                color={color}
            />
        )
    
}
//renders the slide bar. Percentage is calcuated here and pass to styled components to have the slide bar be 
//two different colors as it moves. 

export default RangeBarSlider

//-----------------------------------------------style-----------------------------------------------//




const Input = styled.input`

    width: 18rem;
    height: 3px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, 
        ${props => props.theme.color.sandy} ${props => props.percentage}, 
        ${props => props.theme.color.slate} ${props => props.percentage});
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
    background: ${props => props.theme.color.slate};
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