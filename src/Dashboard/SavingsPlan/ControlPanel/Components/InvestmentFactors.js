import React from 'react'
import styled from "styled-components"
import SmallRangeBar from "../../../../UI/SmallRangeBar/SmallRangeBar"

export default function InvestmentFactors( {setInvestmentFactor_action, investmentReturns_reducer, fireSavingsPlan, calculateSavings}) {                                            //Use Destructing to assign variables and functions
   
    investmentReturns_reducer = Object.values(investmentReturns_reducer)                                                                    //Converts pensionStartAges_reducer to an array so they can be mapped through to render mini rangeBars                                                          
 
    const setInvestmentFactor = (value, nothing, {name}) => {
        setInvestmentFactor_action(name, value) 
        fireSavingsPlan()
        console.log(name);
        calculateSavings("tfsa")
        calculateSavings("nonRegistered")
        calculateSavings("rrsp")
    }
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa SmallRangeBar for each */}
            {
                investmentReturns_reducer.slice(0,4).map(d => <SmallRangeBar 
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