import React, { Component } from 'react'
import styled from "styled-components"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import AddItemBox from "../../../UI/AddItemBox/AddItemBox"




export default class RegularIncomeInput extends Component {


    renderRangeBars = (incomeTypeArray) => {
       return incomeTypeArray.map(incomeType => <RangeBar id={incomeType.name}
                                                                 key={incomeType.name}
                                                                 rangeBarProps={incomeType}
                                                                 setIncome={this.props.setIncome}
                                                                 handleChangeLabel = {this.props.handleChangeLabel}
                                                                 handleRemoveItem={this.props.handleRemoveItem}
                                                                 />
                                                                
        )
    }

    render() {

   

        return (

             <RegularIncomeWrapper>

             {this.renderRangeBars(this.props.regularIncomeRangeBarValues)}

            </RegularIncomeWrapper>

        )
    }
}




//-----------------------------------------------STYLES-----------------------------------------------//


const RegularIncomeWrapper = styled.div`
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-left: 2rem;
  margin-top: 2rem;

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 