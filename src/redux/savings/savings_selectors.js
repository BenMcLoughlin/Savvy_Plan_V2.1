import {createSelector} from "reselect"
import {transaction_action} from "redux/savings/savings_actions"
import {renderSavings} from "services/savings/savings_functions"

const savings_reducer = state => state.savings_reducer
const investmentReturns = state => state.assumptions_reducer

export const rrspStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue
export const tfsaStartAge = (state) => state.pensionStartAges_reducer.rrspStartAge.rangeBarValue

const thisYear = new Date()
const birthYear = state => state.user_reducer.birthYear
const retirementAge = state => state.user_reducer.retirementAge.rangeBarValue
const userAge = state => thisYear.getFullYear() - state.user_reducer.birthYear

const round = number => {
    return number > 1000000 ?  `${Math.round(number/1000000)*1000000/1000000} M` : `${Math.round(number/1000)*1000/1000} k` 
}


export const investmentReturns_selector = createSelector(
    [investmentReturns], 
    (investmentReturns) => Object.values(investmentReturns)
)

export const returns = state => state.assumptions_reducer

export const rate1 = createSelector(
    [returns],
    (returns) =>  returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.beforeRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)
export const rate2 = createSelector(
    [returns],
    (returns) => returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue > 0 ? returns.afterRetirementReturn.rangeBarValue - returns.managementFee.rangeBarValue - returns.inflationRate.rangeBarValue : 0
)



//CHART SELECTORS - change data format to be used in the charts

export const stackedAreaData = createSelector(
    savings_reducer,
    userAge,
    (savings_reducer, userAge) => {
 
        const array = []
        for (let age = userAge; age < 95; age++) {
           array.push({
                age: savings_reducer[age].rrsp.age, 
                rrspContributions: savings_reducer[age].rrsp.totalContributions,
                rrspInterest: savings_reducer[age].rrsp.totalInterest,
                tfsaContributions: savings_reducer[age].tfsa.totalContributions,
                tfsaInterest: savings_reducer[age].tfsa.totalInterest,
                nonRegisteredContributions: savings_reducer[age].nonRegistered.totalContributions,
                nonRegisteredInterest: savings_reducer[age].nonRegistered.totalInterest,
            })
        }
        return array
    }

)


export const stackedBarData = createSelector(
    [savings_reducer],
    (savings_reducer) =>    {
        const data = Object.values(savings_reducer).map(d=> {  
            const namesArray = Object.keys(d)                                                                                                 //Creates an array of all the names eg ["employmentIncome", "cppIncome", etc.]
            const valueArray = Object.values(d).map((a, i) => (a.contribute + -a.withdraw))                                                                 //Creates an array of all the financial Values eg ["22000", "1200", etc.]
            var result = {age: d.rrsp.age};                                                                                                    //I have to go into one of the objects to access its age which acts like id, I just used cppIncome because it wont be deleted
            namesArray.forEach((key, i) => result[key] = valueArray[i]);                                                             //Merges the two arrays into a set of key value pairs eg ["employmentIncome": 22000]   
            return result
        })
        return data 
    }
)

export const stackedBarData2 = createSelector(
    [savings_reducer, rrspStartAge, userAge],
    (savings_reducer, rrspStartAge, userAge) =>    {
        const data = Object.values(savings_reducer).filter(d => d.rrsp.age > userAge).map((d, i, a)=> {  
            const rrspPercentage = i > (rrspStartAge - 18) ? a[i - 1].rrsp.totalInterest / a[i - 1].rrsp.totalValue : 0
            const tfsaPercentage = i > (rrspStartAge - 18) ? a[i - 1].tfsa.totalInterest / a[i - 1].tfsa.totalValue : 0
            const nonRegisteredPercentage = i > (rrspStartAge - 18) ? a[i - 1].nonRegistered.totalInterest / a[i - 1].nonRegistered.totalValue : 0
            return ({
                age: d.rrsp.age, 
                rrspContributions: (d.rrsp.contribute + -d.rrsp.withdraw) * (1-rrspPercentage),
                rrspInterest: (d.rrsp.contribute + -d.rrsp.withdraw) * rrspPercentage,
                tfsaContributions: (d.tfsa.contribute + -d.tfsa.withdraw) * (1-tfsaPercentage),
                tfsaInterest:(d.tfsa.contribute + -d.tfsa.withdraw) * (1-tfsaPercentage),
                nonRegisteredContributions: (d.nonRegistered.contribute + -d.nonRegistered.withdraw) * (1-nonRegisteredPercentage),
                nonRegisteredInterest: (d.nonRegistered.contribute + -d.nonRegistered.withdraw) * (1-nonRegisteredPercentage),
            })
        })
        return data 
    }
)



export const stackedKeysBarChart = createSelector(
    [savings_reducer],
    (savings_reducer) => Object.keys(savings_reducer[18])
)


//HEADER SELECTORS

export const rrspNestEgg = createSelector(
    [savings_reducer, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].rrsp.totalValue 
)
export const tfsaNestEgg = createSelector(
    [savings_reducer, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].tfsa.totalValue 
)
export const nonRegisteredNestEgg = createSelector(
    [savings_reducer, rrspStartAge],
    (savings, rrspStartAge)=> savings[rrspStartAge].nonRegistered.totalValue 
)

export const rrspDisplayValue= createSelector(
    [savings_reducer, rrspNestEgg],
    (savings, rrspNestEgg)=> round(rrspNestEgg)

)
export const tfsaDisplayValue= createSelector(
    [savings_reducer, tfsaNestEgg],
    (savings, tfsaNestEgg) => round(tfsaNestEgg)
)
export const nonRegisteredDisplayValue = createSelector(
    [savings_reducer, nonRegisteredNestEgg],
    (savings, nonRegisteredNestEgg) => round(nonRegisteredNestEgg)

)

export const totalNestEgg = createSelector(
    [rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg],
    (rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg) => round(rrspNestEgg + tfsaNestEgg + nonRegisteredNestEgg)
)



export const action_selector = createSelector(
    [rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg],
    (rrspNestEgg, tfsaNestEgg, nonRegisteredNestEgg) => round(rrspNestEgg + tfsaNestEgg + nonRegisteredNestEgg)
)