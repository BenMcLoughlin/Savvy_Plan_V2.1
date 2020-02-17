
import {createSelector} from "reselect"

const savings2_reducer = state => state.savings2_reducer
const user_reducer = state => state.user_reducer
const assumptions_reducer = state => state.assumptions_reducer



export const birthYear = createSelector(
    [user_reducer],
    (user_reducer) => user_reducer.birthYear
)
export const changeSavings2_selector = createSelector(
    [savings2_reducer, birthYear],
    (savings2_reducer, birthYear) => {

        const userAge = new Date().getFullYear() - birthYear
        const projectection = {
            [userAge]: {
               tfsa: {
                   startValue: savings2_reducer.tfsa.startValue.financialValue, 
                   interest: 0, 
                   endValue: 100, 
                   contribution: 0
               }
            }
        }
        for (let age = userAge + 1; age <= 96; age++) {
            let lastValue = projectection[age -1]
            const contribution = age >= savings2_reducer.tfsa.contributionStartAge && age <= savings2_reducer.tfsa.contributionEndAge ?  savings2_reducer.tfsa.contribution.financialValue : 0
            const interest = lastValue.tfsa.endValue * 0.04
            const withdrawal = age > 65 ? 20 : 0
            projectection[+age] = {
               tfsa: {
                    startValue: lastValue.tfsa.endValue, 
                    contribution: contribution,
                    withdrawal: withdrawal,
                    interest: interest,
                    endValue: lastValue.tfsa.endValue + contribution + interest - withdrawal
               } 
            }
        }
        return (
            projectection
        )
    
    }
)

// tfsa:
// age: 17
// contribute: 0
// financialValue: 0
// label: "Tax Free Savings Account"
// name: "tfsa"
// maxContribution: 0
// optimizedContribution: 0
// optimizedWithdrawal: 0
// rangeBarValue: 0
// totalContributions: 0
// totalInterest: 0
// totalValue: 0
// withdraw: 0
// age: 43
// rrspContributions: 0
// rrspInterest: 0
// tfsaContributions: 0
// tfsaInterest: 0
// nonRegisteredContributions: 0
// nonRegisteredInterest: 0