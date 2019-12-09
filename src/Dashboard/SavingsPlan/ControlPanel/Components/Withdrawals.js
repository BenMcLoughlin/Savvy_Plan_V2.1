import React, { useState } from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"

export default function Withdrawals({setSavingsValue_action, withdrawals_reducer,calculateSavings, setWithdrawalValue_action}) {

    const [fromAge, setFromAge] = useState(65)
    const [toAge, setToAge] = useState(95)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

    const setWithdrawal = (financialValue, rangeBarValue, {label, name}) => {                                                 //used by rangebars to set income in incomeByYear reducer
       console.log(name);
        setWithdrawalValue_action(financialValue, label, name, rangeBarValue)
        for (let age = fromAge; age < toAge; age++ ) {                                                           
            setSavingsValue_action(age, -financialValue, label, name, rangeBarValue)                                          //sets the income for each of the years between the selected ranges
          } 
          console.log(name);
         calculateSavings(name)
                                             
    }

   const withdrawalRangeBarArray = Object.values(withdrawals_reducer)

    return (
        <Wrapper>         
        <YearsSelectorWrapper> 
            <SelectorTitleWrapper>
                <div>From Age</div>    
                <div>To Age</div>    
            </SelectorTitleWrapper>
            <DualRangeBar
                fromAge={fromAge}                                                                                       //fromAge sets the from Age, eg. age 18 in 18-45
                toAge={toAge}                                                                                           //toAge sets the to Age, eg. age 45 in 18-45
                setKeyVariables={setKeyVariables}                                                                                      //reaches into reducer to set the values
            />
            {
                withdrawalRangeBarArray.map(d => <RangeBar
                                        key={d.name}
                                        rangeBarProps={d}
                                        setValue={setWithdrawal}
                                         />
                )
            }
    </YearsSelectorWrapper>                                                                                    
        </Wrapper>                            
    )
}

//-----------------------------------------------STYLES-----------------------------------------------//
const Wrapper= styled.div`

`

const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`

const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
    padding-bottom: 1rem;
   
` 

const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`

const RangeBarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-top: 1rem;

`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the rrsp has been converted to a rrsp and inserts the minimum income into the incomePerYear reducer. 

*/