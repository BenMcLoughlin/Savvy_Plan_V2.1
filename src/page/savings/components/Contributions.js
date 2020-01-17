import React, {useState} from 'react'
import RangeBar from "UI/rangeBar1/RangeBar"
import DualRangeBar from "UI/dualRangeBar1/DualRangeBar"
import styled from "styled-components"
import {connect} from "react-redux"
import {rate1, rate2} from "redux/assumptions/assumptions_selectors"
import {transaction_action, setOpitmizedValues_action} from "redux/savings/savings_actions"
import {renderSavings, optimizedWithdrawals} from "services/savings/savings_functions"


const Contributions = ({count, rate1, rate2, rrspStartAge, savings_reducer,setOpitmizedValues_action, tfsaStartAge, transaction_action,}) => {

    const [fromAge, setFromAge] = useState(18)
    const [toAge, setToAge] = useState(65)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

     const setContributions = (value, rangeBarValue, {name})  => {

        renderSavings(fromAge, toAge, name, value, rangeBarValue, "contribute", savings_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)

         optimizedWithdrawals(name, savings_reducer, setOpitmizedValues_action, rate2)
       
    }

    const rangeBarArray = Object.values(savings_reducer[fromAge])
    return (
         count > 2 ? 
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
                      </YearsSelectorWrapper>   
                                      <RangeBarWrapper>
                                      { rangeBarArray.map(d => 
                                                  <Display>
                                                  <RangeBar
                                                                  key={d.name}
                                                                  financialValue= {d.financialValue}
                                                                  rangeBarProps={d}
                                                                  setValue={setContributions}
                                                                  />
                                                              
                                                                {/* <Value>{(Math.round(d.optimizedContribution/1000)*1000)/1000}k</Value>  */}
                                                  </Display>
                                          ) }
                                </RangeBarWrapper>
                 </Wrapper>   
                 : null 
    )
}


const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        savings_reducer: state.savings_reducer,

    }
}

export default connect(mapStateToProps, {transaction_action, setOpitmizedValues_action})(Contributions)

//-----------------------------------------------style-----------------------------------------------//
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

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the rrsp has been converted to a rrsp and inserts the minimum income into the income reducer. 

*/