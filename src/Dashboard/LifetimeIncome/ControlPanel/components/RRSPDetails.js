import React from 'react'
import {calculateRRIFPaymentTable} from "../../../../services/financialFunctions"
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import styled from "styled-components"

export default function PensionIncomeStartAges() {
    // {setValue, setIncome, setFutureRRSPValue,
    //  lifetimeIncomeVariables: {futureRRSPValue,  rrspDetails, 
    //  pensionStartAges: {rrifStartAge: {rangeBarValue: startAge}}}} = this.props) {                                    //Uses Destructing to assign variables and functions needed for this function
   
    //     rrspDetails = Object.values(rrspDetails)                                                                      //Converts the rrspDetails into an Array that can be mapped through to show a rangeBar for each 

    //     const setIncome = (name, financialValue, rangeBarValue, rangeBarProps)  => {                          //Function fired by changing the rangeBar
    //         setValue(name, financialValue, rangeBarValue, rangeBarProps)                                              //sets the values inputted by the rangeBar into the lifetimeIncomeVariable Reducer
    //         setFutureRRSPValue()
    //         const RRIFPaymentTable = calculateRRIFPaymentTable(startAge, futureRRSPValue, 0.03)                       //Calculates the required withdrawal per year from the future RRSP value
    //         let position = 0                                                                                          //Sets an initial counter fro our for loop inserting the income into the years
    //         for (let i = startAge; i <= 95; i++) {
    //             const withdrawal = RRIFPaymentTable[position].withdrawal                                              //Looks up the minimum withdrawal for that year in the table
    //             setIncome(i, "rrifIncome", withdrawal)                                                                //Sets the income as rrifIncome in each earning year
    //             position++                                                                                            //Increments position up by one for the next loop
    //         }
    //     }

    return (
        <Wrapper>         
        rrsp details                                                                                          {/* This walks through the pensionStartAges provided from the reducer and rendersa MiniRangeBar for each */}
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

this component renders two rangebars, one that inputs the users current RRSP value and the other is their annual contributions. 
When the user inputs these values it calculates the future RRSP value then uses that to determine the required withdrawal per year.
It runs a loop for all years after the RRIF has been converted to a RRIF and inserts the minimum income into the incomePerYear reducer. 

*/