import React from 'react'
import RangeBar from "UI/RangeBar/RangeBar"
import DualRangeBar from "UI/DualRangeBar"
import styled from "styled-components"
import AddItemBox from "UI/AddItemBox/AddItemBox"

export default function IncomeInput({setIncome, handleChangeLabel, income_reducer, addItemToList, handleRemoveItem, setFromAge, setToAge, fromAge, toAge, count}) {                           //Uses Destructing to assign variables and functions needed for this function                                                

    const setKeyVariables = (name, value) => {
        name === "fromAge" ? setFromAge(value) : setToAge(value)
    }

    const incomeTypeArray = Object.values(income_reducer[fromAge])                                                                //Converts the year list to an array so that it can be mapped through for rangebars  
                        .filter(d => d.name !== "oasIncome")                                                                             //Range Bars only show for income the user is inputting, not retirementIncome, these are filtered out                       
                        .filter(d => d.name !== "cppIncome")
                        .filter(d => d.name !== "rrsp") 
                        .filter(d => d.name !== "tfsa") 
                        .filter(d => d.name !== "nonRegistered") 

    const rangeBars = count > 2 ? incomeTypeArray : incomeTypeArray.slice(0,1)

    return (
        <Wrapper> 
            {
                count > 0 ? 
                <YearsSelectorWrapper> 
                    <SelectorTitleWrapper>
                        <div>From Age</div>    
                        <div>To Age</div>    
                    </SelectorTitleWrapper>
                    <DualRangeBar
                        fromAge={fromAge}                                                                                       //fromAge sets the from Age, eg. age 18 in 18-45
                        toAge={toAge}                                                                                           //toAge sets the to Age, eg. age 45 in 18-45
                        setKeyVariables={setKeyVariables}                                                                                      //reaches into reducer to set the values
                    />
            </YearsSelectorWrapper>  
            : 
            null
            }
                {
                    count > 1 ? 
                    <RangeBarWrapper>
                        {rangeBars.map(incomeType => <RangeBar                                                                                    //Mapping through the types of income to render a rangeBar for Each                                                 
                                                            key={incomeType.name}
                                                            rangeBarProps={incomeType}
                                                            setValue={setIncome}
                                                            handleChangeLabel = {handleChangeLabel}
                                                            handleRemoveItem={handleRemoveItem}
                                                            close={true}
                                                          
                                                            />)
                        }
                        <AddItemBox                                                                                                                       //Box allowing the user to add new types of income     
                                firstButtonText={"Add New Income"}
                                listNewItemWillBeAddedToo={incomeTypeArray}
                                checkboxLabel={"Contribute To Canada Pension Plan?"}
                                addItemToList={addItemToList}
            
                        />
                    </RangeBarWrapper>
                    : null
                }                                                                                                             {/* Presents a dual rangebar for the user to input their starting and ending ages for inputting income */}

        </Wrapper>                            
    )
}
//-----------------------------------------------style-----------------------------------------------//


const Wrapper= styled.div`
    margin-top: 2rem;
`

const RangeBarWrapper = styled.div`
  margin-top: 2rem;
  overflow: hidden;
  position: relative;
  text-align: center;
`

const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`


const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
    This enables the user to input their income. They select an age range for the years in which they would like to input
    their income. Once they've selected the range they slide the range bars to change the value of the income and it fills
    into the reducer showing on the chart. There is an add item box which enables them to add new sources of income. 


*/ 
