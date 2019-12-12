
const determineTotalContributions = (age, name, state, transaction, value, rate1, rate2) => {
 const lastValue = state[age - 1][name]
 const principlePercentage = state[age - 1][name].totalContributions / state[age - 1][name].totalValue
const contribute = transaction === "contribute" ? value : (-value * principlePercentage)
const totalContribution = lastValue.totalContributions + contribute 
return totalContribution > 0 ? totalContribution : 0

}
const determineTotalInterest = (age, name, state, transaction, value, rate1, rate2) => {
    const rate = age > 65 ? rate2 : rate1
    const interestPercentage = state[age - 1][name].totalInterest / state[age - 1][name].totalValue
    const withdraw = transaction === "withdraw" ? (-value * interestPercentage ) : 0
    const lastValue = state[age - 1][name]
    const totalInterest = ((lastValue.totalContributions + lastValue.totalInterest) * rate) + lastValue.totalInterest + withdraw
    return totalInterest > 0 ? totalInterest : 0
}


const initialState = () => {
    const incomePerYear = {}
    for (let age = 17; age <= 95; age++) {
        incomePerYear[Number(age)] = {
                rrsp: {
                    age: age, 
                    contribute: 0,
                    financialValue: 0,
                    label: "RRSP",
                    maxContribution: 0,
                    optimizedContribution: 0, 
                    optimizedWithdrawal: 0, 
                    name: "rrsp",
                    rangeBarValue: 0, 
                    totalContributions: 0, 
                    totalInterest: 0, 
                    totalValue: 0, 
                    withdraw: 0,
                },
              tfsa: {
                    age: age, 
                    contribute: 0, 
                    financialValue: 0,
                    label: "Tax Free Savings Account",
                    name: "tfsa",
                    maxContribution: 0,
                    optimizedContribution: 0, 
                    optimizedWithdrawal: 0, 
                    rangeBarValue: 0, 
                    totalContributions: 0, 
                    totalInterest: 0, 
                    totalValue: 0, 
                    withdraw: 0,
                },
                nonRegistered: {
                    age: age, 
                    contribute: 0,
                    financialValue: 0,
                    label: "Non Registered",
                    maxContribution: 0,
                    name: "nonRegistered",
                    optimizedContribution: 0, 
                    optimizedWithdrawal: 0, 
                    rangeBarValue: 0, 
                    totalContributions: 0, 
                    totalInterest: 0, 
                    totalValue: 0, 
                    withdraw: 0,
                }
        }}
return incomePerYear
}

 const savingsPerYear_reducer2 = (state = initialState(), action) => {
    switch(action.type) {
        case "savingsPerYear_reducer2/TRANSACTION": 
        const totalContributions = determineTotalContributions(action.age, action.name, state, action.transaction, action.value)
        const totalInterest = determineTotalInterest(action.age, action.name, state, action.transaction, action.value, action.rate1, action.rate2)
        const totalValue = totalContributions + totalInterest
        return {...state, [action.age]: {
                                    ...state[action.age], [action.name]: {
                                        ...state[action.age][action.name], [action.transaction]: totalValue <= 0 ? 0 : action.value,
                                                                            financialValue: action.value,
                                                                            rangeBarValue: action.rangeBarValue,
                                                                            totalContributions,
                                                                            totalInterest,
                                                                            totalValue 
        }}}
        case "investmentReturns/SET_OPTIMIZED_VALUE": return {...state, [action.age]: {
                                                                     ...state[action.age], [action.name]: {
                                                                        ...state[action.age][action.name],
                                                                                [action.transaction]: action.value
                                                                     }
        }

        }
        default: return state
    }
}




export default savingsPerYear_reducer2



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/