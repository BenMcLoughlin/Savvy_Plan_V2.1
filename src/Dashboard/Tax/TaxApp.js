import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import HeaderValues from "./Containers/HeaderValues"
import ControlPanel from "./Containers/ControlPanel"
import TaxDonutChart  from "./Charts/TaxDonutChart"
import TaxStackedBarChart  from "./Charts/TaxStackedBarChart"
import {setTaxIncome_action} from "./actions"
import {calculateTaxesByBracket} from "./services/taxCalculations"

const TaxApp = ({setTaxIncome_action, taxVariables_reducer}) => {

  const setIncome = (financialValue, rangeBarValue, {name, section}) => {    
      if (section === "credits") {rangeBarValue = (Math.round(rangeBarValue/100)*100)}
      setTaxIncome_action(name, financialValue, rangeBarValue, section)
console.log(section);
  }

  const incomeArray = Object.values(taxVariables_reducer.income).map(d => d.financialValue)                                 //Convert the regularIncome values into an array
  const [EI,  SEI,  II , EDI,  NEDI , CG ] =  incomeArray                                                                          //naming all income types, EI = employmentIncome, SEI = selfEmploymentIncome, II = interestIncome,
                                                                                                                                          //EDI = eligibleDividedIncome, NEDI = nonEligibleDividendIncome, CG = CapitalGains

  const regularIncomeRangeBarValues = Object.values(taxVariables_reducer.income).slice(0,3)
  const taxAdvantagedIncomeRangeBarValues = Object.values(taxVariables_reducer.income).slice(3,6)
  const creditsRangeBarValues = Object.values( taxVariables_reducer.credits)


  const beforeTaxIncome = EI + SEI + II + EDI + NEDI + CG 

  const taxStackedData = calculateTaxesByBracket(EI, SEI, CG, EDI, NEDI)
  const federalTaxPayable = taxStackedData[4].totalFederalTax - taxStackedData[4].federalTaxCredits
  const provincialTaxPayable = taxStackedData[4].totalProvincialTax
  const CPPandEI = taxStackedData[4].cppAndEI
  const totalTaxLiability = federalTaxPayable + provincialTaxPayable  + CPPandEI 
  const averageRate = totalTaxLiability/beforeTaxIncome 

console.log(taxVariables_reducer);
  const taxStackedKeys = ["incomeAfterTax", "taxCredits","federalTax", "provincialTax", "cppAndEI",]
  
  const taxesByBracket = taxStackedData
  const totalFederalTax = Object.values(taxesByBracket.map(d => d.federalTax)).reduce((acc,num) => acc + num)
  const totalProvincialTax = Object.values(taxesByBracket.map(d => d.provincialTax)).reduce((acc,num) => acc + num)
  const totalCppAndEI = Object.values(taxesByBracket.map(d => d.cppAndEI)).reduce((acc,num) => acc + num)
  const totalCredits = Object.values(taxesByBracket.map(d => d.taxCredits)).reduce((acc,num) => acc + num)
  const afterTaxIncome = Object.values(taxesByBracket.map(d => d.incomeAfterTax)).reduce((acc,num) => acc + num)

  const taxDonutChartData = [
    {name: "afterTaxIncome", 
    value: afterTaxIncome
    },
    {name: "taxCredit", 
    value: totalCredits
    },
    {name: "federalTaxPayable", 
    value: totalFederalTax
    },
    {name: "provincialTaxPayable", 
    value: totalProvincialTax
    },
    {name: "CPPandEI", 
    value: totalCppAndEI
    }
  ]

  console.log(taxVariables_reducer);
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
           setIncome={setIncome}
        />
     </UserInterfaceWrapper>
    )
}

const mapStateToProps = (state) => {

  return {
    taxVariables_reducer: state.taxVariables_reducer
  }
}


export default connect(mapStateToProps, {setTaxIncome_action})(TaxApp)
//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.background2};
    display: grid;
    height: 100%;
    grid-template-rows: minmax(8rem, 10rem) minmax(24rem, 26rem);
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
    'a a a a a a a b b b b b'
    'a a a a a a a c c c c c'
    'd d d d d d d d d d d d'
`
const StackedBarChartPlaceHolder = styled.div`
    grid-area: a;
    width: 100%;
    height: 100%;  
`
const DonutChartPlaceHolder = styled.div`
    grid-area: c;
    width: 100%;
    height: 100%;
    

`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate

