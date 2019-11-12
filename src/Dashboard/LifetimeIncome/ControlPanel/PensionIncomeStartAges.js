import React from 'react'
import {calculateRRIFPaymentTable} from "../../../services/financialFunctions"
import MiniRangeBar from "../../../UI/MiniRangeBar/MiniRangeBar"
import styled from "styled-components"

export default function PensionIncomeStartAges( {setIncome, setValue, 
    calculateCPP, clearIncomeBeforeStartAge, calculateOAS,
     lifetimeIncomeVariables: {futureRRSPValue, pensionStartAges}} = this.props) {                                    //Use Destructing to assign variables and functions
   
    pensionStartAges = Object.values(pensionStartAges)                                                                //Converts pensionStartAges to an array so they can be mapped through to render mini rangeBars                                                          

    const setValueInReduer = (name, financialValue, rangeBarValue, rangeBarProps)  => {   
        setValue(name, financialValue, rangeBarValue, rangeBarProps)                                                 //Takes value from rangeBar and sets it into the lifetimeIncomeVariables state
        if  (name === "cppStartAge") {                                                                               //Checks name of value being changed and sets it into the lifetimeIncomeYearList 
        for (let age = rangeBarValue; age <=95; age ++) {                                                            //Runs from the age selected in the rangeBar to age 95 and inserts the income into the reducer
            calculateCPP(rangeBarValue, age)
            }
        }
        else if  (name === "oasStartAge") {
        for (let age = rangeBarValue; age <=95; age ++) {                                                            //Same as above but for OAS
            calculateOAS(rangeBarValue, age)
        }
       }
        else if  (name === "rrifStartAge") {                                                                         //Same as above but for OAS
            let position = 0
            const RRIFPaymentTable = calculateRRIFPaymentTable(rangeBarValue, futureRRSPValue, 0.03)                 //This table builds a withdrawal plan according to government withdrawal requirements
            for (let i = rangeBarValue; i <= 95; i++) {                                                              //This steps through the table and sets the RRIF income for each year
                position++
                setIncome(i, "rrifIncome", RRIFPaymentTable[position].withdrawal, 0, false)
            }
       }

       for (let age = 50; age < rangeBarValue; age++) {
        clearIncomeBeforeStartAge(age, rangeBarProps)                                                               //As the user changes their start age the old income added to the reducer is removed
        }
    }


    return (
        <Wrapper>                                                                                                   {/* This walks through the pensionStartAges provided from the reducer and rendersa MiniRangeBar for each */}
            {
                pensionStartAges.map(d => <MiniRangeBar 
                                            id={d.name}
                                            key={d.name}
                                            setValueInReduer={setValueInReduer}
                                            rangeBarProps={d}
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
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*

This component renders the MiniRangeBars on the bottom right of the Control panel. These range bars change the pension start ages such as
CPP, OAS, and RRIF ages at which the user would begin collecting pension. There is also one rangebar that changes the interest rate return of the
RRSP savings.

*/