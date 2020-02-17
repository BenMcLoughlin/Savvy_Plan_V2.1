import React, {useState} from 'react'
import RangeBar from "UI/rangeBar/RangeBar"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import styled from "styled-components"
import {connect} from "react-redux"
import {rate1, rate2} from "redux/assumptions/assumptions_selectors"
import {transaction_action, setOpitmizedValues_action} from "redux/savings/savings_actions"
import {renderSavings, optimizedWithdrawals} from "services/savings/savings_functions"
import {action_selector} from "redux/savings/savings_selectors"
import {changeSavings2_selector} from "redux/savings2/savings2_selector"
import {setSavings2_action, contribution_action } from "redux/savings2/savings2_actions"


const Contributions = ({changeSavings2_selector,savings2_reducer, contribution_action , setSavings2_action, count, rate1, rate2, rrspStartAge, savings_reducer,setOpitmizedValues_action, user_reducer, tfsaStartAge, transaction_action,}) => {

    const userAge = new Date().getFullYear() - user_reducer.birthYear

    const [fromAge, setFromAge] = useState(userAge)
    const [toAge, setToAge] = useState(65)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

     const setContributions = (value, rangeBarValue, {name})  => {

        renderSavings(fromAge, toAge, name, value, rangeBarValue, "contribute", savings_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)

         optimizedWithdrawals(name, savings_reducer, setOpitmizedValues_action, rate2)
       
    }
      console.log(savings2_reducer);
      //console.log(changeSavings2_selector);
      const newState = {
          newState: "Banana"
      }

    const rangeBarArray = Object.values(savings_reducer[fromAge])
    return (
         count > 2 ? 
                <Wrapper>     
                        <YearsSelectorWrapper> 
                            <button onClick={() => setSavings2_action(changeSavings2_selector)}>set savings state</button>
                            <button onClick={() => contribution_action(100000)}>set contribution</button>
                            <SelectorTitleWrapper>
                                    <div>From Age</div>    
                                    <div>To Age</div>    
                             </SelectorTitleWrapper>
                                    <DualRangeBar
                                    userAge={userAge} 
                                    fromAge={fromAge}                                                                                       //fromAge sets the from Age, eg. age 18 in 18-45
                                    toAge={toAge}                                                                                           //toAge sets the to Age, eg. age 45 in 18-45
                                    setKeyVariables={setKeyVariables}                                                                                      //reaches into reducer to set the values
                                />
                      </YearsSelectorWrapper>   
                                      <RangeBarWrapper>
    
                                                  <Display>
                                                  <RangeBar
                                                                  key={rangeBarArray[0].name}
                                                                  financialValue= {rangeBarArray[0].financialValue}
                                                                  rangeBarProps={rangeBarArray[0]}
                                                                  setValue={setContributions}
                                                                  />
                                                              
                                                                {/* <Value>{(Math.round(d.optimizedContribution/1000)*1000)/1000}k</Value>  */}
                                                  </Display>
            
                                </RangeBarWrapper>
                 </Wrapper>   
                 : null 
    )
}


const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        changeSavings2_selector: changeSavings2_selector(state),
        savings_reducer: state.savings_reducer,
        savings2_reducer: state.savings2_reducer,
        user_reducer: state.user_reducer,
        action_selector: action_selector(state)
    }
}

export default connect(mapStateToProps, {transaction_action, setOpitmizedValues_action, setSavings2_action, contribution_action })(Contributions)

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