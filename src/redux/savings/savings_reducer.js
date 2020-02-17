
const determineTotalContributions = (age, name, state, transaction, value)=> {
    const lastValue = state[age - 1][name]
    const principlePercentage = lastValue.totalContributions / lastValue.totalValue
   const contribute = transaction === "contribute" ? value : (-value * principlePercentage)
   const totalContribution = lastValue.totalContributions + contribute 
   return totalContribution > 0 ? totalContribution : 0
   
   }
   const determineTotalInterest = (age, name, rate1, rate2, retirementAge, state, transaction, value) => {
       const lastValue = state[age - 1][name]
       const rate = age >= retirementAge ? rate2 : rate1
       const interestPercentage = lastValue.totalInterest / lastValue.totalValue
       const withdraw = transaction === "withdraw" ? (value * interestPercentage ) : 0
    
       const totalInterest = (((lastValue.totalContributions + lastValue.totalInterest) * rate) + lastValue.totalInterest) - withdraw
       return totalInterest > 0 ? totalInterest : 0
   }
   
   
   const initialState = () => {
       const savings = {}
       for (let age = 17; age <= 96; age++) {
           savings[Number(age)] = {
                   rrsp: {
                       age: age, 
                       contribute: 0,
                       financialValue: 0,
                       label: "RRSP Withdrawals",
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
   return savings
   }
   
    const savings_reducer = (state = initialState(), action) => {
       switch(action.type) {
           case "savings_reducer/TRANSACTION": 
           const totalContributions = determineTotalContributions(action.age, action.name, state, action.transaction, action.value)
           const totalInterest = determineTotalInterest(action.age, action.name, action.rate1, action.rate2, action.retirementAge, state, action.transaction, action.value)
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
           case "savingsPerYear/SET_MAX_CONTRIBUTION": return {...state, [action.age]: {
                                                                        ...state[action.age], [action.name]: {
                                                                           ...state[action.age][action.name],
                                                                                maxContribution: action.value
                                                                        }
           }
   
           }
           
           default: return state
       }
   }
   
   
   
   
   export default savings_reducer
   
   
   
   //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
   /*
   the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 
   
   Initial State
   
      The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
      individuals life can have its different types of income set.
   
   */