import React, {useState, useEffect} from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import styled from "styled-components"




const DesiredRetirementIncome = ({ setReccomendedRetirementIncome, keyVariables_reducer }) => {                           //Uses Destructing to assign variables and functions needed for this function                                                

const {retirementIncome} = keyVariables_reducer

    return (
        <Wrapper>                                                                                                                                {/* Presents a dual rangebar for the user to input their starting and ending ages for inputting income */}
            <RangeBarWrapper>
                 <RangeBar                                                                                    //Mapping through the types of income to render a rangeBar for Each                                                 
                                                    rangeBarProps={retirementIncome}
                                                    setValue={setReccomendedRetirementIncome}
                                                    />
            </RangeBarWrapper>
        </Wrapper>                            
    )

}

export default  DesiredRetirementIncome
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`
margin-top: 2rem;
`

const RangeBarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
    This enables the user to input their income. They select an age range for the years in which they would like to input
    their income. Once they've selected the range they slide the range bars to change the value of the income and it fills
    into the reducer showing on the chart. There is an add item box which enables them to add new sources of income. 


*/ 


// useEffect(() => {
//     const workingLifetimeEarnings = Object.values(incomePerYear_reducer)                                          // turn object into array
//     .map(d => Object.values(d)
//       .map(a => a.financialValue)                                                     // make sub arrays just show financial value
//       .reduce((acc, num) => acc + num))                                               // sum the earned value for each year. 
//      .slice(0,47)                                                                     // Grab Only working years 
//      .reduce((acc, num) => acc + num)                                                 // determine sum total of working years income
    
//      let averageWorkingEarnings =  Math.round((workingLifetimeEarnings/47)/100)*100  //calculate average working annual income, then round
//      averageWorkingEarnings = 0 ? 20000 : averageWorkingEarnings
//      const rangeBarValue = inverseLogslider(averageWorkingEarnings)
//      setRetirementIncome_action(averageWorkingEarnings, rangeBarValue)

//   }, []);

