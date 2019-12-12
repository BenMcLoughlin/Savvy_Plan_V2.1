import React from 'react'
import styled from "styled-components"
import SmallRangeBar from "../../../../UI/SmallRangeBar/SmallRangeBar"
export default function InvestmentFactors( {setInvestmentFactor_action, investmentReturns_reducer,  optimizedContribution, optimizedWithdrawals, savingsPerYear_reducer2, renderSavings, transaction_action, setOpitmizedValues_action}) {                                            //Use Destructing to assign variables and functions
   
   const investmentReturns = Object.values(investmentReturns_reducer)                                                                    //Converts pensionStartAges_reducer to an array so they can be mapped through to render mini rangeBars                                                          
 
    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 

        const rate1 = investmentReturns_reducer.rate1()
        const rate2 = investmentReturns_reducer.rate2()

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
                investmentReturns.slice(0,4).map(d => <SmallRangeBar 
                                            id={d.name}
                                            key={d.name}
                                            setValue={setInvestmentFactor}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={d}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />)
            }
        </Wrapper>                            
    )
}
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