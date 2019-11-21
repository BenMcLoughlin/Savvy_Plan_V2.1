import React, { Component } from 'react'
import styled from "styled-components"
import {ChevronIcon} from "../Styles/Icons"

/*Props Required to be passed:
1. lowerValue and higherValue
2. a function called setDualRangeValues which will receive the fromAge and upper values and then set them accordingly

*/

class DualRangeRangeBar extends Component {

    state = {
        fromAge: this.props.fromAge,
        toAge: this.props.toAge, 
        skipForwardBy: 10, 
        lowerValueAsInput: false,
        higherValueAsInput: false,
    }

    handleSliderChange = (e) => {
    
        const value = e.target.value
        if  (this.state.fromAge >= this.state.toAge) {
            this.setState({
                toAge: +value + 5,
                fromAge: +this.state.toAge - 1,
            })
        }
        else {
            this.setState({
                [e.target.name]: +value
            })
        }
        if (e.target.name === "fromAge") {
            this.props.setKeyVariables("fromAge", +value)
        }
        else {
            this.props.setKeyVariables("toAge", +value)
        }
  
    }

    handleInputChange(e) {
            this.setState({
                [e.target.name]: +e.target.value
            })
            this.props.setKeyVariables(e.target.name, this.state.fromAge)
    }
    
    handleClickRight = () => {
        const fromAge = this.state.toAge < 95 ? this.state.toAge : 85
        const toAge = this.state.toAge + 10 < 95 ? this.state.toAge + this.state.skipForwardBy : 95
        this.setState({
            fromAge: fromAge,
            toAge: toAge
        })
        this.props.setKeyVariables("fromAge", this.state.fromAge)
        this.props.setKeyVariables("toAge", this.state.toAge)
    }

    toggleState = ()=> {
        const show = this.state.valueAsInput
        this.setState({
            valueAsInput: !show
        })
    }
    //When clicked the value will toggle between being an input or not. 
    
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                valueAsInput: false,
            })
        }
      }

      toggleLowerValueAsInputState = ()=> {
        const show = this.state.lowerValueAsInput
        this.setState({
            lowerValueAsInput: !show
        })
    }
    toggleHigherValueAsInputState = ()=> {
        const show = this.state.higherValueAsInput
        this.setState({
            higherValueAsInput: !show
        })
    }
    //When clicked the value will toggle between being an input or not. 
    
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                lowerValueAsInput: false,
                higherValueAsInput: false,
            })
        }
      }     
      
    render() {
 
        const totalWidth = 300 // width the runner bar
        const percentageMin = this.state.fromAge / 77 //percentage of the runnerbar that is shifting left as the thumb moves
        const percentageMax = this.state.toAge / 77 //total percentage of the toAge value

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
            {/* this controls the thumb of the fromAge value*/}
                <InputLeft
                    name="fromAge"
                    type="range"
                    onChange={(e) => this.handleSliderChange(e)}
                    value={this.state.fromAge}
                    min={18}
                    max={95}
                    step={1}
            />
            {/* this controls the thumb of the toAge value*/}
        
                <InputRight
                    name="toAge"
                    type="range"
                    onChange={(e) => this.handleSliderChange(e)}
                    value={this.state.toAge}
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
                {this.state.lowerValueAsInput ? 
                    <ValueAsInput 
                       type="number"
                       name="fromAge"
                       autoComplete="off"
                       onChange={(e) => this.handleInputChange(e)}
                       value={this.state.fromAge}
                       onKeyDown={(event) => this.handleKeyDown(event)}
                       onBlur={() => this.toggleLowerValueAsInputState()} 
                    />
                    
                    :
                    <Value onClick={() => this.toggleLowerValueAsInputState()}>{(this.state.fromAge).toLocaleString()}</Value>
                   }
                    <Button onClick={() => this.handleClickRight()}>
                        <ChevronIcon style={{color: "white"}}/>
                    </Button>
                    {this.state.higherValueAsInput ? 
                        <ValueAsInput 
                           type="number"
                           name="toAge"
                           autoComplete="off"
                           onChange={(e) => this.handleInputChange(e)}
                           value={this.state.toAge}
                           onKeyDown={(event) => this.handleKeyDown(event)}
                           onBlur={() => this.toggleHigherValueAsInputState()} 
                        />
                        
                        :
                        <Value onClick={() => this.toggleHigherValueAsInputState()}>{this.state.toAge}</Value>
                       }
                </ValueBoxWrapper>

                
            </div>
        )
    }
}



export default DualRangeRangeBar


//-----------------------------------------------STYLES-----------------------------------------------//

const InputWrapper = styled.div`
    position: relative;
    height: 3px;
    width: ${props => props.totalWidth}px;
    margin: 11px;
    background-color: ${props => props.theme.color.dullSteelBlue};
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &:focus {
    outline: none;
  }
  position: absolute;

    left: 0px;
    top: -8.5px;
    margin: 0px;
    border-style: none;
    
    z-index: 10;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
    appearance: none;
    width: 12px;
    margin-top: 3px;
    height: 12px;
    background: ${props => props.theme.color.dullSteelBlue};
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
const Button = styled.button`
        border-radius: 3px;
        padding: .6rem;
        height:3.2rem;
        font-size: 1.4rem;
        width: 3.5rem;
        text-align: center;
        background: ${props => props.theme.color.dullSteelBlue};
        color: white;
        cursor: pointer;
        outline: none;
        text-align: center;
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
        background: ${props => props.theme.color.background3};
`

const ValueAsInput = styled.input`
        ${sharedStyles}
        background: ${props => props.theme.color.dullSteelBlue};
        font-size: ${props =>props.theme.fontSize.small};
        z-index: 33;
        outline: none;
        ::-webkit-inner-spin-button, 
        ::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
}


`
export const Value = styled.div`
         ${sharedStyles}
        background: ${props => props.theme.color.background3};
        font-size: ${props =>props.theme.fontSize.small};
        cursor: pointer;
    
}
        &:before {
            content: "";
            height: 1rem;
            width: 1rem;
            background: ${props => props.theme.color.background3};
            position: absolute;
            transform: rotate(45deg);
            left: -.5rem;
            top: .8rem;
        };
        &:focus {
           border-bottom: 3px solid ${props => props.theme.color.sandy};
           
        }
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 
//this component uses two sliders to create the illusion of one slider with two ranges. 
// I borrowed some of the logic to build it from this codepen https://codepen.io/koklahoma/pen/LkgWkw but had to make
//several adjustements to convert it to react. The main challenge is ensuring that if the selector thumbs touch the 
//fromAge one can't be toAge the the larger value. Most of the logic is ensure that if one selector thumb hits the other then it 
// can push it along. 
// Also I needed to create an overlay div that presented the color area of the area that has been selected. This uses logic
//to change the styles of the div from where it begins on the left to how long it is. 