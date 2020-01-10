import React from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import HeaderValues from "./Containers/HeaderValues"
import ControlPanel from "./Containers/ControlPanel"
import TaxDonutChart  from "./Charts/TaxDonutChart"
import TaxStackedBarChart  from "./Charts/TaxStackedBarChart"
import {setTaxIncome_action} from "../../redux/tax/tax_actions"
import {calculateTaxesByBracket} from "./services/taxCalculations"

const TaxApp = ({setTaxIncome_action, tax_reducer}) => {

  const setIncome = (financialValue, rangeBarValue, {name, section}) => {                                                      //primary setting function, also used by tax credits to set the value in the reducer
        if (section === "credits") {rangeBarValue = (Math.round(rangeBarValue/100)*100)}                                       //rounds the tax credits which are a smaller number than income so require a different rounding technique
        setTaxIncome_action(name, financialValue, rangeBarValue, section)                                                      //fires the action setting the values in the reducer
    }

  const incomeArray = Object.values(tax_reducer.income).map(d => d.financialValue)                                    //Convert the regularIncome values into an array
  const [EI,  SEI,  II , EDI,  NEDI , CG ] =  incomeArray                                                                      //naming all income types, EI = employmentIncome, SEI = selfEmploymentIncome, II = interestIncome,
                                                  
  const regularIncomeRangeBarValues = Object.values(tax_reducer.income).slice(0,3)
  const taxAdvantagedIncomeRangeBarValues = Object.values(tax_reducer.income).slice(3,6)
  const creditsRangeBarValues = Object.values( tax_reducer.credits)

console.log(tax_reducer);
  const beforeTaxIncome = EI + SEI + II + EDI + NEDI + CG                                                                     //Sum all incomeTypes to get before tax income

  const taxStackedData = calculateTaxesByBracket(EI, SEI, CG, EDI, NEDI, creditsRangeBarValues)                                                      //This function breaks down the tax according to its bracket 
  const taxData = taxStackedData[4]                                                                                           //The top bracket contains the sum of all the brackets below enabling us to access the essential data from it
  const federalTaxPayable = taxData.totalFederalTax - taxData.federalTaxCredits             
  const provincialTaxPayable = taxData.totalProvincialTax - taxData.provincialTaxCredits
  const totalCppAndEI = taxData.totalCppAndEI
  const totalCredits = taxData.provincialTaxCredits + taxData.federalTaxCredits
  const totalTaxLiability = federalTaxPayable + provincialTaxPayable  + totalCppAndEI 
  const averageRate = totalTaxLiability/beforeTaxIncome 
  const afterTaxIncome = beforeTaxIncome - totalTaxLiability - totalCredits

  const taxStackedKeys = ["incomeAfterTax", "taxCredits","federalTax", "provincialTax", "cppAndEI",]
  

  const taxDonutChartData = [
    {name: "afterTaxIncome", 
    value: afterTaxIncome
    },
    {name: "taxCredit", 
    value: totalCredits
    },
    {name: "federalTaxPayable", 
    value: federalTaxPayable
    },
    {name: "provincialTaxPayable", 
    value: provincialTaxPayable
    },
    {name: "CPPandEI", 
    value: totalCppAndEI
    }
  ]


   return (
     <UserInterfaceWrapper>
        <HeaderValues
            beforeTaxIncome={beforeTaxIncome}
            federalTaxPayable={federalTaxPayable}
            afterTaxIncome={afterTaxIncome}
            provincialTaxPayable={provincialTaxPayable}
            totalCppAndEI={totalCppAndEI}
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
    tax_reducer: state.tax_reducer
  }
}


export default connect(mapStateToProps, {setTaxIncome_action})(TaxApp)
//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    grid-area: m;
    background: ${props => props.theme.color.ice};
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

