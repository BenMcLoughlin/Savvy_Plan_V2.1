import React, { Component } from 'react'
import styled from "styled-components"
import {inverseLogslider} from "../../../services/logorithmicFunctions"

 class RangeBarValue extends Component {
    state = {
        valueAsInput: false,                                                                                                        //state decides whether the label should be shown as an input or just a regular number. 
    }

    setLocalRangeAndLogValue = (e) => {
        
        const inverseLogValue = inverseLogslider(+e.target.value).toFixed()                                                         //The user is inputting a financial value like 22000, which has to be converted to a rangebar value between 1 and 100
        this.props.setValue(+e.target.value, inverseLogValue, this.props.rangeBarProps) 
    }

    toggleState = ()=> {
        const show = this.state.valueAsInput                                                                                        //When clicked the value will toggle between being an input or not. 
        this.setState({
            valueAsInput: !show
        })
    }
    
    handleKeyDown = (event) => {                                                                                
        if (event.key === 'Enter') {
            this.setState({
                valueAsInput: false,
            })
        }
      }

    render() {
        
        return (
            <div>
            {this.state.valueAsInput ? 
             <ValueAsInput 
                type="text"
                name={this.props.rangeBarProps.name}
                data-a-dec=","
                autoComplete="off"
                onChange={(e) => this.setLocalRangeAndLogValue(e)}
                value={this.props.rangeBarProps.financialValue}
                onKeyDown={(event) => this.handleKeyDown(event)}
                onBlur={this.toggleState} 
             />
             
             :
             <Value onClick={this.toggleState}>${(this.props.rangeBarProps.financialValue).toLocaleString()}</Value>
            }
            {/*onBlur is used so that if the user clicks anywhere else on the page it will submit the function */}
            </div>
        )
    }
}



export default RangeBarValue

//-----------------------------------------------STYLES-----------------------------------------------//

const sharedStyles = `
    position: absolute;
    left: 95%;
    top: .8rem;
    border-radius: 3px;
    padding: .4rem;
    height: 2.6rem;
    width: 8rem;
    align-content: center;
    text-align: center;
    color: white;
    border: none;
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
//THe value is displayed as either a regular number or an input when clicked which will change the number. 