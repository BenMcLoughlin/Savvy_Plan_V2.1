import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import HeaderValues from "./Containers/HeaderValues"
import ControlPanel from "./Containers/ControlPanel"
import TaxDonutChart  from "./Charts/TaxDonutChart"
import TaxStackedBarChart  from "./Charts/TaxStackedBarChart"
import {setIncomeForTaxCalculator} from "./actions"
import {CRAFactors, provincialTaxRates, federalTaxRates} from "./services/TaxRateData"
import {calculateFederalTaxes, calculateProvincialTaxes, calculateCPPandEI, calculateTaxesByBracket} from "./services/CRATaxCalculations"

class TaxApp extends Component {

  handleSetParentRangeBarAndFinancialValue = (name, financialValue, rangeBarValue, rangeBarProps) => {
        
  this.props.setIncomeForTaxCalculator(name, financialValue, rangeBarValue, rangeBarProps.section)
  this.setState({
    [name]: financialValue
  })
}
  render() {
  
    const regularIncomeRangeBarValues = Object.values(this.props.taxVariables.regularIncome)
    const taxAdvantagedIncomeRangeBarValues = Object.values(this.props.taxVariables.taxAdvantagedIncome)
    const creditsRangeBarValues = Object.values(this.props.taxVariables.credits)
    const EI = this.props.taxVariables.regularIncome.employmentIncome.financialValue 
    const SEI = this.props.taxVariables.regularIncome.selfEmploymentIncome.financialValue
    const II = this.props.taxVariables.regularIncome.interestIncome.financialValue
    const RI = this.props.taxVariables.regularIncome.rentalIncome.financialValue
    const EDI = this.props.taxVariables.taxAdvantagedIncome.eligibleDividends.financialValue
    const NEDI = this.props.taxVariables.taxAdvantagedIncome.nonEligibleDividends.financialValue
    const CG = this.props.taxVariables.taxAdvantagedIncome.capitalGains.financialValue

    const beforeTaxIncome = EI + SEI + II + EDI + NEDI + CG + RI



    const taxStackedData = calculateTaxesByBracket(EI, SEI, CG)
    const federalTaxPayable = taxStackedData[4].totalFederalTax
    const provincialTaxPayable = taxStackedData[4].totalProvincialTax
    const CPPandEI = taxStackedData[4].cppAndEI
    const totalCredits = taxStackedData[0].taxCredits
    const totalTaxLiability = federalTaxPayable + provincialTaxPayable  + CPPandEI 

    const afterTaxIncome = beforeTaxIncome - totalTaxLiability 
    const averageRate = totalTaxLiability/beforeTaxIncome 


    const taxStackedKeys = ["incomeAfterTax", "taxCredits","federalTax", "provincialTax", "cppAndEI",]


    const taxDonutChartData = [
      {name: "afterTaxIncome", 
      value: afterTaxIncome
      },
      {name: "federalTaxPayable", 
      value: federalTaxPayable
      },
      {name: "totalCredits", 
      value: totalCredits
      },
      {name: "provincialTaxPayable", 
      value: provincialTaxPayable
      },
      {name: "CPPandEI", 
      value: CPPandEI
      }
    ]

     return (
       <UserInterfaceWrapper>
          <HeaderValues
              beforeTaxIncome={beforeTaxIncome}
              federalTaxPayable={federalTaxPayable}
              afterTaxIncome={afterTaxIncome}
              provincialTaxPayable={provincialTaxPayable}
              CPPandEI={CPPandEI}
              totalTaxLiability={totalTaxLiability }
              marginalRate={44}
              averageRate={(averageRate * 100).toFixed(2)}
          />
          <DonutChartPlaceHolder>
             <TaxDonutChart
               taxDonutChartData={taxDonutChartData}
             />
          </DonutChartPlaceHolder>
          <StackedBarChartPlaceHolder>
             <TaxStackedBarChart 
               taxStackedData={taxStackedData}
               taxStackedKeys={taxStackedKeys}
             />
          </StackedBarChartPlaceHolder>
          
          <ControlPanel
             regularIncomeRangeBarValues={regularIncomeRangeBarValues}
             taxAdvantagedIncomeRangeBarValues={taxAdvantagedIncomeRangeBarValues}
             creditsRangeBarValues={creditsRangeBarValues}
             handleSetParentRangeBarAndFinancialValue={this.handleSetParentRangeBarAndFinancialValue}
          />
       </UserInterfaceWrapper>
      )
  }
}


const mapStateToProps = (state) => {

  return {
    taxVariables: state.taxVariables
  }
}


export default connect(mapStateToProps, {setIncomeForTaxCalculator})(TaxApp)
//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.background2};
    display: grid;
    height: 100%;
    grid-template-rows: minmax(12rem, 20rem) minmax(22rem, 25rem);
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
    'a a a a a c c c c c c c'
    'b b b b b c c c c c c c'
    'd d d d d d d d d d d d'
`
const DonutChartPlaceHolder = styled.div`
    grid-area: b;
    width: 100%;
    height: 80%;
    margin-top: -1rem;
    

`
const StackedBarChartPlaceHolder = styled.div`
    grid-area: c;
    width: 100%;
    height: 100%;  
`

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate