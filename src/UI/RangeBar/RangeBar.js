import React from 'react'
import styled from "styled-components"
import {CloseIcon} from "styles/Icons"
import RangeBarLabel from "./Components/RangeBarLabel"
import RangeBarValue from "./Components/RangeBarValue"
import RangeBarSlider from "./Components/RangeBarSlider"
import Close from "UI/Buttons/Close"

/*Props Required to be passed:
1. setIncome 
      a function that receives a name, a logValue and a rangebar value and
      uses those variables to pass into the action and set the reducer. 
2. rangeBarProps
     This is an object containing the item name, id, label, financial value and rangebar value. It 
     can also contain variables useful to the parent state that will be passed back and used to guide
     any changes to the correct position in the reducer via the action.  
*/ 

 const RangeBar = ({...props}) => {


        return (
            < RangeBarWrapper>
                <RangeBarLabel
                    {...props}
                />
                <RangeBarSlider
                     {...props}
                />
                <RangeBarValue
                     {...props}
                />
               
               {
                   props.close ? 
                   <CloseWrapper>
                         <Close    rangeBarProps={props.rangeBarProps} handleRemoveItem={props.handleRemoveItem}/>
                   </CloseWrapper>
                   :
                   null
               }
                
            </RangeBarWrapper>
        )
}

export default RangeBar

//-----------------------------------------------STYLES-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    position: relative;
    padding-left: 2rem;
    width: 23rem;

`
const  CloseWrapper = styled.div`
    position: absolute;
    top: .9rem;
    left: 135%;
    cursor: pointer;
    z-index: 300;
    border-radius: 50%;
    overflow: hidden;
    color: ${props => props.theme.color.slate};
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 