import React, { Component } from 'react'
import styled from "styled-components"
import {logslider, inverseLogslider, roundNumber} from "../../services/logorithmicFunctions"

 class RangeBarLabel extends Component {

    state = {
        logValue: 0,
        rangeBarValue: 0
    }

    setLocalRangeandLogValue = (e) => {
        const logValue = inverseLogslider(e.target.value)
        this.setState({
            logValue: roundNumber(logValue), 
            rangeBarValue: e.target.value
        })
        this.props.handleChange(e.target.name, this.state.rangeBarValue, this.state.logValue )
    }
    render() {
        return (
            <div>
             <LabelAsInput 
                name={this.props.rangeBarProps.name}
                autoComplete="off"
                onChange={(e) => this.props.handleChangeLabel(e)}
                value={this.props.rangeBarProps.label}
                />         
            </div>
        )
    }
}

export default RangeBarLabel

//-----------------------------------------------STYLES-----------------------------------------------//

const LabelAsInput = styled.input`
        font-size: ${props =>props.theme.fontSize.small};
        color: ${props => props.theme.color.background3};
        position: absolute;
        width: 75%;
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
            border-bottom: 1px dotted grey;
            background: white;
           
        }

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The label or the item such as house or car which is also editable.  