import React from 'react'
import {calculateRRIFPaymentTable} from "../../../services/financialFunctions"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import styled from "styled-components"

export default function PensionIncomeStartAges( {setValue, setIncome, setFutureRRSPValue,
     lifetimeIncomeVariables: {futureRRSPValue,  rrspDetails, pensionStartAges: {rrifStartAge: {rangeBarValue: startAge}}}} = this.props) {                                    //Use Destructing to assign variables and functions
   
        rrspDetails = Object.values(rrspDetails)

        const setValueInReduer = (name, financialValue, rangeBarValue, rangeBarProps)  => {   
            setValue(name, financialValue, rangeBarValue, rangeBarProps)                                                 //Takes value from rangeBar and sets it into the lifetimeIncomeVariables state
            setFutureRRSPValue()
            const RRIFPaymentTable = calculateRRIFPaymentTable(startAge, futureRRSPValue, 0.03)
            let position = 0
            for (let i = startAge; i < 95; i++) {
                position++
                const withdrawal = RRIFPaymentTable[position].withdrawal
                setIncome(i, "rrifIncome", withdrawal, 0, false)
            }
        }


    return (
        <Wrapper>                                                                                                   {/* This walks through the pensionStartAges provided from the reducer and rendersa MiniRangeBar for each */}
            {
                rrspDetails.map(d => 
                                <RangeBar   id={d.name}
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



*/