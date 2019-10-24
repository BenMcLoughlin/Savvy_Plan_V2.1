
import styled from "styled-components"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import MiniRangeBar from "../../../UI/MiniRangeBar/MiniRangeBar"
import {calculateFutureValue, calculateRRIFPaymentTable} from "../../../services/financialFunctions"

import React, { Component } from 'react'

export default class RRSPDetails extends Component {

        handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
            
            this.props.handleSetRRSPDetails(name, financialValue, rangeBarValue,)

            const rrspReturn = this.props.lifetimeIncomeVariableState.rrspDetails.estimatedReturn.rangeBarValue
            const rrspPresentValue = this.props.lifetimeIncomeVariableState.rrspDetails.rrspValue.financialValue
            const rrspNumberOfPeriods = this.props.lifetimeIncomeVariableState.rrspDetails.widthdrawalStartAge.rangeBarValue - 30
            const rrspPayment = this.props.lifetimeIncomeVariableState.rrspDetails.rrspContributions.financialValue
        
            const futureRRSPValue = calculateFutureValue(rrspReturn, rrspNumberOfPeriods ,rrspPayment,rrspPresentValue)

            this.props.setFutureRRSPValue(futureRRSPValue)

            const startAge = this.props.lifetimeIncomeVariableState.rrspDetails.widthdrawalStartAge.rangeBarValue

            const RRIFPaymentTable = calculateRRIFPaymentTable(65, futureRRSPValue, 0.03)
        
            let position = 0
            for (let i = startAge; i < 95; i++) {
                position++
                this.props.setIncome(i, "rrifIncome", RRIFPaymentTable[position].withdrawal, 0, false)
            }
            for (let i = 50; i < startAge; i++) {
                this.props.setIncome(i, "rrifIncome", 0, 0, false)
            }

        }


        handleChangeLabel = (e, rangeBarProps) => null

        handleRemoveItem = (rangeBarProps) => null

        addItemToList = (newItem, listNewItemWillBeAddedToo) =>  null
    
    rrspDetailsRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(0,2)
       
        
    renderRangeBars = (rangeBarPropsArray) => {
        return rangeBarPropsArray.map(propsObject => <RangeBar id={propsObject.name}
                                                                 key={propsObject.name}
                                                                  handleSetParentRangeBarAndFinancialValue={this.handleSetParentRangeBarAndFinancialValue}
                                                                  rangeBarProps={propsObject}
                                                                  handleChangeLabel = {this.handleChangeLabel}
                                                                  handleRemoveItem={this.handleRemoveItem}
                                                                  />
                                                                 
         )
     }

  
    render() {

        return (
            <RRSPDetailsWrapper>

     
            <RangeBarWrapper>
            {this.renderRangeBars(this.props.rrspDetailsRangeBarArray)}     
            </RangeBarWrapper>
              


             
        </RRSPDetailsWrapper>        )
    }
}



//-----------------------------------------------STYLES-----------------------------------------------//


const RRSPDetailsWrapper = styled.div`


`
const MiniRangeBarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: -3rem;
`
const RangeBarWrapper = styled.div`
    overflow: hidden;
    position: relative;
    text-align: center;
    margin-left: 2rem;
    margin-top: 2rem;
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 