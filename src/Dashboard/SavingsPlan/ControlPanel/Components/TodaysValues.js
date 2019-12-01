import React from 'react'
import styled from "styled-components"


export default function IncomeInput({}) {                                                                      //Uses Destructing to assign variables and functions needed for this function                                                

    return (
        <Wrapper>                                                                                                                                {/* Presents a dual rangebar for the user to input their starting and ending ages for inputting income */}
            Todays Value
        </Wrapper>                            
    )
}
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
    This enables the user to input their income. They select an age range for the years in which they would like to input
    their income. Once they've selected the range they slide the range bars to change the value of the income and it fills
    into the reducer showing on the chart. There is an add item box which enables them to add new sources of income. 


*/ 
