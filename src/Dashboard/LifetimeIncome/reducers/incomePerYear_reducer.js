import _ from "lodash"
import {calculateCpp} from  "../services/localFunctions"

const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {
                cppIncome: {
                    age: i, 
                    contributeToCpp: true,
                    financialValue: 0, 
                    label: "CPP Income",
                    name: "cppIncome",
                    rangeBarValue: 0, 
                },
              employmentIncome: {
                    age: i, 
                    contributeToCpp: true,
                    financialValue: 0, 
                    label: "Employment Income",
                    name: "employmentIncome",
                    rangeBarValue: 0, 

                },
                oasIncome: {
                    age: i, 
                    contributeToCpp: true,
                    financialValue: 0, 
                    label: "OAS Income",
                    name: "oasIncome",
                    rangeBarValue: 0, 
                },
                rrifIncome: {
                    age: i, 
                    contributeToCpp: true,
                    financialValue: 0, 
                    label: "RRIF Income",
                    name: "rrifIncome",
                    rangeBarValue: 0, 
                },
                selfEmploymentIncome: {
                    age: i, 
                    contributeToCpp: true,
                    financialValue: 0, 
                    label: "Self Employment Income",
                    name: "selfEmploymentIncome",
                    rangeBarValue: 0, 
                },
        }}
return incomePerYear
}

 const incomePerYear_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "SET_INCOME_PER_YEAR": return {...state, [action.payload.age]: {
                                        ...state[action.payload.age], [action.payload.name]: action.payload
                                        }}
        case "REMOVE_INCOME_TYPE_REFACTOR": return {...state, [action.age]:  _.omit(state[action.age], action.name)
            }
        case "CALCULATE_CPP_REFACTOR":  
                const cppPayment = calculateCpp(action.age, 1988, action.cacheKey, action.cppStartAge, 55420, state)
                return {...state, [action.age]: {
                                                    ...state[action.age], cppIncome: {
                                                        age: action.age,
                                                        financialValue: cppPayment,
                                                        label: "CPP Income",
                                                        name: "cppIncome"
                                                    }
                                                    }}

        default: return state
    }
}




export default incomePerYear_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/