import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import RangeBar from "../..../../../UI/Headers/SectionHeader
import AddItemBox from../../../UI/RangeBar/RangeBarBox"
import DualRangeBar from../../../UI/AddItemBox/AddItemBox



export default class EarningYearsSelector extends Component {
    render() {
       const lower= this.props.lower
       const higher= this.props.higher

        return (
            <EarningYearsSelectorWrapper>
            <Title>Input Income By Year</Title>
            <SelectorTitleWrapper>
                <SelectorTitle>From Age</SelectorTitle>      
                <SelectorTitle>To Age</SelectorTitle>
            </SelectorTitleWrapper>
                <DualRangeBar
                    lower={lower}
                    higher={higher}
                    setParentDualRangeValues={this.props.setParentDualRangeValues}
                />
         
            </EarningYearsSelectorWrapper>
        )
    }
}



//-----------------------------------------------STYLES-----------------------------------------------//


const EarningYearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    border-bottom: ${props => props.theme.border.primary}
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
const SelectorTitle = styled.div`

`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 



export default class IncomeInput extends Component {


    renderRangeBars = (incomeTypeArray) => {
       return incomeTypeArray.map(incomeType => <RangeBar id={incomeType.name}
                                                                 key={incomeType.name}
                                                                 rangeBarProps={incomeType}
                                                                 setValueInReducer={this.props.setValueInReducer}
                                                                 handleChangeLabel = {this.props.handleChangeLabel}
                                                                 handleRemoveItem={this.props.handleRemoveItem}
                                                                 />
                                                                
        )
    }

    render() {


        return (

                <IncomeInputWrapper>
                {this.renderRangeBars(this.props.incomeTypeArray)}
  
                    <AddItemBox
                        firstButtonText={"Add New Income"}
                        listNewItemWillBeAddedToo={this.props.incomeTypeArray}
                        addItemToList={this.props.addItemToList}
                        checkboxLabel={"Contribute To Canada Pension Plan?"}

                    />

            </IncomeInputWrapper>

        )
    }
}




//-----------------------------------------------STYLES-----------------------------------------------//


const IncomeInputWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-left: 2rem;

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 