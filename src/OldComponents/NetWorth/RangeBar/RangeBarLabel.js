import React, { Component } from 'react'
import styled from "styled-components"

 class RangeBarLabel extends Component {
    render() {
        return (
            <div>
             <LabelAsInput 
                id={this.props.rangeBarProps.id}
                autoComplete="off"
                onChange={this.props.handleChange}
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
        width: 70%;
        top: -.6rem;
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
