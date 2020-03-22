import React from 'react'
import styled from "styled-components"
import {logslider, inverseLogslider} from "services/general/logorithmic_functions"

 const RangeBar = ({instance, label, reducer, setNestedKeyValue_action, second_reducer}) => {

        return (
            < RangeBarWrapper>
                     <Label>{label}</Label>
                     <Slider 
                       type="range"
                       onChange={(e) =>  {
                           if (second_reducer) {setNestedKeyValue_action("value",  instance.id, second_reducer, logslider(e.target.value))}     //sometimes we want the rangebar to be changing two values in two different reducers, eg withdrawals also changes income
                            setNestedKeyValue_action("value",  instance.id, reducer, logslider(e.target.value))
                        }}
                       value={inverseLogslider(instance.value)}
                       max={100}
                       step={0.1}
                       percentage={`${(inverseLogslider(instance.value > 0 ? instance.value : 10000)/100)*100}%`}
                     />
                     <Value
                       type="text"
                       autoComplete="off"
                       onChange={(e) => {
                        const value = e.target.value.replace(",","" )                                                                       //showing the number with commas, eg. 1,234 requires it to be a string but messes it up when its sent as a string
                        setNestedKeyValue_action("value",  instance.id, reducer, +value)}}                                                  //sends value converted to a number
                       value={instance.value.toLocaleString()}
                     />                
            </RangeBarWrapper>
        )
}

export default RangeBar

//-----------------------------------------------style-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    position: relative;
    width: 23rem;

`


const Label = styled.div`
font-size: ${props =>props.theme.fontSize.smallMedium};
color: ${props => props.theme.color.slate};
position: absolute;
width: 30rem;
top: -1.5rem;
left: 1rem;
padding: 0.3rem;
text-transform: capitalize;
background: transparent;
border: none;
cursor: pointer;
&:focus,
&:active {
outline: 0  !important;
border: none;
border-bottom: 1px dotted lightGrey;
background: white;

}

`
const Slider = styled.input`

    width: 20rem;
    height: 4px;
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

const Value = styled.input`
        position: absolute;
        left: 95%;
        top: .8rem;
        border-radius: 3px;
        padding: .4rem;
        height: 3rem;
        width: 9rem;
        align-content: center;
        text-align: center;
        color: white;
        border: none;
        background: ${props => props.theme.color.slate};
        font-size: ${props =>props.theme.fontSize.smallMedium};
        z-index: 23;
        outline: none;
        ::-webkit-inner-spin-button, 
        ::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
}
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 