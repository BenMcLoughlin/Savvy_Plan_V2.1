import _ from "lodash"


export const calculateStartValue = (age, name, state) => {
    return state[age-1][name].endValue

}
export const calculateEndValue = (startValue, age, name,state) => {
    const {financialValue} = state[age][name]
    return  startValue * (1 + 0.1) + financialValue

}

const initialState = () => {
    const incomePerYear = {}
    for (let i = 18; i <= 95; i++) {
        incomePerYear[Number(i)] = {
                rrsp: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0, 
                    label: "RRSP",
                    name: "rrsp",
                    startValue: 0,
                    rangeBarValue: 0, 
                },
              tfsa: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0,  
                    label: "Tax Free Savings Account",
                    name: "tfsa",
                    startValue: 0,
                    rangeBarValue: 0, 

                },
                nonRegistered: {
                    age: i, 
                    endValue: 0,
                    financialValue: 0, 
                    label: "Non Registered",
                    name: "nonRegistered",
                    startValue: 0,
                    rangeBarValue: 0, 
                }
        }}
return incomePerYear
}

 const savingsPerYear_reducer = (state = initialState(), action) => {
    switch(action.type) {
        case "savingsPerYear/SET_VALUE": return {...state, [action.payload.age]: {
                                        ...state[action.payload.age], [action.payload.name]: action.payload
                                        }}
        case "savingsPerYear/CALCULATE_SAVINGS": 
        const startValue = calculateStartValue(action.age, action.name, state)
        const endValue = calculateEndValue(startValue, action.age, action.name, state)
        return {...state, [action.age]: {
                                ...state[action.age], [action.name]: {
                                    ...state[action.age][action.name], 
                                                                            startValue, 
                                                                            endValue
                                } 
            }
        }

      
        default: return state
    }
}




export default savingsPerYear_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/