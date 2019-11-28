import React from 'react'
//import {calculateRRIFPaymentTable} from "../../../../services/financialFunctions"
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import styled from "styled-components"

export default function PensionIncomeStartAges({rrsp_reducer, setSavingsValue_action}) {

    const contributionRangeBarValues = {
        financialValue: rrsp_reducer[18].contribution, 
        rangeBarValue: 0,
        account: "rrsp",
        age: 32,
        label: "RRSP Contributions",        
        name: "RrspContributions",        
    }
    const presentValueRangeBarValues = {
        financialValue: 0, 
        rangeBarValue: 0,
        account: "rrsp",
        age: 32,
        label: "Present RRSP Value",        
        name: "presentValue",        
    }
    const setValue = (value, rangebarValue, {account, age, name}) => {
        setSavingsValue_action(account, age, name, value )
    }

    return (
        <Wrapper>         
                                                                                                                  
        </Wrapper>                            
    )
}

//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper= styled.div`
    margin-top: 3.4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the RRIF has been converted to a RRIF and inserts the minimum income into the incomePerYear reducer. 

*/