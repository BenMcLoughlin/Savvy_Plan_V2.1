import React from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"
import AddItemBox from "../../../../UI/AddItemBox/AddItemBox"

export default function IncomeInput({setFromAge, setToAge, setIncome, fromAge, toAge, 
    handleChangeLabel, incomeTypeArray, addItemToList, handleRemoveItem}) {                                                                      //Uses Destructing to assign variables and functions needed for this function                                                

        const setKeyVariables = (name, value) => {
            name === "fromAge" ? setFromAge(value) : setToAge(value)
        }
    return (
        <Wrapper>                                                                                                                                {/* Presents a dual rangebar for the user to input their starting and ending ages for inputting income */}
            <YearsSelectorWrapper> 
                <Title>Input Income By Year</Title>
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
            <Hr/>
            <RangeBarWrapper>
                {incomeTypeArray.map(incomeType => <RangeBar                                                                                    //Mapping through the types of income to render a rangeBar for Each                                                 
                                                    key={incomeType.name}
                                                    rangeBarProps={incomeType}
                                                    setValue={setIncome}
                                                    handleChangeLabel = {handleChangeLabel}
                                                    handleRemoveItem={handleRemoveItem}
                                                    />)
                }
                <AddItemBox                                                                                                                       //Box allowing the user to add new types of income     
                        firstButtonText={"Add New Income"}
                        listNewItemWillBeAddedToo={incomeTypeArray}
                        checkboxLabel={"Contribute To Canada Pension Plan?"}
                        addItemToList={addItemToList}
    
                />
            </RangeBarWrapper>
        </Wrapper>                            
    )
}
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`

`

const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`

const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
    padding-bottom: 1rem;
   
` 

const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`

const RangeBarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-top: 1rem;

`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
    This enables the user to input their income. They select an age range for the years in which they would like to input
    their income. Once they've selected the range they slide the range bars to change the value of the income and it fills
    into the reducer showing on the chart. There is an add item box which enables them to add new sources of income. 


*/ 
