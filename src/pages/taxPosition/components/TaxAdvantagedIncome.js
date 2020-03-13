import React, { Component } from 'react'
import styled from "styled-components"
import RangeBar from "UI/rangeBar/RangeBar"


export default class RegularTaxAdvantagedIncomeInput extends Component {


    renderRangeBars = (incomeTypeArray) => {
       return incomeTypeArray.map(type => <RangeBar id={type.name}
                                                                 key={type.name}
                                                                 rangeBarProps={type}
                                                                 setValue={this.props.setIncome}
                                                                 handleChangeLabel = {this.props.handleChangeLabel}
                                                                 handleRemoveItem={this.props.handleRemoveItem}
                                                                 />
                                                                
        )
    }

    render() {

   

        return (

             <TaxAdvantagedIncomeWrapper>

             {this.renderRangeBars(this.props.taxAdvantagedIncomeRangeBarValues)}


            </TaxAdvantagedIncomeWrapper>

        )
    }
}




//-----------------------------------------------style-----------------------------------------------//


const TaxAdvantagedIncomeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-left: 2rem;
  margin-top: 2rem;

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 