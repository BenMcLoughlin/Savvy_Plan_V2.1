
import {createSelector} from "reselect"
import { createProjection} from "services/savings/savings_functions"


const main_reducer = state => state.main_reducer                                                             //this is the reducer, in object form, pulled from state

const birthYear = state => new Date().getFullYear() - state.user_reducer.currentAge
const lifeSpan = state => state.user_reducer.lifeSpan
const rrifStartAge = state => state.user_reducer.rrspStartAge
const retirementAge = state => state.user_reducer.retirementAge
const userAge = state => state.user_reducer.currentAge
const netWorth_reducer = state => state.netWorth_reducer

export const user_reducer = state => state.user_reducer

export const tfsaAccounts_selector = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer).length > 0 ? Object.values(netWorth_reducer).filter(d => d.registration === "TFSA") : 0
)

export const tfsaCurrentBalance = createSelector(
    [netWorth_reducer],
    (netWorth_reducer) =>  Object.values(netWorth_reducer).filter(d => d.registration === "TFSA").length > 0 ? Object.values(netWorth_reducer).filter(d => d.registration === "TFSA").map(d => d.value.financialValue).reduce((acc, num) => acc + num) : 0
)

export const rate1 = createSelector(
    [user_reducer],
    (user_reducer) =>  user_reducer.rate1 - user_reducer.MER - user_reducer.inflationRate > 0 ? user_reducer.rate1 - user_reducer.MER - user_reducer.inflationRate : 0
)
export const rate2 = createSelector(
    [user_reducer],
    (user_reducer) =>  user_reducer.rate2 - user_reducer.MER - user_reducer.inflationRate > 0 ? user_reducer.rate2 - user_reducer.MER - user_reducer.inflationRate : 0
)


export const tfsaProjection_selector = createSelector(                                                                      
    main_reducer,
    userAge,
    lifeSpan,
    rate1,
    rate2,
    tfsaCurrentBalance,
    (main_reducer, userAge, lifeSpan, rate1, rate2, tfsaCurrentBalance) => createProjection(tfsaCurrentBalance, lifeSpan, rate1, rate2, "TFSA", main_reducer, userAge, 120)                                       
)                                                                                                           

export const tfsaPeakValue_selector = createSelector(                                                                                           //determines the maximum value of the TFSA account  
    tfsaProjection_selector,                                    
    (tfsaProjection_selector) => Math.round(Math.max(...tfsaProjection_selector.map(d => d.value))/1000)*1000                                 
)

export const tfsaContributions_selector = createSelector(                                                                      
    tfsaProjection_selector,
    (tfsaProjection_selector) =>   Math.round(tfsaProjection_selector.map(d => d.contribution).reduce((acc, num) => acc + num)/1000)*1000                                 
)

export const tfsaInterest_selector = createSelector(                                                                      
    tfsaProjection_selector,
    (tfsaProjection_selector) =>  Math.round(tfsaProjection_selector.map(d => d.interest).reduce((acc, num) => acc + num)/1000)                               
)


export const tfsaPayment_selector = createSelector(                                                                      
    tfsaProjection_selector,
    (tfsaProjection_selector) =>  Math.round(Math.max(...tfsaProjection_selector.map(d => d.withdrawal)))                            
)

export const tfsaArea_selector = createSelector(                                                                      
    tfsaProjection_selector,
    (tfsaProjection_selector) => tfsaProjection_selector.map(d => ({
        age: d.age,
        interest: d.totalInterest,
        principle: d.principle
    })                                  
)
)
export const tfsaBar_selector = createSelector(                                                                      
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
    main_reducer,
    userAge,
    lifeSpan,
    rate1,
    rate2,
    rrspCurrentBalance,
    rrifStartAge,
    (main_reducer, userAge, lifeSpan, rate1, rate2, rrspCurrentBalance, rrifStartAge ) => createProjection(rrspCurrentBalance, lifeSpan, rate1, rate2, "RRSP", main_reducer, userAge, rrifStartAge)                                        
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

export const rrspPeakValue_selector = createSelector(                                                                      
    rrspProjection_selector,
    (rrspProjection_selector) => Math.round(Math.max(...rrspProjection_selector.map(d => d.value))/1000)*1000                                 
)

export const rrspContributions_selector = createSelector(                                                                      
    rrspProjection_selector,
    (rrspProjection_selector) =>   Math.round(rrspProjection_selector.map(d => d.contribution).reduce((acc, num) => acc + num)/1000)*1000                                 
)

export const rrspInterest_selector = createSelector(                                                                      
    rrspProjection_selector,
    (rrspProjection_selector) =>  Math.round(rrspProjection_selector.map(d => d.interest).reduce((acc, num) => acc + num)/1000)*1000                                 
)