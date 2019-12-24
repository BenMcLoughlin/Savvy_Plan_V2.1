import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import LifetimeIncomeBarChart from "./Charts/LifetimeIncomeBarChart"
import calculateMarginalTaxRate from "../../services/taxCalculationServices/taxCalculator"
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

       
    //    const cppIncome = this.props.incomePerYear_reducer[75].cppIncome.financialValue
    //    const oasIncome = this.props.incomePerYear_reducer[75].oasIncome.financialValue
    //    const rrifIncome = this.props.incomePerYear_reducer[75].rrsp.financialValue
     //  const totalPensionIncome = `${(cppIncome + oasIncome + rrifIncome)/1000}k`
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

        const shortFall =  (totalRetirementIncome - averageWorkingEarnings)/1000                                                         //determine retirement income shortfall to be displayed 


        const {
            cppIncome : {financialValue: cppIncome },                                                                          //Grabs and assigns variable names from reducer
            oasIncome : {financialValue: oasIncome },
            rrsp: {financialValue: rrsp },
            tfsa: {financialValue: tfsa },
            nonRegistered: {financialValue: nonRegistered },
       } = this.props.incomePerYear_reducer[75]            


        return (
            <LifetimeIncomeTileWrapper to="/LifeTimeIncome">
            <Top>
                    <Left>
                    <LargeTotal>
                    <TitleMain>Lifetime Income Streams</TitleMain>
                    {/* {`${(cppIncome + oasIncome + rrsp + tfsa + nonRegistered)/1000}k`} */}
                    </LargeTotal>
                </Left>
                <Right>
                    <Title>Target Retirement Income</Title>
                        <PensionIncomeWrapper>
                        <Summary>
                    {`${(cppIncome)/1000}k`}  
                        <h4>CPP</h4>
                        <Circle color={"#F29278"}/>
                    </Summary>
                    <Summary >
                    {`${(oasIncome)/1000}k`}
                        <h4 >OAS</h4>
                        <Circle color={"#7DA8B8"}/>
                    </Summary>
                    <Vr/>
                    <Summary>
                    {`${(rrsp)/1000}k`}
                    <h4 >RRSP</h4>
                         <Circle color={"#B0CFE3"}/>
                    </Summary>
                    <Summary>
                    {`${tfsa/1000}k`}
                    <h4>TFSA</h4>
                         <Circle color={"#81CCAF"}/>
                    </Summary>
                    {
                        nonRegistered > 1000 ? 
                        <Summary>
                        {`${nonRegistered/1000}k`}
                        <h4>N-Reg</h4>
                             <Circle color={"#B9B0A2"}/>
                      </Summary>
                    : null
                    }
                             </PensionIncomeWrapper>
                    </Right>
            
            </Top>

            <ChartWrapper>
                    <LifetimeIncomeBarChart
                        data={data}
                        stackedKeys={stackedKeys}
                        retirementIncome={20000}
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
  color: ${props => props.theme.color.slate};
  border-radius: 5px;
  border: ${props => props.theme.border.primary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const Top = styled.div`
    display: flex;
    flex: 30%;
    margin-top: 4rem;

`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${props => props.theme.fontSize.medium};
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


`
const ToolTip = styled.div`
    background: red;
    opacity: 0;
`


const TitleMain = styled.div `
    font-size: ${props => props.theme.fontSize.medium};
    text-align: center;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
   
` 
const Title = styled.div `
    font-size: ${props => props.theme.fontSize.smallMedium};
    text-align: center;
    color: ${props => props.theme.color.slate};
    font-weight: 300;
   
` 
const ChartWrapper = styled.div`
    margin-top: -5rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 70%;
    font-size: 1.2rem;
`

const Summary = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize.small};
    align-items: center;
    justify-content: center;
    & h4 {
        font-size: ${props => props.theme.fontSize.smallest};
    }

    
`
const PensionIncomeWrapper = styled.div`
    display: flex;
    width: 60%;
    border-bottom: ${props => props.theme.border.primary};
`

const Circle = styled.div`
   border-radius: 50%;
   height: .7rem;
   width: .7rem;
   margin-top: .5rem;
   background: ${props => props.color}
   display: flex;
   align-items: center;
`
const Vr = styled.div`
    height: 60%;
    width: 1%;
    margin-top: 2rem;
    flex-basis: 0.1;
    flex: 1 0.1 1;
    border-left: ${props => props.theme.border.primary};
`