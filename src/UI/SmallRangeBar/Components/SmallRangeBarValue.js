import React, { Component } from 'react'
import styled from "styled-components"
import {inverseLogslider} from "../../../services/logorithmicFunctions"

 class SmallRangeBarValue extends Component {
    state = {
        valueAsInput: false,
    }

    setLocalRangeAndLogValue = (e) => {
        
        const inverseLogValue = inverseLogslider(e.target.value).toFixed()

        this.props.setIncome(e.target.name, e.target.value, inverseLogValue, this.props.rangeBarProps)
    }
    //state decides whether the label should be shown as an input or just a regular number. 

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

      //If the user presses enter the new value will be submitted and it will turn from input back to regular number. 

    render() {
     
        return (
            <Wrapper>

             <Value onClick={this.toggleState}
             >{
                 this.props.rangeBarProps.numberType === "percentage" ?
                 `${(this.props.rangeBarProps.rangeBarValue*100).toFixed(1)} %` :
                 this.props.rangeBarProps.rangeBarValue
                }</Value>
            
            </Wrapper>
           
        )
    }
}


export default SmallRangeBarValue

//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    display: felx;
    justify-content: center;
`

const sharedStyles = `
    position: relative;
    border-radius: 3px;
    padding: .4rem;
    height: 2.6rem;
    width: 6rem;
    align-content: center;
    text-align: center;
    color: white;
    border: none;
`
 const Value = styled.div`
         ${sharedStyles}
        background: ${props => props.theme.color.background3};
        font-size: ${props =>props.theme.fontSize.small};
        &:before {
            content: "";
            height: 1rem;
            width: 1rem;
            background: ${props => props.theme.color.background3};
            position: absolute;
            transform: rotate(45deg);
            left: 40%;
            top: -20%;
        };
        &:focus {
           border-bottom: 3px solid ${props => props.theme.color.sandy};
           
        }
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//THe value is displayed as either a regular number or an input when clicked which will change the number. 