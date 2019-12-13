import React from 'react'
import styled from "styled-components"
import SmallRangeBar from "../../../../UI/SmallRangeBar/SmallRangeBar"
import {connect} from "react-redux"
import {rate1, rate2, investmentReturnsArray} from "../../reducers/savingsPlan_selectors"
import {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action} from "../../actions"
import {renderSavings, optimizedWithdrawals, optimizedContribution} from "../../services/localFunctions"

const  InvestmentFactors = ( {setInvestmentFactor_action, investmentReturnsArray, savingsPerYear_reducer2, transaction_action, setOpitmizedValues_action, rate1, rate2}) => {                                            //Use Destructing to assign variables and functions
                                                           
    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 
        const array = ["rrsp", "tfsa", "nonRegistered"]
        array.map(account => {
                renderSavings(65, 65, account, 0, 0, "withdraw", savingsPerYear_reducer2, transaction_action, rate1, rate2 )
                optimizedWithdrawals("rrsp", savingsPerYear_reducer2, setOpitmizedValues_action, rate2)
                optimizedContribution("rrsp", savingsPerYear_reducer2, setOpitmizedValues_action, rate1)
    })
    }
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa SmallRangeBar for each */}
            {
                investmentReturnsArray.slice(0,4).map(d => <SmallRangeBar 
                                            id={d.name}
                                            key={d.name}
                                            setValue={setInvestmentFactor}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={d}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />)
            }
        </Wrapper>                            
    )
}

const mapStateToProps = (state) => {
    return {
        rate1: rate1(state),
        rate2: rate2(state),
        investmentReturnsArray: investmentReturnsArray(state),
        savingsPerYear_reducer2: state.savingsPerYear_reducer2,

    }
}

export default connect(mapStateToProps, {transaction_action, setInvestmentFactor_action, setOpitmizedValues_action})(InvestmentFactors)
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 2rem;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and rrsp ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.

*/