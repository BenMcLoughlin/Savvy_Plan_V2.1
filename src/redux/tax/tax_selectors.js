import {createSelector} from "reselect"
import {} from "services/tax/tax_functions"
import {income_selectorWithRRSP} from "redux/income/income_selectors"
import {convertReducerToArray, bracketsToChartData, sum, taxesByBracket, lifetimeTaxes, tax, calculateTaxes, convertTaxDetailsToDisplay} from "services/tax/tax_functions"
Array.prototype.filterAll = function(name, ...args) {return args.map(arg => this.filter( d => d[name] === arg))[0]};



export const tax_reducer = state => state.tax_reducer
export const income_reducer = state => state.income_reducer
//export const income_selectorWithRRSP = state => Object.values(state.income_reducer)
export const tax_selector = state => Object.values(state.tax_reducer)
export const selectedCredit = state => state.ui_reducer.credit
const age = state => state.ui_reducer.taxAge   
const currentAge = state => state.user_reducer.currentAge   
const lifeSpan = state => state.user_reducer.lifeSpan 



//DISPLAY SELCTORS
export const deduction_selector = createSelector(
     tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.type === "deduction").map(d => d.stream))]
)

export const fixedCredit_selector = createSelector(
    tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.type === "fixed").map(d => d.stream))]
)

export const variableCredit_selector = createSelector(
    tax_selector,
    (tax_selector) => [...new Set(tax_selector.filter(d => d.type === "variable").map(d => d.stream))]
)

//CHART SELECTORS
export const taxCreditBarChartData_selector = createSelector(
    tax_reducer,
    selectedCredit,
    (tax_reducer, selectedCredit) => convertReducerToArray(selectedCredit, 95, 42, tax_reducer)
)

export const taxLifetimeChartData_selector = createSelector(
    currentAge,
    lifeSpan,
    income_selectorWithRRSP,
    tax_reducer,
    (currentAge,lifeSpan,income_selectorWithRRSP, tax_reducer) => lifetimeTaxes(currentAge,lifeSpan,income_selectorWithRRSP, tax_reducer)
)                                                                


//TOTAL TAXABLE INCOME
export const taxableIncome_selector = createSelector(  
    income_selectorWithRRSP, 
    age,
    (income_selectorWithRRSP, age) => sum(age, "taxable", true, income_selectorWithRRSP)
)  

export const nonTaxableIncome_selector = createSelector( 
    income_selectorWithRRSP, 
    age,
    (income_selectorWithRRSP, age) => sum(age, "taxable", false, income_selectorWithRRSP)
)  

export const deductions_selector = createSelector( 
    tax_selector, 
    age,
    (tax_selector, age) =>  sum(age, "type", "deduction", tax_selector)
)  

export const credit_selector = createSelector( 
    tax_selector, 
    age,
    (tax_selector, age) => (sum(age, "type",  "fixed", tax_selector) + sum(age, "type",  "variable", tax_selector))
)  

export const fedTax_selector = createSelector( 
    taxableIncome_selector,
    (taxableIncome_selector) => tax(taxableIncome_selector, "fed")
)  

export const provTax_selector = createSelector( 
    taxableIncome_selector,
    (taxableIncome_selector) => tax(taxableIncome_selector, "prov")
)  

export const taxDetails_selector = createSelector( 
      age,
      income_selectorWithRRSP,
      tax_selector,
      (age,income_selectorWithRRSP, tax_selector) => calculateTaxes(age, income_selectorWithRRSP, tax_selector)
)  

export const taxDisplayDetails_selector = createSelector( 
    taxDetails_selector,
    (taxDetails_selector) => convertTaxDetailsToDisplay(taxDetails_selector)
)  


//TOTAL DEDUCTIONS


//TOTAL FEDERAL CREDITS


//TOTAL PROVINCIAL CREDITS


//AFTER TAX INCOME


//CHART TAX PRESENTATION
export const taxesByBracket_selector = createSelector( //returns the total amount of income the user has earned during that year that will be taxed
    taxableIncome_selector, 
    (taxableIncome_selector, age) => taxesByBracket(taxableIncome_selector)
)   

export const taxesBracketChartData_selector = createSelector( //returns the total amount of income the user has earned during that year that will be taxed
    taxesByBracket_selector, 
    (taxesByBracket_selector) => bracketsToChartData(taxesByBracket_selector)
)   
