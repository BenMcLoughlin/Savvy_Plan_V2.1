import React, {useState} from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"
import {connect} from "react-redux"
import {rate1, rate2} from "../../reducers/savingsPlan_selectors"
import {transaction_action, setOpitmizedValues_action} from "../../actions"
import {renderSavings, optimizedWithdrawals} from "../../services/localFunctions"


const Contributions = ({count, rate1, rate2, rrspStartAge, savingsPerYear_reducer,setOpitmizedValues_action, tfsaStartAge, transaction_action,}) => {

    const [fromAge, setFromAge] = useState(18)
    const [toAge, setToAge] = useState(65)    

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

     const setContributions = (value, rangeBarValue, {name})  => {
        console.log([value, rangeBarValue, name]);
        renderSavings(18, 65, name, value, rangeBarValue, "contribute", savingsPerYear_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)

        // optimizedWithdrawals(name, savingsPerYear_reducer, setOpitmizedValues_action, rate2)
       
    }

    const setWithdrawals = (value, rangeBarValue, {name})  => {
        console.log([value, rangeBarValue, name]);
        renderSavings(65, 95, name, value, rangeBarValue, "withdraw", savingsPerYear_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)
      //  optimizedContribution(name, savingsPerYear_reducer, setOpitmizedValues_action, rate1)
    }


    const rangeBarContributions = savingsPerYear_reducer[18].rrsp
    const rangeBarWithdrawals = savingsPerYear_reducer[72].rrsp

    return (

                <Wrapper>     
                                      <RangeBarWrapper>
                                                  <RangeBar
                                                                  financialValue= {rangeBarContributions.financialValue}
                                                                  rangeBarProps={rangeBarContributions}
                                                                  setValue={setContributions}
                                                                  />
                                                  <RangeBar
                                                                  financialValue= {rangeBarContributions.financialValue}
                                                                  rangeBarProps={rangeBarWithdrawals}
                                                                  setValue={setWithdrawals}
                                                                  />
                                
                                </RangeBarWrapper>
                 </Wrapper>   
    )
}


const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        savingsPerYear_reducer: state.savingsPerYear_reducer,

    }
}

export default connect(mapStateToProps, {transaction_action, setOpitmizedValues_action})(Contributions)

//-----------------------------------------------STYLES-----------------------------------------------//
const Wrapper= styled.div`
    width: 100%;
    grid-area: d;
`

const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`

const RangeBarWrapper = styled.div`
  overflow: hidden;
  margin-top: 1rem;
  width: 60%;
  display: flex;
  justify-content: space-around;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the rrsp has been converted to a rrsp and inserts the minimum income into the incomePerYear reducer. 

*/