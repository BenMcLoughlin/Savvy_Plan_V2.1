import React, { Component } from 'react'
import styled from "styled-components"
import {ChevronIcon} from "../Styles/Icons"

/*Props Required to be passed:
1. lowerValue and higherValue
2. a function called setParentDualRangeValues which will receive the lower and upper values and then set them accordingly

*/

class DualRangeRangeBar extends Component {

    state = {
        lower: this.props.lower,
        higher: this.props.higher, 
        lowerValueAsInput: false,
        higherValueAsInput: false,
    }


    handleChangeLower = (e) => {

       const value = e.target.value
       
          if  (this.state.lower >= this.state.higher) {
              this.setState({
                  higher: Number(value) + 5,
                  lower: Number(this.state.higher) - 1,
              })
          }
          else {
              this.setState({
                  lower: Number(value)  
              })
          }
          this.props.setParentDualRangeValues(value, this.state.higher)
    }

    handleChangeHigher = (e) => {
       const value = e.target.value

              this.setState({
                  higher: Number(value)
              })
        //   }
          this.props.setParentDualRangeValues(this.state.lower, value)
    }

    handleClickRight = () => {
        const lower = this.state.higher < 95 ? this.state.higher : 85
        const higher = this.state.higher + 10 < 95 ? this.state.higher + 10 : 95
        this.setState({
            lower: lower,
            higher: higher
        })
        this.props.setParentDualRangeValues(this.state.higher, higher)
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
        const totalWidth = 30 // width the runner bar
        const percentageMin = this.state.lower / 77 //percentage of the runnerbar that is shifting left as the thumb moves
        const percentageMax = this.state.higher / 77 //total percentage of the higher value

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
            {/* this controls the thumb of the lower value*/}
                <InputLeft
                    name="lower"
                    type="range"
                    onChange={(e) => this.handleChangeLower(e)}
                    value={this.state.lower}
                    min={18}
                    max={95}
                    step={1}
            />
            {/* this controls the thumb of the higher value*/}
        
                <InputRight
                    name="higher"
                    type="range"
                    onChange={(e) => this.handleChangeHigher(e)}
                    value={this.state.higher}
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
                       type="text"
                       autoComplete="off"
                       onChange={(e) => this.handleChangeLower(e)}
                       value={this.state.lower}
                       onKeyDown={(event) => this.handleKeyDown(event)}
                       onBlur={() => this.toggleLowerValueAsInputState()} 
                    />
                    
                    :
                    <Value onClick={() => this.toggleLowerValueAsInputState()}>{(this.state.lower).toLocaleString()}</Value>
                   }
                    <Button onClick={() => this.handleClickRight()}>
                        <ChevronIcon style={{color: "white"}}/>
                    </Button>
                    {this.state.higherValueAsInput ? 
                        <ValueAsInput 
                           type="text"
                           autoComplete="off"
                           onChange={(e) => this.handleChangeHigher(e)}
                           value={this.state.higher}
                           onKeyDown={(event) => this.handleKeyDown(event)}
                           onBlur={() => this.toggleHigherValueAsInputState()} 
                        />
                        
                        :
                        <Value onClick={() => this.toggleHigherValueAsInputState()}>{this.state.higher}</Value>
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
    width: ${props => props.totalWidth}rem;
    margin: 11px;
    background-color: ${props => props.theme.color.dullSteelBlue};
    border-radius: 7px;
`
const Bar = styled.div`
    position: absolute;
    width: ${props => props.fillBarWidth - 1.8}rem;
    left: ${props => props.leftPosition - 6.5}rem;
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
    height: 22px;
    left: 0px;
    top: -8.5px;
    margin: 0px;
    
    border-style: none;
    
    z-index: 10;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
    appearance: none;
    width: 12px;
    margin-top: -4px;
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
        top: 20px;
        &::-webkit-slider-thumb {
    transform: translateY(-28.5px);
  }

`

const ValueBoxWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    z-index: 300;
    width: 100%;
    padding: 1rem;
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
        z-index: 23;
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
//lower one can't be higher the the larger value. Most of the logic is ensure that if one selector thumb hits the other then it 
// can push it along. 
// Also I needed to create an overlay div that presented the color area of the area that has been selected. This uses logic
//to change the styles of the div from where it begins on the left to how long it is. 