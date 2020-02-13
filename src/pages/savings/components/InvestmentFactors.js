import React from 'react'
import styled from "styled-components"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {connect} from "react-redux"
import {rate1, rate2, investmentReturns_selector} from "redux/assumptions/assumptions_selectors"
import {transaction_action, setOpitmizedValues_action} from "redux/savings/savings_actions"
import {setInvestmentFactor_action} from "redux/assumptions/assumptions_actions"
import {renderSavings, optimizedWithdrawals, optimizedContribution} from "services/savings/savings_functions"
import {initializeSavingsAndWithdrawals} from "services/savings/savings_functions"

const  InvestmentFactors = ( { setInvestmentFactor_action, investmentReturns_selector, income_reducer, savings_reducer, transaction_action, setOpitmizedValues_action, rate1, rate2, count, pensionStartAges_reducer}) => {                                            //Use Destructing to assign variables and functions
          
    const {pensionStartAges_reducer: {rrspStartAge: {rangeBarValue: rrspStartAge}}} = {pensionStartAges_reducer}
    const {pensionStartAges_reducer: {tfsaStartAge: {rangeBarValue: tfsaStartAge}}} = {pensionStartAges_reducer}
   
    const currentAge = 18
    const changeChart = () => {
        initializeSavingsAndWithdrawals(currentAge, income_reducer, rate1, rate2, rrspStartAge, tfsaStartAge, transaction_action)
    }

    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 
        const array = ["rrsp", "tfsa", "nonRegistered"]
        array.map(account => {
                renderSavings(65, 65, account, 0, 0, "contribute", savings_reducer, rrspStartAge, rate1, rate2, transaction_action, tfsaStartAge)
                optimizedWithdrawals("rrsp", savings_reducer, setOpitmizedValues_action, rate2)
                optimizedContribution("rrsp", savings_reducer, setOpitmizedValues_action, rate1)
                return null;
    })
    changeChart()
    }
    console.log(investmentReturns_selector);
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa miniRangeBar for each */}
            {
                count > 1 ? 
                investmentReturns_selector.map(d => <MiniRangeBar 
                                            id={d.name}
                                            key={d.name}
                                            setValue={setInvestmentFactor}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={d}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />)
                    : null
            }
        </Wrapper>                            
    )
}

const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        investmentReturns_selector: investmentReturns_selector(state),
        savings_reducer: state.savings_reducer,
        income_reducer: state.income_reducer,
        pensionStartAges_reducer: state.pensionStartAges_reducer,

    }
}

export default connect(mapStateToProps, {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action})(InvestmentFactors)
//-----------------------------------------------style-----------------------------------------------//


const Wrapper= styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 6rem;
    width: 40rem;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and rrsp ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.
*/