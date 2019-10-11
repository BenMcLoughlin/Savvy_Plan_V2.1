import React, { Component } from 'react'
import styled from "styled-components"
import {logslider, inverseLogslider, roundNumber} from "../../services/logorithmicFunctions"
import {CloseIcon} from "../../Styles/Icons"
import RangeBarLabel from "./RangeBarLabel"
import RangeBarValue from "./RangeBarValue"
import RangeBarSlider from "./RangeBarSlider"

/*Props Required to be passed:
1. handleSetParentRangeBarAndFinancialValue 
      a function that receives a name, a logValue and a rangebar value and
      uses those variables to pass into the action and set the reducer. 
*/ 

export default class RangeBar extends Component {

    render() {
   
        return (
            < RangeBarWrapper>
                <RangeBarLabel
                     rangeBarProps={this.props.rangeBarProps}
                     handleChangeLabel={this.props.handleChangeLabel}
                />
                <RangeBarSlider
                     rangeBarProps={this.props.rangeBarProps}
                     handleSetParentRangeBarAndFinancialValue={this.props.handleSetParentRangeBarAndFinancialValue}
                />
                <RangeBarValue
                     rangeBarProps={this.props.rangeBarProps}
                     handleSetParentRangeBarAndFinancialValue={this.props.handleSetParentRangeBarAndFinancialValue}
                />
                <Delete  onClick={() => this.props.handleRemoveItem(this.props.rangeBarProps.name)}/>
            </RangeBarWrapper>
        )
    }
}



//-----------------------------------------------STYLES-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 3rem;
    position: relative;
    padding-left: 2rem;
    width: 23rem;
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: .7rem;
    left: 130%;
    cursor: pointer;
    z-index: 300;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 