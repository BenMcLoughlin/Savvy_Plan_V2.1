import React from 'react'
import RangeBar from "../../../../UI/RangeBar/RangeBar"
import DualRangeBar from "../../../../UI/DualRangeBar"
import styled from "styled-components"
import AddItemBox from "../../../../UI/AddItemBox/AddItemBox"

export default function IncomeInput({setParentDualRangeValues,lower, higher, setValueInReducer , 
    handleChangeLabel, handleRemoveItem,  addItemToList, incomePerYear} = this.props) {                             //Uses Destructing to assign variables and functions needed for this function                                                

        const incomeTypeArray = Object.values(incomePerYear[18].incomeType)                                         //Converts the year list to an array so that it can be mapped through for rangebars  
                        .filter(d => d.name !== "oasIncome")                                                        //Range Bars only show for income the user is inputting, not retirementIncome, these are filtered out                       
                        .filter(d => d.name !== "cppIncome")
                        .filter(d => d.name !== "rrifIncome") 
    return (
        <Wrapper>                                                                                                   {/* Presents a dual rangebar for the user to input their starting and ending ages for inputting income */}
            <EarningYearsSelectorWrapper> 
                <Title>Input Income By Year</Title>
                <SelectorTitleWrapper>
                    <div>From Age</div>    
                    <div>To Age</div>    
                </SelectorTitleWrapper>
                <DualRangeBar
                    lower={lower}                                                                                    //lower sets the from Age, eg. age 18 in 18-45
                    higher={higher}                                                                                  //higher sets the to Age, eg. age 45 in 18-45
                    setParentDualRangeValues={setParentDualRangeValues}                                              //reaches into reducer to set the values
                />
            </EarningYearsSelectorWrapper>
            <Hr/>
            <RangeBarWrapper>
                {incomeTypeArray.map(incomeType => <RangeBar                                                        //Mapping through the types of income to render a rangeBar for Each                                                 
                                                    key={incomeType.name}
                                                    rangeBarProps={incomeType}
                                                    setValueInReducer={setValueInReducer}
                                                    handleChangeLabel = {handleChangeLabel}
                                                    handleRemoveItem={handleRemoveItem}

                                                    />)
                }
                <AddItemBox                                                                                         //Box allowing the user to add new types of income     
                        firstButtonText={"Add New Income"}
                        listNewItemWillBeAddedToo={incomeTypeArray}
                        addItemToList={addItemToList}
                        checkboxLabel={"Contribute To Canada Pension Plan?"}

                />
            </RangeBarWrapper>
        </Wrapper>                            
    )
}
//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper= styled.div`

`

const EarningYearsSelectorWrapper = styled.div`
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
    color: ${props => props.theme.color.contrastText1};
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