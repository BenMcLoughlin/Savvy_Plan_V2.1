
import styled from "styled-components"
import RangeBar from "../../../UI/RangeBar/RangeBar"
import {calculateFutureValue, calculateRRIFPaymentTable, abbreviateNum} from "../../../services/financialFunctions"

import React, { Component } from 'react'

export default class RRSPDetails extends Component {

        setRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
            
            this.props.handleSetRRSPDetails(name, financialValue, rangeBarValue,)

            const rrspReturn = this.props.lifetimeIncomeVariableState.rrspDetails.estimatedReturn.rangeBarValue
            const rrspPresentValue = this.props.lifetimeIncomeVariableState.rrspDetails.rrspValue.financialValue
            const rrspNumberOfPeriods = this.props.lifetimeIncomeVariableState.rrspDetails.withdrawalStartAge.rangeBarValue - 30
            const rrspPayment = this.props.lifetimeIncomeVariableState.rrspDetails.rrspContributions.financialValue
        
            const futureRRSPValue = calculateFutureValue(rrspReturn, rrspNumberOfPeriods ,rrspPayment,rrspPresentValue)

            const startAge = this.props.lifetimeIncomeVariableState.rrspDetails.withdrawalStartAge.rangeBarValue

            const RRIFPaymentTable = calculateRRIFPaymentTable(startAge, futureRRSPValue, 0.03)
        
            let position = 0
            for (let i = startAge; i < 95; i++) {
                position++
                const withdrawal = RRIFPaymentTable[position].withdrawal
                this.props.setIncome(i, "rrifIncome", withdrawal, 0, false)
            }
            for (let i = 50; i < startAge; i++) {
                this.props.setIncome(i, "rrifIncome", 0, 0, false)
            }
            this.props.setFutureRRSPValue()

        }


        handleChangeLabel = (e, rangeBarProps) => null

        handleRemoveItem = (rangeBarProps) => null

        addItemToList = (newItem, listNewItemWillBeAddedToo) =>  null
    
    rrspDetailsRangeBarArray = Object.values(this.props.lifetimeIncomeVariableState.rrspDetails).slice(0,2)
       
        
    renderRangeBars = (rangeBarPropsArray) => {
        return rangeBarPropsArray.map(propsObject => <RangeBar id={propsObject.name}
                                                                 key={propsObject.name}
                                                                  setRangeBarAndFinancialValue={this.setRangeBarAndFinancialValue}
                                                                  rangeBarProps={propsObject}
                                                                  handleChangeLabel = {this.handleChangeLabel}
                                                                  handleRemoveItem={this.handleRemoveItem}
                                                                  />
                                                                 
         )
     }

  
    render() {

        const rrspFutureValue = this.props.lifetimeIncomeVariableState.futureRRSPValue
        const futureYear = this.props.lifetimeIncomeVariableState.birthYear + this.props.lifetimeIncomeVariableState.rrspDetails.withdrawalStartAge.rangeBarValue
        return (
            <RRSPDetailsWrapper>

     
            <RangeBarWrapper>
            {this.renderRangeBars(this.props.rrspDetailsRangeBarArray)}     
            </RangeBarWrapper>
            <Summary>
            { abbreviateNum(rrspFutureValue, 2) }
            <span>{`Year:${futureYear} `}</span>
            </Summary>


             
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
const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 18rem;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    font-size: ${props => props.theme.fontSize.medium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
        text-align: center;
    }
    
`
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 