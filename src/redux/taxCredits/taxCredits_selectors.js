
import {createSelector} from "reselect"
import {incomeBreakdown, calculateTaxesByBracket, convertTaxesToSunburstChart_function, preTaxDonutChart_function, convertReducerToArray, convertForBracketsChart} from "services/tax/tax_functions"
import {income_selector} from "redux/income/income_selectors"

export const taxCredits_reducer = state => state.taxCredits_reducer
export const taxCredits_selector = state => Object.values(state.taxCredits_reducer)
export const selectedCredit = state => state.taxCredits_reducer.selectedCredit
const taxAge = state => state.user_reducer.taxAge   



export const deduction_selector = createSelector(
    taxCredits_selector,
    (taxCredits_selector) => taxCredits_selector.filter(d => d.type === "deduction")
)
export const credit_selector = createSelector(
    taxCredits_selector,
    (taxCredits_selector) => taxCredits_selector.filter(d => d.type === "credit")
)
export const ageCredit_selector = createSelector(
    taxCredits_selector,
    (taxCredits_selector) => taxCredits_selector.filter(d => d.type === "ageCredit")
)

export const incomeBySource_selector = createSelector(
    income_selector,
    taxAge,
    (income_selector,  taxAge) => incomeBreakdown(income_selector, taxAge)
) 

export const taxBrackets_selector = createSelector(
    incomeBySource_selector,
    taxCredits_reducer,
    (incomeBySource_selector, taxCredits_reducer) => calculateTaxesByBracket(incomeBySource_selector, taxCredits_reducer)
)

export const taxBracketsChartData_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => convertForBracketsChart(taxBrackets_selector)
)

export const finalTaxPosition_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => taxBrackets_selector[4]
)

export const preCreditSunburstData_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => convertTaxesToSunburstChart_function(taxBrackets_selector[4])
)
export const postCreditSunburstData_selector = createSelector(
    taxBrackets_selector,
    (taxBrackets_selector) => convertTaxesToSunburstChart_function(taxBrackets_selector[4], true)
)

export const taxCreditBarChartData_selector = createSelector(
    taxCredits_reducer,
    selectedCredit,
    (taxCredits_reducer, selectedCredit) => convertReducerToArray(selectedCredit, 95, 42, taxCredits_reducer)
)

