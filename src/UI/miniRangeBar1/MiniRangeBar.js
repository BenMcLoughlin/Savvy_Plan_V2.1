import React, { useEffect } from 'react'
import styled from "styled-components"
import MiniRangeBarLabel from "UI/miniRangeBar1/Components/MiniRangeBarLabel"
import MiniRangeBarValue from "UI/miniRangeBar1/Components/MiniRangeBarValue"
import MiniRangeBarSlider from "UI/miniRangeBar1/Components/MiniRangeBarSlider"


/*Props Required to be passed:
1. setIncome 
      a function that receives a name, rangebar value and the range bar props and
      uses those variables to pass into the action and set the reducer. 
2. rangeBarProps
     This is an object containing the item name, id, label, and rangebar value. The mini range Bar also required a min, max and step
     as well as a number types which will determine if it will display a percentage or a normal number. 
*/ 

const minirangebar1 = ({rangeBarProps,handleChangeLabel, setValue }) =>  {
        return (
            < RangeBarWrapper>
                <MiniRangeBarLabel
                     rangeBarProps={rangeBarProps}
                     handleChangeLabel={handleChangeLabel}
                />
                <MiniRangeBarSlider
                     rangeBarProps={rangeBarProps}
                     setValue={setValue}
                />
                <MiniRangeBarValue
                    rangeBarProps={rangeBarProps}
                    setValue={setValue}
                />
               
            </RangeBarWrapper>
        )
}

export default minirangebar1
//-----------------------------------------------style-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    padding-left: 2rem;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// This is the entire rangebar wrapper that contains the label, the range bar input and the value output. 
