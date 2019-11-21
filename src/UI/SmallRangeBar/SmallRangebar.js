import React, { Component } from 'react'
import styled from "styled-components"
import SmallRangeBarLabel from "./Components/SmallRangeBarLabel"
import SmallRangeBarValue from "./Components/SmallRangeBarValue"
import SmallRangeBarSlider from "./Components/SmallRangeBarSlider"


/*Props Required to be passed:
1. setIncome 
      a function that receives a name, rangebar value and the range bar props and
      uses those variables to pass into the action and set the reducer. 
2. rangeBarProps
     This is an object containing the item name, id, label, and rangebar value. The mini range Bar also required a min, max and step
     as well as a number types which will determine if it will display a percentage or a normal number. 
*/ 

export default class MiniRangeBar extends Component {

    render() {
        return (
            < RangeBarWrapper>
                <SmallRangeBarLabel
                     rangeBarProps={this.props.rangeBarProps}
                     handleChangeLabel={this.props.handleChangeLabel}
                />
                <SmallRangeBarSlider
                     rangeBarProps={this.props.rangeBarProps}
                     setValueInReducer={this.props.setValueInReducer}
                />
                <SmallRangeBarValue
                    rangeBarProps={this.props.rangeBarProps}
                    setValueInReducer={this.props.setValueInReducer}
                />
               
            </RangeBarWrapper>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    padding-left: 2rem;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 

