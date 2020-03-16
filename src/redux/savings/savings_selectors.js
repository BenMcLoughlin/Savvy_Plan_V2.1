
import {createSelector} from "reselect"
import { createProjection} from "services/savings/savings_functions"


const savings_reducer = state => state.savings_reducer                                                             //this is the reducer, in object form, pulled from state
const thisYear = new Date()
const birthYear = state => state.user_reducer.birthYear
const lifeSpan = state => state.user_reducer.lifeSpan.rangeBarValue
const rrifStartAge = state => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue
const retirementAge = state => state.user_reducer.retirementAge.rangeBarValue
const userAge = state => thisYear.getFullYear() - state.user_reducer.birthYear
const netWorth_reducer = state => state.netWorth_reducer

export const returns = state => state.assumptions_reducer

export const tfsaAccounts_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer).length > 0 ? Object.values(netWorth_reducer).filter(d => d.registration === "TFSA") : 0
)

export const tfsaCurrentBalance = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer).filter(d => d.registration === "TFSA").length > 0 ? Object.values(netWorth_reducer).filter(d => d.registration === "TFSA").map(d => d.value.financialValue).reduce((acc, num) => acc + num) : 0
)

export const rate1 = createSelector(
    [returns],
    (returns) =>  returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)
export const rate2 = createSelector(
    [returns],
    (returns) => returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)


export const tfsaProjection_selector = createSelector(                                                                      //Determines the CPP payment for the user
    savings_reducer,
    userAge,
    lifeSpan,
    rate1,
    rate2,
    tfsaCurrentBalance,
    (savings_reducer, userAge, lifeSpan, rate1, rate2, tfsaCurrentBalance) => createProjection(savings_reducer, userAge, lifeSpan, rate1, rate2, tfsaCurrentBalance, "TFSA")                                       
)

export const tfsaPeakValue_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) => Math.round(Math.max(...tfsaProjection_selector.map(d => d.value))/1000)*1000                                 
)

export const tfsaContributions_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) =>   Math.round(tfsaProjection_selector.map(d => d.contribution).reduce((acc, num) => acc + num)/1000)*1000                                 
)

export const tfsaInterest_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) =>  Math.round(tfsaProjection_selector.map(d => d.interest).reduce((acc, num) => acc + num)/1000)*1000                                 
)


export const tfsaPayment_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) =>  Math.round(Math.max(...tfsaProjection_selector.map(d => d.withdrawal)))                            
)

export const tfsaArea_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) => tfsaProjection_selector.map(d => ({
        age: d.age,
        interest: d.totalInterest,
        principle: d.principle
    })                                     
)
)
export const tfsaBar_selector = createSelector(                                                                      //Determines the CPP payment for the user
    tfsaProjection_selector,
    (tfsaProjection_selector) => tfsaProjection_selector.map(d => ({
        age: d.age,
        contribution: d.contribution,
        withdrawal: -d.withdrawal
    })                                     
)
)

export const rrspCurrentBalance = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer).filter(d => d.registration === "RRSP").length > 0 ? Object.values(netWorth_reducer).filter(d => d.registration === "RRSP").map(d => d.value.financialValue).reduce((acc, num) => acc + num) : 0
)

export const rrspProjection_selector = createSelector(                                                                     
    savings_reducer,
    userAge,
    lifeSpan,
    rate1,
    rate2,
    rrspCurrentBalance,
    rrifStartAge,
    (savings_reducer, userAge, lifeSpan, rate1, rate2, rrspCurrentBalance, rrifStartAge ) => createProjection(savings_reducer, userAge, lifeSpan, rate1, rate2, rrspCurrentBalance, "RRSP",rrifStartAge )                                       
)

export const rrspMinWithdrawal_selector = createSelector(                                                                      
    rrspProjection_selector,
    (rrspProjection_selector) =>   Math.round(Math.max(...rrspProjection_selector.map(d => d.minWithdrawal) )/1000)*1000                          
)

export const rrspArea_selector = createSelector(                                                                    
    rrspProjection_selector,
    (rrspProjection_selector) => rrspProjection_selector.map(d => ({
        age: d.age,
        interest: d.totalInterest,
        principle: d.principle
    })                                     
)
)
export const rrspBar_selector = createSelector(                                                                    
    rrspProjection_selector,
    (rrspProjection_selector) => rrspProjection_selector.map(d => ({
        age: d.age,
        contribution: d.contribution,
        minWithdrawal: -d.minWithdrawal,
        withdrawal: -d.withdrawal,
    })                                     
)
)

export const rrspPeakValue_selector = createSelector(                                                                      //Determines the CPP payment for the user
    rrspProjection_selector,
    (rrspProjection_selector) => Math.round(Math.max(...rrspProjection_selector.map(d => d.value))/1000)*1000                                 
)

export const rrspContributions_selector = createSelector(                                                                      //Determines the CPP payment for the user
    rrspProjection_selector,
    (rrspProjection_selector) =>   Math.round(rrspProjection_selector.map(d => d.contribution).reduce((acc, num) => acc + num)/1000)*1000                                 
)

export const rrspInterest_selector = createSelector(                                                                      //Determines the CPP payment for the user
    rrspProjection_selector,
    (rrspProjection_selector) =>  Math.round(rrspProjection_selector.map(d => d.interest).reduce((acc, num) => acc + num)/1000)*1000                                 
)