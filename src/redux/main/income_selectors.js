import {createSelector} from "reselect"
import {calculateCpp, calculateOAS} from "services/income/cpp_functions"
import {convertReducerToArray, calculateRRSPIncome, calculateCcb, addCcbToIncome} from "services/income/income_functions"
import {addMinWithdrawalsToIncome } from "services/savings/savings_functions"
import {rrspProjection_selector} from "redux/main/savings_selectors"

const main_reducer = state => state.main_reducer                                                             //this is the reducer, in object form, pulled from state
const taxAge = state => state.ui_reducer.taxAge                                                           //this is the reducer, in object form, pulled from state

const birthYear = state => new Date().getFullYear() - state.user_reducer.currentAge
const lifeSpan = state => state.user_reducer.lifeSpan
const user_reducer = state => state.user_reducer

const cppStartAge = state => state.user_reducer.cppStartAge
const oasStartAge = state => state.user_reducer.oasStartAge
const rrspStartAge = state => state.user_reducer.rrspStartAge


export const cpp_selector = createSelector(                                                                          //Determines the CPP payment for the user
    main_reducer,
    birthYear,
    cppStartAge,
    lifeSpan,
    (main_reducer, birthYear, cppStartAge, lifeSpan) => calculateCpp(birthYear, cppStartAge, lifeSpan, main_reducer)                                       
) 

export const ccbArray_selector = createSelector(                                                                      //Determines the CPP payment for the user
    birthYear,
    main_reducer,
    user_reducer,
    (birthYear, main_reducer, user_reducer) => calculateCcb(birthYear, main_reducer, user_reducer)                                       
)        

export const ccb_selector = createSelector(                                                                      //Determines the CPP payment for the user
    main_reducer,
    ccbArray_selector,
    (main_reducer, ccbArray_selector) =>  addCcbToIncome(main_reducer, ccbArray_selector)                                        
)                                                                     

export const rrsp_selector1 = createSelector( 
    rrspStartAge, 
    lifeSpan,                                                                      
    rrspProjection_selector,                      
    (rrspStartAge, lifeSpan, rrspProjection_selector) => calculateRRSPIncome(rrspStartAge, lifeSpan, rrspProjection_selector, "preAge80")                                             
)


export const rrsp_selector2 = createSelector( 
    rrspStartAge, 
    lifeSpan,                                                                      
    rrspProjection_selector,                      
    (rrspStartAge, lifeSpan, rrspProjection_selector) => calculateRRSPIncome(rrspStartAge, lifeSpan, rrspProjection_selector, "postAge80")                                             
)

export const tfsa_selector = createSelector(                                                                      //Determines the OAS payment for the user
    main_reducer,
    (main_reducer) => Object.values(main_reducer).filter(d => d.savingsType === "withdrawal")[0]                                       
)

export const income_selectorWithRRSP = createSelector(                                                             //Adds the CPP and OAS Income into the reducer
    main_reducer,
    cpp_selector,
    rrsp_selector1,
    rrsp_selector2,
    ccb_selector,
    (main_reducer, cpp_selector, rrsp_selector1, rrsp_selector2, ccb_selector) => ({...main_reducer, cpp_selector, rrsp_selector1, rrsp_selector2}) 
)
export const oas_selector = createSelector(                                                                      //Determines the OAS payment for the user
     income_selectorWithRRSP,
     ccb_selector,
     oasStartAge,
     lifeSpan,
    (  income_selectorWithRRSP, ccb_selector, oasStartAge, lifeSpan) => calculateOAS(oasStartAge, lifeSpan, income_selectorWithRRSP, ccb_selector)                                             
)

export const income_selectorNoRRSP = createSelector(                                                             //Adds the CPP and OAS Income into the reducer
    main_reducer,
    cpp_selector,
    oas_selector,
    (main_reducer, cpp_selector, oas_selector) => ({...main_reducer, cpp_selector, oas_selector}) 
)

export const income_selector = createSelector(                                                             //Adds the CPP and OAS Income into the reducer
    income_selectorWithRRSP,
    cpp_selector,
    oas_selector,
    (income_selectorWithRRSP, cpp_selector, oas_selector) => ({...income_selectorWithRRSP, cpp_selector, oas_selector}) 
)

export const incomeArray_selector = createSelector(                                                          //Final array with CPP and OAS added
    income_selectorNoRRSP,
    lifeSpan,
    (income_selectorNoRRSP, lifeSpan) => convertReducerToArray(income_selectorNoRRSP, lifeSpan) 
)
export const incomeArrayWithRRIF_selector = createSelector(                                                          //Final array with CPP and OAS added
    incomeArray_selector,
    rrspProjection_selector,
    (incomeArray_selector, rrspProjection_selector) => addMinWithdrawalsToIncome(incomeArray_selector, rrspProjection_selector)
)


export const employment_selector = createSelector(
    income_selector,
    (income_selector) =>  [...new Set((Object.values(income_selector)).filter(d => d.incomeType === "employmentIncome").map(d => d.stream))]
)
export const otherIncome_selector = createSelector(
    income_selector,
    (income_selector) =>  [...new Set((Object.values(income_selector)).filter(d => d.incomeType === "otherIncome").map(d => d.stream))]
)
export const retirement_selector = createSelector(
    income_selectorNoRRSP,
    (income_selectorNoRRSP) => {
return [...new Set((Object.values(income_selectorNoRRSP)).filter(d => d.incomeType === "retirementIncome").map(d => d.stream))]
}
)

export const color_selector = createSelector(
    income_selector,
    (income_selector) => {
        const object = {}
        Object.assign(object, ...(Object.values(income_selector)).map(d => ({[d.stream]: d.color})))
        return object
    }
)

 