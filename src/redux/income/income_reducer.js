import _ from "lodash"

const initialState = {
    11111: {
        label: "TFSA Income",
        registration: "tfsa",
        id: 11111,
        category: "TFSA Income",
        incomeType: "retirementIncome",
        color: "#8CB8B7",
        fromAge: 65,
        toAge: 95,
        value: {
            rangeBarValue: 20,
            financialValue: 0,
            name: "value",
            label: "Annual Withdrawal",
        },
    }
}

 const income_reducer = (state = initialState, action) => {
    switch(action.type) {
        case "income/ADD_INCOME": return {...state, [action.payload.id]: action.payload}
        case "income/CHANGE_AGE": return {...state, [action.id]: {
                                                     ...state[action.id], [action.ageType]: action.value
        }}
        case "income/DELETE": return  _.omit(state, [action.id])                  
        case "income/CHANGE_LABEL": return {...state, [action.id]: {
                                                        ...state[action.id], [action.key]: action.event.target.value
        }}
        case "income/CHANGE_INCOME": return {...state, [action.id]: {
                                                    ...state[action.id], [action.name]: {
                                                        ...state[action.id][action.name], 
                                                                    financialValue: action.financialValue,
                                                                    rangeBarValue: action.rangeBarValue,
                                                    }
        }}

        default: return state
    }
}




export default income_reducer



//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
/*
the objective of this reducer is to provide state detailing the income of an individual for every year from age 18 to 95. 

Initial State

   The initial state is a loop between 18 and 95 setting the income of each year as 0 and placing the essential framework for changes to be made. Each year of an 
   individuals life can have its different types of income set.

*/