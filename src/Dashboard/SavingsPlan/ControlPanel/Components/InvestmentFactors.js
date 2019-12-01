import React from 'react'
import styled from "styled-components"
//import SmallRangeBar from "../../../../UI/SmallRangeBar/SmallRangeBar"

export default function PensionIncomeStartAges( ) {                                            //Use Destructing to assign variables and functions
   

    return (
        <Wrapper>                                                                                                                         {/* This walks through the pensionStartAges_reducer provided from the reducer and rendersa SmallRangeBar for each */}
             Investment Factors
        </Wrapper>                            
    )
}
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`

  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and RRIF ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.

*/