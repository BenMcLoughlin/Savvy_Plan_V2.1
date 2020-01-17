import React from 'react'
import styled from "styled-components"
import minirangebar1 from "UI/miniRangeBar1/MiniRangeBar"

export default function PensionIncomeStartAges( {setPensionIncome, pensionStartAges_reducer, count}) {                                            //Use Destructing to assign variables and functions
   
    pensionStartAges_reducer = Object.values(pensionStartAges_reducer)                                                                    //Converts pensionStartAges_reducer to an array so they can be mapped through to render mini rangeBars                                                          
 
    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa minirangebar1 for each */}
            {
                    count > 3 ? 
                pensionStartAges_reducer.map(d => <minirangebar1 
                                            id={d.name}
                                            key={d.name}
                                            setValue={setPensionIncome}                                                        //Function Defined Above, sets the age in the reducer
                                            rangeBarProps={d}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                    />)
           : null }
        </Wrapper>                            
    )
}
//-----------------------------------------------style-----------------------------------------------//


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