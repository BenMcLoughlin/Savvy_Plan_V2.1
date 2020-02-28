import React, {useState, useEffect } from 'react'
import styled from "styled-components"


const DualRangeBar = ({bottom, top, setValue}) =>  {


    const handleChange = (e) => {
     const {name, value} = e.target


        if (bottom > (top - 2)) {
            setValue(name, +value)
            setValue("top", (bottom + 5))
          }
          if ((top - 2) < bottom ) {
            setValue(name, +value)
            setValue("bottom", (bottom - 5))
          }
          setValue(name, +value)
    }

 
    const totalWidth = 300 // width the runner bar
    const percentageMin = bottom / 77 //percentage of the runnerbar that is shifting left as the thumb moves
    const percentageMax =  top / 77  //total percentage of the top value
    //to account for the fact that the minimum value is 18 we have to make the rage 77 (95 - 18)

    //the div moves by its left position and the divs length is set accordingly
    const leftPosition = (percentageMin * totalWidth).toFixed() //where the overlay div is positioned to the left
    const fillBarWidth = ((percentageMax - percentageMin) * totalWidth + 1).toFixed() // how long the div will be 


        return (
            <div >
            {/* this is the runner bar*/}
                <InputWrapper 
                    totalWidth = {totalWidth}
                >
            {/* this controls the thumb of the bottom value*/}
                <InputLeft
                    name="bottom"
                    type="range"
                    onChange={(e) => handleChange(e)}
                    value={bottom}
                    min={18}
                    max={95}
                    step={1}
            />
            {/* this controls the thumb of the top value*/}
        
                <InputRight
                    name="top"
                    type="range"
                    onChange={(e) => handleChange(e)}
                    value={top}
                    min={18}
                    max={95}
                    step={1}
            />
            {/* this is the bar that sits on top and sets the color of the inner area*/}
            <Bar
                // style={{left: `${leftPosition - 2.5}rem`, width: `${fillBarWidth}rem`}}
                fillBarWidth = {fillBarWidth}
                percentageMin = {percentageMin}
                percentageMax = {percentageMax}
                leftPosition = {leftPosition}
            />
                </InputWrapper>
            {/* this is the display container that shows the two values to the user*/}
                <ValueBoxWrapper>

                        <ValueAsInput 
                            name="bottom"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            value={bottom}
                        />
                        <ValueAsInput 
                           name="top"
                           autoComplete="off"
                           onChange={(e) => handleChange(e)}
                           value={top}
                        />

                </ValueBoxWrapper>

                
            </div>
        )
}

export default DualRangeBar
//-----------------------------------------------style-----------------------------------------------//

const InputWrapper = styled.div`
    position: relative;
    height: 3px;
    width: ${props => props.totalWidth}px;
    margin: 11px;
    background-color: ${props => props.theme.color.slate};
    border-radius: 7px;
`
const Bar = styled.div`
    position: absolute;
    width: ${props => props.fillBarWidth - 3}px;
    left: ${props => props.leftPosition - 70}px;
    height: 3px;
    background: ${props => props.theme.color.sandy};
    /* z-index: 11; */
`
const InputLeft = styled.input`
    -webkit-appearance: none;
        width: 100%;
        background: transparent;
        position: relative;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &:focus {
    outline: none;
  }
  position: absolute;
    left: 0px;
    top: -7.5px;
    margin: 0px;
    border-style: none;
    
    z-index: 10;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
    appearance: none;
    width: 12px;
    margin-top: 3px;
    height: 12px;
    background: ${props => props.theme.color.slate};
    border-radius: 50%;
    cursor: pointer;
    
    transition-property: background-color;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
    &::-webkit-slider-thumb:hover, input[type="range"]::-webkit-slider-thumb:active {
    background-color: ${props => props.theme.color.sandy};
  }
    &::-webkit-slider-runnable-track {
    height: 7px;
    background-color: transparent;
  }
`
const InputRight = styled(InputLeft)`
        top: -20px;
        &::-webkit-slider-thumb {
    transform: translateY(12.5px);
  }
`

const ValueBoxWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    z-index: 300;
    width: 100%;
    padding: 1rem;
    z-index: 100;
    align-items: center;
    font-size: ${props =>props.theme.fontSize.smallMedium};
`
const sharedStyles = `
        border-radius: 1px;
        padding: .6rem;
        height: 2.6rem;
        font-size: 1.4rem;
        width: 3.5rem;
        text-align: center;
        color: white;
        border: none;
        background: ${props => props.theme.color.slate};
`

const ValueAsInput = styled.input`
        ${sharedStyles}
        background: ${props => props.theme.color.slate};
        font-size: ${props =>props.theme.fontSize.smallMedium};
        z-index: 33;
        outline: none;
        ::-webkit-inner-spin-button, 
        ::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        &:before {
            content: "";
            height: 1rem;
            width: 1rem;
            background: ${props => props.theme.color.slate};
            position: absolute;
            transform: rotate(45deg);
            left: 1.2rem;
            top: -.5rem;
        };
        &:focus {
           border-bottom: 3px solid ${props => props.theme.color.sandy};
           
        }
}
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 
//this component uses two sliders to create the illusion of one slider with two ranges. 
// I borrowed some of the logic to build it from this codepen https://codepen.io/koklahoma/pen/LkgWkw but had to make
//several adjustements to convert it to react. The main challenge is ensuring that if the selector thumbs touch the 
//bottom one can't be top the the larger value. Most of the logic is ensure that if one selector thumb hits the other then it 
// can push it along. 
// Also I needed to create an overlay div that presented the color area of the area that has been selected. This uses logic
//to change the style of the div from where it begins on the left to how long it is. 
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 
