import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import {setItemValue, changeLabel, setRangeBarValue, removeItem} from "../../Dashboard/NetWorth/actions/netWorthActions"
import {logslider, inverseLogslider, roundNumber} from "../../services/logorithmicFunctions"
import {CloseIcon} from "../../Styles/Icons"
import RangeBarLabel from "../Components/RangeBar/RangeBarLabel"
import RangeBarValue from "../Components/RangeBar/RangeBarValue"
import RangeBarInput from "../Components/RangeBar/RangeBarInput"

class RangeBar extends Component {

    setFinancialValueFromRange = (event, category, section) => {
        const logValue = roundNumber(logslider(event.target.value))
        this.props.setVariable(event, category, section, logValue)
      }

      //objective: exponentially increase the slider bar as it moves to the right, given a slider value between 1 and 100 
      // this returns a value between 1 and 1 million at an exponential scale.

      convertToRangeFromGivenFinancialValue = (event, category, section) => {
         const rangeBarValue = inverseLogslider(event.target.value)
        this.props.setRangeBarValue(event, category, section, rangeBarValue)
      }
        //objective: given a large value from the text input, convert it back to a smaller scale. Given a value between 1 and 1 million 
      // this returns a value between 1 and 100.

    render() {
        console.log(this.props.netWorthState);

        return (
            < RangeBarWrapper>
                <RangeBarLabel
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.props.changeLabel(event, this.props.rangeBarProps.category, this.props.rangeBarProps.section)}
                />
                <RangeBarInput
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => {
                         this.setFinancialValueFromRange(event, this.props.rangeBarProps.category, this.props.rangeBarProps.section) 
                            }
                     }
                />
                <RangeBarValue
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.convertToRangeFromGivenFinancialValue(event, this.props.rangeBarProps.category, this.props.rangeBarProps.section )}
                />
                <Delete onClick={() => this.props.removeItem(this.props.rangeBarProps.id, this.props.rangeBarProps.category, this.props.rangeBarProps.section )}/>
            </RangeBarWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        netWorthTotals: state.netWorthTotals,
        netWorthState: state.netWorthState
    }
}

export default connect(mapStateToProps, {setVariable, changeLabel, setRangeBarValue, removeItem})(RangeBar)

//-----------------------------------------------STYLES-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    position: relative;
    padding-left: 1rem;
    width: 25rem;
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: .5rem;
    right: -11.2rem;
    cursor: pointer;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 