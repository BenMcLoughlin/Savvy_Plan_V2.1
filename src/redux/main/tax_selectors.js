import {createSelector} from "reselect"
import {} from "services/tax/tax_functions"
import {income_selector} from "redux/main/income_selectors"
import {convertReducerToArray, bracketsToChartData, sum, taxesByBracket, lifetimeTaxes, tax, calculateTaxes, convertTaxDetailsToDisplay, calculateAgeAmount} from "services/tax/tax_functions"

export const main_reducer = state => state.main_reducer
export const selectedCredit = state => state.ui_reducer.stream
const age = state => state.ui_reducer.taxAge ? state.ui_reducer.taxAge : state.user_reducer.currentAge
const currentAge = state => state.user_reducer.currentAge   
const lifeSpan = state => state.user_reducer.lifeSpan 


//DISPLAY SELCTORS
export const tax_selector = createSelector(
    main_reducer,
    income_selector,
    (main_reducer, income_selector) => Object.values({...main_reducer, 30001: calculateAgeAmount(income_selector)}) 
)

export const deduction_selector = createSelector(
     tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.taxType === "deduction" || d.taxType === "rrsp").map(d => d.stream))]
)

export const fixedCredit_selector = createSelector(
    tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.creditType === "fixed" && d.eligible).map(d => d.stream))]
)

export const variableCredit_selector = createSelector(
    tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.creditType === "variable").map(d => d.stream))]
)


//CHART SELECTORS
export const taxCreditBarChartData_selector = createSelector(
    tax_selector,
    selectedCredit,
    (tax_selector, selectedCredit) => convertReducerToArray(selectedCredit, 95, 42, tax_selector)
)

export const taxLifetimeChartData_selector = createSelector(
    currentAge,
    lifeSpan,
    income_selector,
    main_reducer,
    (currentAge,lifeSpan,income_selector, main_reducer) => lifetimeTaxes(currentAge,lifeSpan,income_selector, main_reducer)
)                                                                

//TOTAL TAXABLE INCOME
export const taxableIncome_selector = createSelector(  
    income_selector, 
    age,
    (income_selector, age) => sum(age, "taxable", true, income_selector)
)  

export const taxDetails_selector = createSelector( 
      age,
      income_selector,
      tax_selector,
      (age,income_selector, tax_selector) => calculateTaxes(age, income_selector, tax_selector)
)  

export const taxDisplayDetails_selector = createSelector( 
    taxDetails_selector,
    (taxDetails_selector) => convertTaxDetailsToDisplay(taxDetails_selector)
)  

//IMPORTANT VALUES
export const rrspSavings_selector = createSelector( 
    taxLifetimeChartData_selector,
    (taxLifetimeChartData_selector) => taxLifetimeChartData_selector.reduce((acc, num) => (acc + num.rrspTaxSavings), 0)
)  

export const rrspCost_selector = createSelector( 
    taxLifetimeChartData_selector,
    (taxLifetimeChartData_selector) => taxLifetimeChartData_selector.reduce((acc, num) => (acc + num.RRSPextraTaxes), 0)
)  

//TOTAL DEDUCTIONS


//TOTAL FEDERAL CREDITS


//TOTAL PROVINCIAL CREDITS


//AFTER TAX INCOME


//CHART TAX PRESENTATION
export const taxesByBracket_selector = createSelector( //returns the total amount of income the user has earned during that year that will be taxed
    age,
    taxableIncome_selector, 
    (age, taxableIncome_selector) => taxesByBracket(age, taxableIncome_selector)
)   

export const taxesBracketChartData_selector = createSelector( //returns the total amount of income the user has earned during that year that will be taxed
    taxesByBracket_selector, 
    (taxesByBracket_selector) => bracketsToChartData(taxesByBracket_selector)
)   
