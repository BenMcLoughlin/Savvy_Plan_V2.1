import React from 'react'
import RangeBar from "UI/rangeBar1/RangeBar"
import styled from "styled-components"




const DesiredRetirementIncome = ({ setReccomendedRetirementIncome, user_reducer, count }) => {                           //Uses Destructing to assign variables and functions needed for this function                                                

const {retirementIncome} = user_reducer

    return (
        <Wrapper>            
                       {
                    count > 4 ?                                                   
            <RangeBarWrapper>
                 <RangeBar                                                                                    //Mapping through the types of income to render a rangeBar for Each                                                 
                                                    rangeBarProps={retirementIncome}
                                                    setValue={setReccomendedRetirementIncome}
                                                    />
             </RangeBarWrapper>
                : 
                null 
                
                }
        </Wrapper>                            
    )

}

export default  DesiredRetirementIncome
//-----------------------------------------------style-----------------------------------------------//


const Wrapper= styled.div`
margin-top: 2rem;
`

const RangeBarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
    This enables the user to input their income. They select an age range for the years in which they would like to input
    their income. Once they've selected the range they slide the range bars to change the value of the income and it fills
    into the reducer showing on the chart. There is an add item box which enables them to add new sources of income. 


*/ 

