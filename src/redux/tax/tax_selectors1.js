import {createSelector} from "reselect"
import {} from "services/tax/tax_functions"
import {income_selector} from "redux/income/income_selectors"

export const tax_reducer = state => state.tax_reducer
export const tax_selector = state => Object.values(state.tax_reducer)
const taxAge = state => state.user_reducer.taxAge   


//TOTAL TAXABLE INCOME
export const totalIncome_selector = createSelector( //returns the total amount of income the user has earned during that year that will be taxed
    income_selector, 
    (income_selector) => income_selector
)            

//TOTAL DEDUCTIONS


//TOTAL FEDERAL CREDITS


//TOTAL PROVINCIAL CREDITS


//AFTER TAX INCOME


//CHART TAX PRESENTATION