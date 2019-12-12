import React, {useState} from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"
import {inverseLogslider} from "../../../../services/logorithmicFunctions"
import {presentValue, payment} from "../../../../services/financialFunctions"

export default function Contributions({savingsPerYear_reducer2, optimizedWithdrawals, transaction_action, renderSavings, investmentReturns_reducer, setOpitmizedValues_action}) {

    const [fromAge, setFromAge] = useState(18)
    const [toAge, setToAge] = useState(65)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

    const rate1 = investmentReturns_reducer.rate1()
    const rate2 = investmentReturns_reducer.rate2()


 
     const setContributions = (value, rangeBarValue, {name})  => {
        renderSavings(fromAge, toAge, name, value, rangeBarValue, "contribute", savingsPerYear_reducer2, transaction_action, rate1, rate2 )
        optimizedWithdrawals(name, savingsPerYear_reducer2, setOpitmizedValues_action, rate2)
       
    }

    const rangeBarArray = Object.values(savingsPerYear_reducer2[fromAge])

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
                    <RangeBarWrapper>
                    {
                        rangeBarArray.map(d => 
                       
                                <Display>
                                <RangeBar
                                                key={d.name}
                                                financialValue= {d.financialValue}
                                                rangeBarProps={d}
                                                setValue={setContributions}
                                                />
                                            
                                              <Value>{(Math.round(d.optimizedContribution/1000)*1000)/1000}k</Value> 
                                </Display>
    
    
                        )
                    }
                    </RangeBarWrapper>


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

const Value = styled.div `
        position: absolute;
        left: 77%;
        top: .8rem;
        border-radius: 3px;
        padding: .4rem;
        height: 2.6rem;
        width: 4rem;
        align-content: center;
        text-align: center;
        color: white;
        border: none;
        background: ${props => props.theme.color.slate};
        font-size: ${props =>props.theme.fontSize.small};
   
` 
const Display = styled.div `
   position:relative;
  


   
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
  width: 88%;

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