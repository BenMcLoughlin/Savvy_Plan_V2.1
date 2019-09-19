import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'
import {setVariable, changeLabel, setRangeBarValue, removeItem} from "../actions/netWorthActions"
import {logslider, inverseLogslider, roundNumber} from "../../../services/logorithmicFunctions"
import {CloseIcon} from "../../../Styles/Icons"
import RangeBarLabel from "../Components/RangeBar/RangeBarLabel"
import RangeBarValue from "../Components/RangeBar/RangeBarValue"
import RangeBarInput from "../Components/RangeBar/RangeBarInput"

class RangeBar extends Component {


    setFinancialValueFromRange = (event, catagory, section) => {
        const logValue = roundNumber(logslider(event.target.value))
        //Challenge: the value has to accelerate as the slider moves between 0 and 1 million. log slider function accelerates the value. 

        this.props.setVariable(event, catagory, section, logValue)
      }
      //objective: enable the user to set the value of an item such as house or car by using the range bar slider. 
      // it is passing the details gathered in the range bar to an action which sets the state in the reducer. 
      

      convertToRangeFromGivenFinancialValue = (event, catagory, section) => {
         const rangeBarValue = inverseLogslider(event.target.value)
        this.props.setRangeBarValue(event, catagory, section, rangeBarValue)
      }
       //objective: enable the user to set the value of an item by using the text input. 

    render() {
   

        return (
            < RangeBarWrapper>
                <RangeBarLabel
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.props.changeLabel(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section)}
                />
                {/*the label or item eg. "car", handleChange allows it to be editable */}

                <RangeBarInput
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => {
                         this.setFinancialValueFromRange(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section) 
                            }
                     }
                />
                {/*the range bar slider that changes the value */}

                <RangeBarValue
                     rangeBarProps={this.props.rangeBarProps}
                     handleChange={(event) => this.convertToRangeFromGivenFinancialValue(event, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section )}
                />
                {/*the value which is also editable when clicked on and becomes a text input */}

                <Delete onClick={() => this.props.removeItem(this.props.rangeBarProps.id, this.props.rangeBarProps.catagory, this.props.rangeBarProps.section )}/>
                
                {/*removes an item if it is deleted */}

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
// Holds all the data needed for someone to view an item such as a house or car and change its value. 
// label can be changed by clicking it and value can be changed 2 ways, by using the slider or by clicking the value. 
