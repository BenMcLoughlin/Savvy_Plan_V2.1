import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChart from "../../LifetimeIncome/Chart/StackedBarChart"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"
import { NavLink} from "react-router-dom"

 class LifetimeIncomeTile extends Component {
     
    render() {

        const data = Object.values(this.props.lifetimeIncomeYearList).map(d => {
            const incomeTypeArray = Object.keys(d.incomeType)
            const financialValueArray = Object.keys(d.incomeType).map(income => d.incomeType[income].financialValue)
            var result = {age: d.age};
            incomeTypeArray.forEach((key, i) => result[key] = financialValueArray[i]);          
          return result
        })
     
       const stackedKeys = Object.keys(this.props.lifetimeIncomeYearList[18].incomeType)
       
       const cppIncome = this.props.lifetimeIncomeYearList[75].incomeType.cppIncome.financialValue
       const oasIncome = this.props.lifetimeIncomeYearList[75].incomeType.oasIncome.financialValue
       const rrifIncome = this.props.lifetimeIncomeYearList[75].incomeType.rrifIncome.financialValue
       const totalPensionIncome = `${(cppIncome + oasIncome + rrifIncome)/1000}k`
       const totalRrifIncome = `${(rrifIncome)/1000}k`
       const totalRetirementIncome = Object.values(this.props.lifetimeIncomeYearList[75].incomeType).map(d => d.financialValue).reduce((acc, num) => acc + num)
       const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ? calculateMarginalTaxRate(totalRetirementIncome) + 15 : calculateMarginalTaxRate(totalRetirementIncome) || 0

       //Calculate AVERAGE Earnings
       const pensionableEarningsArray = Object.values(this.props.lifetimeIncomeYearList).map(d => d.adjustedPensionableEarningsMethod())
       const totalAdustedPensionableEarnings = pensionableEarningsArray.reduce((acc, num) => acc + num)
       const averagePensionableEarnings = Number(totalAdustedPensionableEarnings / 47)
       const roundedAveragePensionableEarnings = Math.round(averagePensionableEarnings/1000)*1000
       const shortFall = `${(roundedAveragePensionableEarnings - totalRetirementIncome)/1000}k`


        return (
            <LifetimeIncomeTileWrapper to="/LifeTimeIncome">
            <Top>
                    <Left>
                    <LargeTotal>
                    <Title>Retirement Income Shortfall</Title>
                    {shortFall}
                    <ToolTip>This is the tool Til</ToolTip> 
                    </LargeTotal>
                </Left>
                <Right>
                    <Title>Estimated Pension Income</Title>
                        <PensionIncomeWrapper>
                                <Summary>
                                   {`${cppIncome/1000} k`}
                                    <span>CPP</span>
                                </Summary>
                                <Summary>
                                {`${oasIncome/1000} k`}
                                    <span>OAS</span>
                                </Summary>
                                <Summary>
                                {`${rrifIncome/1000} k`}
                                <span>RRIF</span>
                                </Summary>
                                <Summary style={{borderLeft: ".2px solid #DCDCDC"}}>
                                {`${retirementTaxRate}%`}
                                <span>Tax Rate</span>
                                </Summary>
                        </PensionIncomeWrapper>
                        <Summary>
                        {totalPensionIncome}
                        <span>Total</span>
                      </Summary>
                </Right>
            
            </Top>

            <ChartWrapper>
                    <StackedBarChart 
                        data={data}
                        stackedKeys={stackedKeys}
            />
            </ChartWrapper>
            </LifetimeIncomeTileWrapper>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        lifetimeIncomeVariableState: state.lifetimeIncomeVariableState,
        lifetimeIncomeYearList: state.lifetimeIncomeYearList
    }
}

export default connect(mapStateToProps)(LifetimeIncomeTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const LifetimeIncomeTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: e;
  color: ${props => props.theme.color.contrastText1};
  border-left: ${props => props.theme.border.primary};
  border-bottom: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
    display: flex;
    flex: 30%;
    margin-top: 4rem;

`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Right = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
`
const LargeTotal = styled.div`
    font-size: ${props => props.theme.fontSize.large};
    font-weight: 300;
    text-align: center;
    color: ${props => props.theme.color.salmon};
    &:hover &:ToolTip {
       
            opacity: 1
        
    }

`
const ToolTip = styled.div`
    background: red;
    opacity: 0;
`


const Title = styled.div `
    font-size: ${props => props.theme.fontSize.smallMedium};
    text-align: center;
    color: ${props => props.theme.color.contrastText1};
    font-weight: 300;
   
` 
const ChartWrapper = styled.div`
    margin-top: -8rem;
    width: 100%;
    height: 100%;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
    font-size: ${props => props.theme.fontSize.smallMedium};
    span {
        font-size: ${props => props.theme.fontSize.small};
        font-style: italic;
        text-align: center;
    }
    
`
const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`

const TotalIncome = styled.div`

`