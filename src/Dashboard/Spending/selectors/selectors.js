import {createSelector} from "reselect"


const incomePerYearSelector = state => state.incomePerYear
const keyVariablesSelector = state => state.keyVariables

 const addAgeToIncome = (incomePerYearSelector, keyVariablesSelector) => {
    
    const income = incomePerYearSelector[18].employmentIncome.financialValue
    const age = keyVariablesSelector.fromAge
    const total = +income + +age
     return income + age
}

export default createSelector(incomePerYearSelector, keyVariablesSelector, addAgeToIncome)