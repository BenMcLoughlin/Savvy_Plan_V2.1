import {createSelector} from "reselect"
import {calculateCpp, calculateOAS} from "services/income/cpp_functions"
import {convertReducerToArray } from "services/income/income_functions"
import {addMinWithdrawalsToIncome } from "services/savings/savings_functions"
import {rrspProjection_selector} from "redux/savings/savings_selectors"

const income_reducer = state => state.income_reducer                                                             //this is the reducer, in object form, pulled from state
const savings_reducer = state => state.savings_reducer                                                             //this is the reducer, in object form, pulled from state
const thisYear = new Date()
const birthYear = state => state.user_reducer.birthYear
const lifeSpan = state => state.user_reducer.lifeSpan

const cppStartAge = state => state.pensionStartAges_reducer.cppStartAge.rangeBarValue
const oasStartAge = state => state.pensionStartAges_reducer.oasStartAge.rangeBarValue



export const cpp_selector = createSelector(                                                                      //Determines the CPP payment for the user
    income_reducer,
    birthYear,
    cppStartAge,
    lifeSpan,
    (income_reducer, birthYear, cppStartAge, lifeSpan) => calculateCpp(income_reducer, 18, birthYear, "banana", cppStartAge, 57400, lifeSpan)                                       
)

export const oas_selector = createSelector(                                                                      //Determines the OAS payment for the user
    oasStartAge,
    lifeSpan,
    (oasStartAge, lifeSpan) => calculateOAS(oasStartAge, lifeSpan)                                             
)

export const tfsa_selector = createSelector(                                                                      //Determines the OAS payment for the user
    savings_reducer,
    (savings_reducer) => Object.values(savings_reducer).filter(d => d.transaction === "withdrawal")[0]                                       
)

export const income_selector = createSelector(                                                             //Adds the CPP and OAS Income into the reducer
    income_reducer,
    cpp_selector,
    oas_selector,
    (income_reducer, cpp_selector, oas_selector) => ({...income_reducer, cpp_selector, oas_selector}) 
)

export const incomeArray_selector = createSelector(                                                          //Final array with CPP and OAS added
    income_selector,
    lifeSpan,
    (income_selector, lifeSpan) => convertReducerToArray(income_selector, 18, lifeSpan) 
)
export const incomeArrayWithRRIF_selector = createSelector(                                                          //Final array with CPP and OAS added
    incomeArray_selector,
    rrspProjection_selector,
    (incomeArray_selector, rrspProjection_selector) => addMinWithdrawalsToIncome(incomeArray_selector, rrspProjection_selector)
)


export const employment_selector = createSelector(
    income_selector,
    (income_selector) =>  [...new Set((Object.values(income_selector)).filter(d => d.incomeType === "employmentIncome").map(d => d.category))]
)
export const business_selector = createSelector(
    income_selector,
    (income_selector) =>  [...new Set((Object.values(income_selector)).filter(d => d.incomeType === "businessIncome").map(d => d.category))]
)
export const retirement_selector = createSelector(
    income_selector,
    (income_selector) => {
return [...new Set((Object.values(income_selector)).filter(d => d.incomeType === "retirementIncome").map(d => d.category))]
}
)

export const color_selector = createSelector(
    income_selector,
    (income_selector) => {
        const object = {}
        Object.assign(object, ...(Object.values(income_selector)).map(d => ({[d.category]: d.color})))
        return object
    }
)

 