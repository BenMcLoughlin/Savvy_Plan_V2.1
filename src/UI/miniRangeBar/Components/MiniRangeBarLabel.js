import React, { Component } from 'react'
import styled from "styled-components"

 class MiniRangeBarLabel extends Component {

    render() {
        return (
                <Wrapper>
             <Label 
             name={this.props.rangeBarProps.name}
                > {this.props.rangeBarProps.label}</Label>      
                </Wrapper> 

        )
    }
}

export default MiniRangeBarLabel

 
//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`
   text-align: center;
`
const Label = styled.div`
        font-size: ${props =>props.theme.fontSize.smallMedium};
        color: ${props => props.theme.color.slate};
        padding: 0.3rem;
        text-transform: capitalize;
        background: transparent;
        border: none;
        text-align: center;
        width: 100%;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The label or the item such as house or car which is also editable.  


//SLIDER

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// The actual slider bar. 
