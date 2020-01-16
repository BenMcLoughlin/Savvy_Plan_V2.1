import React from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import {calculateTaxesByBracket} from "services/tax/taxCalculations"
import TaxDonutChartTile from "charts/tax/TaxDonutChartTile"
import { NavLink} from "react-router-dom"


const TaxTile = ({tax_reducer}) => {


    
  const incomeArray = Object.values(tax_reducer.income).map(d => d.financialValue)                                    //Convert the regularIncome values into an array
  const [EI,  SEI,  II , EDI,  NEDI , CG ] =  incomeArray                                                                      //naming all income types, EI = employmentIncome, SEI = selfEmploymentIncome, II = interestIncome,
                                                  
  const creditsRangeBarValues = Object.values( tax_reducer.credits)

  const beforeTaxIncome = EI + SEI + II + EDI + NEDI + CG                                                                     //Sum all incomeTypes to get before tax income

  const taxStackedData = calculateTaxesByBracket(EI, SEI, CG, EDI, NEDI, creditsRangeBarValues)                                                      //This function breaks down the tax according to its bracket 
  const taxData = taxStackedData[4]                                                                                           //The top bracket contains the sum of all the brackets below enabling us to access the essential data from it
  const federalTaxPayable = taxData.totalFederalTax - taxData.federalTaxCredits             
  const provincialTaxPayable = taxData.totalProvincialTax - taxData.provincialTaxCredits
  const totalCppAndEI = taxData.totalCppAndEI
  const totalCredits = taxData.provincialTaxCredits + taxData.federalTaxCredits
  const totalTaxLiability = federalTaxPayable + provincialTaxPayable  + totalCppAndEI 
  const afterTaxIncome = beforeTaxIncome - totalTaxLiability - totalCredits

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
        <TaxTileTileWrapper to="/Tax">
            <StackedBarChartPlaceHolder>
            <TaxDonutChartTile
                taxDonutChartData={taxDonutChartData}
            />
            </StackedBarChartPlaceHolder>
        </TaxTileTileWrapper>
    )
}

const mapStateToProps = (state) => {

    return {
      tax_reducer: state.tax_reducer
    }
  }
export default connect(mapStateToProps)(TaxTile)

//-----------------------------------------------STYLES-----------------------------------------------//

const TaxTileTileWrapper = styled(NavLink)`
  text-decoration: none;
  grid-area: b;
  position: relative;
  width: 100%;
  height: 100%;  
  border-radius: 5px;
  z-index: 1;
  border: ${props => props.theme.border.primary};
  transition: all .2s ease-in-out;
  background: ${props => props.theme.color.ice};
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 3px 3px 2px rgba(219,206,219,0.33);
  }
`

const StackedBarChartPlaceHolder = styled.div`
    z-index: 100;
    width: 100%;
    height: 100%;  
`

