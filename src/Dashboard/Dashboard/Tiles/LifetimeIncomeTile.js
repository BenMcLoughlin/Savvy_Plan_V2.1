import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import StackedBarChart from "../../LifetimeIncome/Charts/StackedBarChart"
import calculateMarginalTaxRate from "../../../services/taxCalculationServices/taxCalculator"
import { NavLink} from "react-router-dom"

 class LifetimeIncomeTile extends Component {
     
    render() {

//DATA CONVERSTION FOR STACKED BAR CHART
const data = Object.values(this.props.incomePerYear_reducer).map(d => {                                                                     //the year list needs to be converted to an array so the chart can render the data
    const incomeNamesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
    const financialValueArray = Object.values(d).map(a => a.financialValue)                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
    var result = {age: d.cppIncome.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
    incomeNamesArray.forEach((key, i) => result[key] = financialValueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
    return result
})
       
      const stackedKeys = Object.keys(this.props.incomePerYear_reducer[18])                                                                            //creates a an array of each of the income type names, which is used in the stacked Income chart

       
       const cppIncome = this.props.incomePerYear_reducer[75].cppIncome.financialValue
       const oasIncome = this.props.incomePerYear_reducer[75].oasIncome.financialValue
       const rrifIncome = this.props.incomePerYear_reducer[75].rrifIncome.financialValue
       const totalPensionIncome = `${(cppIncome + oasIncome + rrifIncome)/1000}k`
      // const totalRrifIncome = `${(rrifIncome)/1000}k`
       const totalRetirementIncome = Object.values(this.props.incomePerYear_reducer[75])                                        //Determines total income in retirement
                                        .map(d => d.financialValue)
                                        .reduce((acc, num) => acc + num)
       const retirementTaxRate = totalRetirementIncome > 72000 && totalRetirementIncome < 122000 ? calculateMarginalTaxRate(totalRetirementIncome) + 15 : calculateMarginalTaxRate(totalRetirementIncome) || 0

       //Calculate AVERAGE Earnings


        const workingLifetimeEarnings = Object.values(this.props.incomePerYear_reducer)                                          // turn object into array
        .map(d => Object.values(d)
            .map(a => a.financialValue)                                                     // make sub arrays just show financial value
            .reduce((acc, num) => acc + num))                                               // sum the earned value for each year. 
        .slice(0,47)                                                                     // Grab Only working years 
        .reduce((acc, num) => acc + num)                                                 // determine sum total of working years income

        const averageWorkingEarnings = Math.round((workingLifetimeEarnings/47)/1000)*1000                                        //calculate average working annual income, then round

        const shortFall =  totalRetirementIncome - averageWorkingEarnings                                                         //determine retirement income shortfall to be displayed 


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
        incomePerYear_reducer: state.incomePerYear_reducer
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
    margin-left: 2rem;
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

