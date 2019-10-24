import React, { Component } from 'react'
import styled from "styled-components"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"

export default class HeaderValues extends Component {
    
    render() {

        const cppIncome = this.props.lifetimeIncomeYearListState[75].incomeType.cppIncome.financialValue
        const oasIncome = this.props.lifetimeIncomeYearListState[75].incomeType.oasIncome.financialValue
        const rrifIncome = this.props.lifetimeIncomeYearListState[75].incomeType.rrifIncome.financialValue
        const totalRetirementIncome = Object.values(this.props.lifetimeIncomeYearListState[75].incomeType).map(d => d.financialValue).reduce((acc, num) => acc + num)
        const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ? calculateMarginalTaxRate(totalRetirementIncome) + 15 : calculateMarginalTaxRate(totalRetirementIncome) || 0

        //Calculate AVERAGE Earnings
        const pensionableEarningsArray = Object.values(this.props.lifetimeIncomeYearListState).map(d => d.adjustedPensionableEarningsMethod())
        const totalAdustedPensionableEarnings = pensionableEarningsArray.reduce((acc, num) => acc + num)
        const averagePensionableEarnings = Number(totalAdustedPensionableEarnings / 47)
        const roundedAveragePensionableEarnings = Math.round(averagePensionableEarnings/1000)*1000


        const shortFall =  totalRetirementIncome - roundedAveragePensionableEarnings

        return (
            <HeaderValuesWrapper>
            <Left>
            
            {
                shortFall <= 0 ?
                <LargeTotal color={"red"}>
                    <Title>
                    Retirement Income Shortfall
                    </Title>
                {`${shortFall/1000}k`}
                </LargeTotal>
                :
                <LargeTotal>
                <Title>
                     Retirement Income Surplus
                    </Title>
                {`${shortFall/1000}k`}
                </LargeTotal>
            }
            
        </Left>
        <Right>
            <Title>Estimated Pension Income</Title>
                <PensionIncomeWrapper>
                        <Summary>
                        {`${(cppIncome)/1000}k`}
                            <span>CPP</span>
                        </Summary>
                        <Summary>
                        {`${(oasIncome)/1000}k`}
                            <span>OAS</span>
                        </Summary>
                        <Summary>
                        {`${(rrifIncome)/1000}k`}
                        <span>RRIF</span>
                        </Summary>
                        <Summary style={{borderLeft: ".2px solid #DCDCDC"}}>
                        {`${retirementTaxRate}%`}
                        <span>Tax Rate</span>
                        </Summary>
                </PensionIncomeWrapper>
                <Summary style={{marginTop: "-4rem", marginLeft: "-7rem"}}>
                 {`${(cppIncome + oasIncome + rrifIncome)/1000}k`}
                <span>Total</span>
              </Summary>
        </Right>
            </HeaderValuesWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const HeaderValuesWrapper = styled.div`
    grid-area: a;
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 4rem;
    color: ${props => props.theme.color.contrastText1};
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const LeftTop = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;

`
const Total = styled.div`
    flex: .6;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -.5rem;
    font-size: ${props => props.theme.fontSize.medium};
    
    font-weight: 300;
`
const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    font-size: ${props => props.theme.fontSize.medium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
    }
    
`
const Hr = styled.hr`
    border-top: ${props => props.theme.border.primary};
    width: 80%;
    margin: 0 auto;
    fill: red;
`


const LeftBottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    color: ${props => props.theme.color.salmon};
    margin-top: -1.5rem;
`
const Vr = styled.div`
    height: 80%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`

const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large2};
    font-weight: 300;
    text-align: center;
    color: ${props => props.color === "red" ? props.theme.color.salmon : props.theme.color.contrastText1}};
   
`
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    font-weight: 300;
   
` 

const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`
