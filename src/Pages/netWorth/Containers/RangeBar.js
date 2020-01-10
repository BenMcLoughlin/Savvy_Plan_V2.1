import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import {setVariable, changeLabel, setRangeBarValue, removeItem} from "../actions/NetWorthActions"
import {logslider, inverseLogslider, roundNumber} from "../services/logorithmicFunctions"
import {CloseIcon} from "../Styles/icons"
import RangeBarLabel from "../NetWorthContainers/RangeBar/RangeBarLabel"
import RangeBarValue from "../NetWorthContainers/RangeBar/RangeBarValue"
import RangeBarInput from "../NetWorthContainers/RangeBar/RangeBarInput"

class RangeBar extends Component {

    setFinancialValueFromRange = (event, catagory, section) => {
        const logValue = roundNumber(logslider(event.target.value))
        this.props.setVariable(event, catagory, section, logValue)
      }

      convertToRangeFromGivenFinancialValue = (event, catagory, section) => {
         const rangeBarValue = inverseLogslider(event.target.value)
        this.props.setRangeBarValue(event, catagory, section, rangeBarValue)
      }

    render() {
        console.log(this.props.netWorthState);

        return (
            < RangeBarWrapper>
                <RangeBarLabel
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.props.changeLabel(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section)}
                />
                <RangeBarInput
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => {
                         this.setFinancialValueFromRange(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section) 
                            }
                     }
                />
                <RangeBarValue
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.convertToRangeFromGivenFinancialValue(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section )}
                />
                <Delete onClick={() => this.props.removeItem(this.props.rangeBarProps.id, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section )}/>
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