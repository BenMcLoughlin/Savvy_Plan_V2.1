import {calculateStartValue, calculateEndValue} from "../services/localFunctions"


const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {
                rrsp: {
                    age: i,
                    contribution: 100,
                    percentageReturn: 0.08,
                    returnOnInvestment: 0,
                    startValue: 0,
                    withdrawal: 0,
                    endValue: 0,
                }

        }}
return incomePerYear
}


const savings_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "CONTRIBUTE_TO_SAVINGS": return {...state, [action.payload.selectedAge]: {
           ...state[action.payload.selectedAge],contribution: action.payload.value
            }
        }
        case "CALCULATE_VALUE": 
        const startValue = calculateStartValue(action.age, action.account, state)
        const endValue = calculateEndValue(startValue, action.age, action.account, state)
        return {...state, [action.age]: {
                                ...state[action.age], [action.account]: {
                                    ...state[action.age][action.account], 
                                                                            startValue, 
                                                                            endValue
                                } 
            }
        }

        default: return state
    }
}






   export default savings_reducer 