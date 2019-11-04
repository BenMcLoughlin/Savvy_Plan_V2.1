import React, { Component } from 'react'
import styled, {keyframes, css} from "styled-components"
import SectionHeader from "../../../UI/Headers/SectionHeader"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import AddItemBox from "../../../UI/AddItemBox/AddItemBox"




export default class IncomeInput extends Component {


    renderRangeBars = (incomeTypeArray) => {
       return incomeTypeArray.map(incomeType => <RangeBar id={incomeType.name}
                                                                 key={incomeType.name}
                                                                 rangeBarProps={incomeType}
                                                                 handleSetParentRangeBarAndFinancialValue={this.props.handleSetParentRangeBarAndFinancialValue}
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