import React from 'react'
import styled from "styled-components"
import MiniRangeBarLabel from "UI/miniRangeBar/Components/MiniRangeBarLabel"
import MiniRangeBarValue from "UI/miniRangeBar/Components/MiniRangeBarValue"
import MiniRangeBarSlider from "UI/miniRangeBar/Components/MiniRangeBarSlider"


const MiniRangeBar = ({name, label, max, min, reducer, setKeyValue_action, step, value}) =>  {
console.log((value-min)/(max-min));
        return (
            < RangeBarWrapper>
                 <Label>{label}</Label>
                     <Slider 
                       type="range"
                       onChange={(e) => setKeyValue_action(name, reducer, +e.target.value)}
                       value={value}
                       min={min}
                       max={max}
                       step={step}
                       percentage={`${((value-min)/(max-min))*100}%`}
                     />
                     <ValueWrapper>
                        <Value
                        type="text"
                        value={value.toLocaleString()}
                        autoComplete="off"
                        onChange={(e) => null}
                        />   
                     </ValueWrapper>
            </RangeBarWrapper>
        )
}

export default MiniRangeBar
//-----------------------------------------------style-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    padding-left: 2rem;
    width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

`
const Slider = styled.input`
    width: 14rem;
    height: 3px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, 
        ${props => props.theme.color.salmon} ${props => props.percentage}, 
        ${props => props.theme.color.drab} ${props => props.percentage});
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    border-radius: 12px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    transition: all 1s ease;

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.color.drab};
    border-radius: 50%;
    cursor: pointer;
}

&:active::-webkit-slider-thumb
{
    background: ${props => props.theme.color.salmon};
}

`
const ValueWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 14rem;
`
const Value = styled.input`
    outline: none;
    position: relative;
    border-radius: 3px;
    padding: .4rem;
    height: 3rem;
    width: 7rem;
    align-content: center;
    text-align: center;
    color: white;
    border: none;
    background: ${props => props.theme.color.slate};
    font-size: ${props =>props.theme.fontSize.smallMedium};
    &:before {
    content: "";
    height: 1rem;
    width: 1rem;
    background: ${props => props.theme.color.slate};
    position: absolute;
    transform: rotate(45deg);
    left: 40%;
    top: -20%;
    };
    &:focus {
    border-bottom: 3px solid ${props => props.theme.color.sandy};
    
    }
`
const Label = styled.div`
        width: 14rem;
        font-size: ${props =>props.theme.fontSize.smallMedium};
        color: ${props => props.theme.color.slate};
        padding: 0.3rem;
        text-transform: capitalize;
        background: transparent;
        border: none;
        text-align: center;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 
