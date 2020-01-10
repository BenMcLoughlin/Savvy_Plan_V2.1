import React, {useState} from './node_modules/react'
import RangeBar from "componentsUI/RangeBar/RangeBar"
import DualRangeBar from "componentsUI/DualRangeBar"
import styled from "./node_modules/styled-components"
import {connect} from "./node_modules/react-redux"
import {rate1, rate2} from "componentsredux/savings/savings_selectors"
import {transaction_action, setOpitmizedValues_action} from "componentsredux/savings/savings_actions"
import {renderSavings, optimizedContribution} from "services/localFunctions"


const Withdrawals = ({count, savings_reducer,transaction_action, setOpitmizedValues_action, rate1, rate2, rrspStartAge, tfsaStartAge}) => {

    const [fromAge, setFromAge] = useState(65)
    const [toAge, setToAge] = useState(95)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

    const setWithdrawals = (value, rangeBarValue, {name})  => {
        renderSavings(fromAge, toAge, name, value, rangeBarValue, "withdraw", savings_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)
      //  optimizedContribution(name, savings_reducer, setOpitmizedValues_action, rate1)
    }


    const rangeBarArray = Object.values(savings_reducer[fromAge])

    return (
          
                 count > 3 ? 
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
                                                            setValue={setWithdrawals}
                                                            />
                                                            {/* <Value>{(Math.round(d.optimizedWithdrawal/1000)*1000)/1000}k</Value> */}
                                            </Display>
                
                
                                    )
                                }
                                </RangeBarWrapper>
                
                    </YearsSelectorWrapper>       
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

export default connect(mapStateToProps, {transaction_action, setOpitmizedValues_action})(Withdrawals)

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

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the rrsp has been converted to a rrsp and inserts the minimum income into the income reducer. 

*/