import React from 'react'
import styled from "styled-components"
import SmallRangeBar from "../../../../UI/SmallRangeBar/SmallRangeBar"
import {connect} from "react-redux"
import {rate1, rate2, investmentReturnsArray} from "../../../../redux/savings/savings_selectors"
import {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action} from "../../../../redux/savings/savings_actions"
import {renderSavings, optimizedWithdrawals, optimizedContribution} from "../../services/localFunctions"

const  InvestmentFactors = ( { changeChart, setInvestmentFactor_action, investmentReturnsArray, savings_reducer, transaction_action, setOpitmizedValues_action, rate1, rate2,rrspStartAge, count, tfsaStartAge}) => {                                            //Use Destructing to assign variables and functions
                                                           
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
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa SmallRangeBar for each */}
            {
                count > 1 ? 
                investmentReturnsArray.map(d => <SmallRangeBar 
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
        investmentReturnsArray: investmentReturnsArray(state),
        savings_reducer: state.savings_reducer,

    }
}

export default connect(mapStateToProps, {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action})(InvestmentFactors)
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 6rem;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and rrsp ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.

*/