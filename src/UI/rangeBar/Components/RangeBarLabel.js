import React from 'react'
import styled from "styled-components"

const RangeBarLabel = ({rangeBarProps}) => {
        return (
             <LabelAsInput>
            {rangeBarProps.label}  
            </LabelAsInput>      
        )
}

export default RangeBarLabel

//-----------------------------------------------style-----------------------------------------------//

const LabelAsInput = styled.div`
        font-size: ${props =>props.theme.fontSize.smallMedium};
        color: ${props => props.theme.color.slate};
        position: absolute;
        width: 30rem;
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
            border-bottom: 1px dotted lightGrey;
            background: white;
           
        }

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The label or the item such as house or car which is also editable.  